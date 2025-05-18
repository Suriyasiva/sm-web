export const PREFIXES = {
  admin: '/admin',
  auth: '/auth',
};

export const Routes = {
  notFound: '/404',
  forbidden: '/403',
  root: '/',

  auth: {
    login: PREFIXES.auth + '/login',
    signup: PREFIXES.auth + '/signup',
    findOrganization: PREFIXES.auth + '/organization/find',
    forgotPassword: PREFIXES.auth + '/forgot-password',
    createOrganization: PREFIXES.auth + '/organization/create',
  },
  admin: {
    dashboard: PREFIXES.admin + '/dashboard',
    staffs: PREFIXES.admin + '/staffs',
  },
};

export const PUBLIC_PATH = ['/', ...Object.values(Routes.auth)];
