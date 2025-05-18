export interface IStaffParams {
  page: number;
  size: number;
  q?: string;
  role?: string;
}

export interface IStaffDetails {
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  role: string;
  phoneNumber: string;
  countryCode: string;
  templeId: string;
}

export interface StaffData {
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  role: string;
  phoneNumber: string;
  countryCode: string;
  templeId: string;
  encryptedPassword: string | null;
  lastActiveAt: string | null;
  avatarUrl: string | null;
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  isVerified: boolean;
}

export interface IStaff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  category: string;
  status: string;
  phoneNumber: string;
  countryCode: string;
  avatarUrl: string | null;
}

export interface IStaffsResponse {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  results?: IStaff[];
}

export interface IUpdatedStaffsPayload {
  firstName: string;
  lastName: string;
  role: string;
}

export interface ICalculateSubscriptionResponse {
  calculatedAmount: CalculatedAmount;
  newSubscriptionPlan: SubscriptionPlan;
  currentSubscription: CurrentSubscription;
}

interface CalculatedAmount {
  usedAmount: number;
  remainingAmount: number;
  payableAmount: number;
}

interface SubscriptionPlan {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  code: string;
  description: string;
  billingCycle: 'MONTHLY' | 'ANNUALLY' | string;
  price: string;
  timePeriod: string;
  trialPeriodDays: string;
  gracePeriodDays: string;
  status: 'ACTIVE' | 'INACTIVE' | string;
  metadata: {
    tags: string[];
  };
}

interface CurrentSubscription {
  id: string;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  subscriptionPlanId: string;
  status: 'ACTIVE' | 'INACTIVE' | string;
  subscriptionStatus: string;
  startedAt: string;
  expiredAt: string;
  autoRenew: boolean;
  subscriptionPlan: SubscriptionPlan;
}

export interface ISubscriptionStatusHistory {
  id: string;
  createdAt: string;
  updatedAt: string;
  subscriptionPlanId: string;
  status: 'ACTIVE' | 'INACTIVE';
  fromStatus: string;
  toStatus: string;
  subscriptionStatus: string;
  customerSubscriptionsId: string;
  customerId: string;
}

export enum EnumPaymentStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}

export enum EnumPaymentPaymentProvider {
  STRIP = 'STRIP',
  RAZORPAY = 'RAZORPAY',
  BILL_DESK = 'BILL_DESK',
}

export interface IPaymentOptions {
  status: EnumPaymentStatus;
  type: string;
  subscriptionPlanId: string;
  customerSubscriptionId: string;
  paymentProvider: EnumPaymentPaymentProvider;
  externalTransactionId?: string;
  externalOrderId?: string;
  amount: number;
  metaData?: Record<string, any>;
}
export interface ICreateTenant {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organizationName: string;
  domain: string;
}
export interface ILookUpOrganizationInfo {
  identifier: string;
  organizationName: string;
  organizationCode: string;
}
