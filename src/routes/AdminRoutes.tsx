import { RouteObject, useLocation, useNavigate } from 'react-router-dom';
import { PUBLIC_PATH, Routes } from '../constants/Routes';
import StaffsContainer from '../pages/admin/users/StaffsContainer';
import useAuthStore, { AuthState } from '../store/auth.store';
import { useEffect } from 'react';
import AdminPageLayout from '../layouts/AdminPageLayout';
import Dashboard from '../pages/admin/Dashboard';

function AdminLayout() {
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

    if (authStore.authState === AuthState.unauthenticated) {
      navigate(Routes.auth.findOrganization);
    }
  }, [authStore.authState]);

  return <AdminPageLayout />;
}

export const adminRoutes: RouteObject[] = [
  {
    path: Routes.root,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        path: Routes.admin.dashboard,
        element: <Dashboard />,
      },
      {
        path: Routes.admin.staffs,
        element: <StaffsContainer />,
      },
    ],
  },
];
