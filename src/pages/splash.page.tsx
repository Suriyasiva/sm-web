import { useEffect } from 'react';
import useAuthStore, { AuthState } from '../store/auth.store';
import { Outlet, useNavigate } from 'react-router-dom';
import { Routes } from '../constants/Routes';

// @Deprecated; Do not use this
const SplashPage = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (authStore.authState === AuthState.authenticated) {
      navigate(Routes.admin.dashboard, { replace: true });
    }

    if (authStore.authState === AuthState.unauthenticated) {
      navigate(Routes.auth.login, { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStore.authState]);

  return <Outlet />;
};

export default SplashPage;
