import {
  Outlet,
  RouteObject,
  createBrowserRouter,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import ErrorPage from '../ErrorPage';
import { PUBLIC_PATH, Routes } from '../constants/Routes';
import { useEffect } from 'react';
import useAuthStore, { AuthState } from '../store/auth.store';
import { adminRoutes } from './AdminRoutes';
import { authRoutes } from './AuthRoutes';

function AuthLayout() {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (authStore.authState === AuthState.authenticated) {
      if (PUBLIC_PATH.includes(location.pathname)) {
        navigate(Routes.admin.dashboard, { replace: true });
      } else {
        navigate(location.pathname, { replace: true });
      }
    }
  }, [authStore.authState, authStore.isDetermining]);

  return <Outlet />;
}

export const rootRouteObjects: RouteObject[] = [
  {
    path: Routes.root,
    errorElement: <ErrorPage />,
    element: <AuthLayout />,
    children: [...authRoutes, ...adminRoutes],
  },
];

const rootRouter = createBrowserRouter(rootRouteObjects);
export default rootRouter;
