const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Endpoints = {
  tenant: {
    tenantLogin: BASE_URL + '/tenant/auth/login',
    tenantLookup: BASE_URL + '/tenant/auth/lookup',
    getSubscriptionPlans: BASE_URL + '/tenant/subscription_plans',
    subscription: BASE_URL + '/tenant/subscription',
    createCustomer: BASE_URL + '/tenant/customers/create',
    calculateAmount:
      BASE_URL + '/tenant/payments/calculate-amount/:subscriptionId',
    subscriptionHistory: BASE_URL + '/tenant/subscriptions/history',
    toggleAutoRenew: BASE_URL + '/tenant/subscriptions/auto-renew',
    paymentTransactions: BASE_URL + '/tenant/payment/transactions',
    createPayment: BASE_URL + `/tenant/payments/create`,
  },
  public: {
    login: BASE_URL + '/auth/login',
    lookup: BASE_URL + '/auth/lookup',
    findOrganizations: BASE_URL + '/auth/organization/find',
    createUser: BASE_URL + '/users/create',
  },
};
