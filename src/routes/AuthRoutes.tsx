import { RouteObject } from 'react-router-dom';
import { Routes } from '../constants/Routes';
import NotFoundPage from '../pages/error/404';
import ForbiddenPage from '../pages/error/403';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import SignUp from '../pages/auth/SignUp';
import SelectedOrganization from '../pages/auth/Organization';
import CreateOrganization from '../pages/auth/CreateOrganization';

export const authRoutes: RouteObject[] = [
  {
    path: Routes.notFound,
    element: <NotFoundPage />,
  },
  {
    path: Routes.forbidden,
    element: <ForbiddenPage />,
  },
  {
    path: Routes.auth.login,
    element: <Login />,
  },
  {
    path: Routes.auth.signup,
    element: <SignUp />,
  },
  {
    path: Routes.auth.createOrganization,
    element: <CreateOrganization />,
  },
  {
    path: Routes.auth.findOrganization,
    element: <SelectedOrganization />,
  },

  {
    path: Routes.auth.forgotPassword,
    element: <ForgotPassword />,
  },
];
