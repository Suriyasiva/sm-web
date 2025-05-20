import {
  useNavigate,
  Routes as ReactRouter,
  Route,
  RouteObject,
} from 'react-router-dom';
import useAuthStore, { AuthState } from '../store/auth.store';
import { Center, Spinner, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { PUBLIC_PATH, Routes } from '../constants/Routes';
import { authRoutes } from './AuthRoutes';
import { adminRoutes } from './AdminRoutes';

const MainRouter = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  async function handleLookup() {
    try {
      await authStore.lookupUser();
    } catch (error) {
      if (!PUBLIC_PATH.includes(location.pathname)) {
        navigate(Routes.auth.findOrganization);
      }
    }
  }

  useEffect(() => {
    handleLookup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { authState } = authStore;
    const currentPath = location.pathname;
    const isPublicPath = PUBLIC_PATH.includes(currentPath);

    if (
      authState === AuthState.authenticated &&
      currentPath !== Routes.admin.dashboard
    ) {
      navigate(Routes.admin.dashboard);
    } else if (
      authState === AuthState.unauthenticated &&
      (currentPath === '/' || !isPublicPath)
    ) {
      navigate(Routes.auth.findOrganization);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStore.authState]);

  function renderMainRouter() {
    if (
      authStore.authState === AuthState.isDeterming ||
      authStore.isDetermining
    ) {
      return (
        <Center w='full' gap={4}>
          <Spinner />
          <Text fontSize='20' fontWeight='bold'>
            Loading...
          </Text>
        </Center>
      );
    }

    if (authStore.authState === AuthState.unauthenticated) {
      return (
        <ReactRouter>
          {authRoutes.map((ar: RouteObject, i: number) => {
            return (
              <Route
                path={ar.path}
                key={`auth-routes-${i}`}
                element={ar.element}
              />
            );
          })}
        </ReactRouter>
      );
    }

    return (
      <ReactRouter>
        {adminRoutes.map((ar: RouteObject, i: number) => {
          return (
            <Route
              path={ar.path}
              key={`admin-routes-${i}`}
              element={ar.element}
            >
              {ar.children?.map((arcr: RouteObject, j: number) => {
                return (
                  <Route
                    index={arcr.index ?? false}
                    path={arcr.path}
                    key={`admin-children-routes-${j}`}
                    element={arcr.element}
                  ></Route>
                );
              })}
            </Route>
          );
        })}
      </ReactRouter>
    );
  }

  return renderMainRouter();
};

export default MainRouter;
