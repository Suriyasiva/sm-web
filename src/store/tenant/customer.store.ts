import { create } from 'zustand';
import {
  ISubscriptionTransaction,
  IUserSubscription,
  SetParamType,
} from '../../types';
import customerRepository from '../../repositories/tenant/customer.repo';
import { EnumPaymentStatus, IPaymentOptions } from '../super_admin/interface';

export interface ICustomerStore {
  // booleans
  isFetchingSubscription: boolean;
  isFetchingPaymentTransactions: boolean;
  isCreatingPayment: boolean;
  isSimulatingPaymentFail: boolean;

  // states
  customerSubscription: IUserSubscription;
  customerPaymentTransactions: ISubscriptionTransaction[];

  // methods
  getCustomerSubscription: () => Promise<void>;
  getPaymentTransactions: () => Promise<void>;
  createPayment: (payload: IPaymentOptions) => Promise<void>;
  simulatePaymentFail: (payload: IPaymentOptions) => Promise<void>;
}

async function getCustomerSubscription(set: SetParamType<ICustomerStore>) {
  try {
    set({ isFetchingSubscription: true });
    const response = await customerRepository.getCustomerSubscription();
    set({ customerSubscription: response.data });
  } catch (error: any) {
    throw new Error(error);
  } finally {
    set({ isFetchingSubscription: false });
  }
}

async function getPaymentTransactions(set: SetParamType<ICustomerStore>) {
  try {
    set({ isFetchingPaymentTransactions: true });
    const response = await customerRepository.getPaymentTransactions();

    set({ customerPaymentTransactions: response.data });
  } catch (error: any) {
    throw new Error(error);
  } finally {
    set({ isFetchingPaymentTransactions: false });
  }
}

async function createPayment(
  set: SetParamType<ICustomerStore>,
  payload: IPaymentOptions,
) {
  try {
    set({ isCreatingPayment: true });
    await customerRepository.createPayment(payload);
  } catch (error: any) {
    throw new Error(error);
  } finally {
    set({ isCreatingPayment: false });
  }
}
async function simulatePaymentFail(
  set: SetParamType<ICustomerStore>,
  payload: IPaymentOptions,
) {
  try {
    set({ isSimulatingPaymentFail: true });
    await customerRepository.createPayment({
      ...payload,
      status: EnumPaymentStatus.FAILED,
    });
  } catch (error: any) {
    throw new Error(error);
  } finally {
    set({ isSimulatingPaymentFail: false });
  }
}

const useCustomerStore = create<ICustomerStore>((set) => ({
  isFetchingSubscription: false,
  isFetchingPaymentTransactions: false,
  isCreatingPayment: false,
  isSimulatingPaymentFail: false,
  customerSubscription: {} as IUserSubscription,
  customerPaymentTransactions: [],
  getCustomerSubscription: async () => getCustomerSubscription(set),
  getPaymentTransactions: async () => getPaymentTransactions(set),
  createPayment: async (payload: IPaymentOptions) =>
    createPayment(set, payload),
  simulatePaymentFail: async (payload: IPaymentOptions) =>
    simulatePaymentFail(set, payload),
}));

export default useCustomerStore;
