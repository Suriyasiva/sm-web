export interface ISelectOptions {
  label: string;
  value: string;
}

export type SetParamType<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean,
) => void;

export type GetParamType<T> = () => T;

export interface IAPIResponse<T> {
  data: T;
  statusCode: number;
  timestamp: string;
  success?: boolean;
}

export interface ILoginResponse {
  token: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  encryptedPassword: string;
}

export interface ILoginParam {
  username: string;
  password: string;
}

export interface IUserLookupResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ISubscriptionPlan {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  code: string;
  description: string;
  billingCycle: IBillingCycle;
  price: string;
  timePeriod: string;
  trialPeriodDays: string;
  gracePeriodDays: string;
  status: PlanStatus;
  metadata: {
    tags: string[];
  };
}

export enum IBillingCycle {
  FREEMIUM = 'FREEMIUM',
  MONTHLY = 'MONTHLY',
  ANNUALLY = 'ANNUALLY',
}

export type PlanStatus = 'ACTIVE' | 'INACTIVE';

export interface IUserSubscription {
  id: string;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  subscriptionPlanId: string;
  status: 'ACTIVE' | 'INACTIVE' | string;
  subscriptionStatus: 'FREEMIUM' | 'MONTHLY' | 'ANNUALLY' | string;
  startedAt: string;
  expiredAt: string;
  autoRenew: boolean;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  subscriptionPlan: {
    billingCycle: string;
    code: string;
    name: string;
    status: string;
    timePeriod: string;
    trialPeriodDays: string;
  };
}

export interface ICreateCustomer {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ISubscriptionTransaction {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  type: 'CREDIT' | 'REFUND' | 'DEBIT';
  subscriptionPlanId: string;
  customerSubscriptionId: string;
  customerId: string;
  externalTransactionId: string;
  externalOrderId: string;
  amount: string;
  paymentProvider: string;
  metaData: Record<string, string>;
  subscriptionPlan: {
    code: 'MONTHLY_BASIC' | 'FREEMIUM' | 'ANNUAL_PREMIUM';
  };
}

export interface IFindOrganization {
  identifier: string;
  organizationName: string;
  organizationCode: string;
}
