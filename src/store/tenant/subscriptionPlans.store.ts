import { create } from 'zustand';
import { ISubscriptionPlan, SetParamType } from '../../types';
import subscriptionRepository from '../../repositories/tenant/subscriptions.repository';
import {
  ICalculateSubscriptionResponse,
  ISubscriptionStatusHistory,
} from '../super_admin/interface';

export interface ISubscriptionPlans {
  // booleans
  isFetchingSubscriptionPlans: boolean;
  isFetchingSelectedSubscriptionPlan: boolean;
  isFetchingSubscriptionHistory: boolean;

  // states
  subscriptionPlans: ISubscriptionPlan[];
  selectedSubscription: ICalculateSubscriptionResponse;
  customerSubscriptionHistory: ISubscriptionStatusHistory[];

  // methods
  getSubscriptionPlans: () => Promise<void>;
  calculateAmountForSelectedSubscription: (
    selectedSubscriptionId: string,
  ) => Promise<void>;
  getCustomerSubscriptionHistory: () => Promise<void>;
}

async function getSubscriptionPlans(set: SetParamType<ISubscriptionPlans>) {
  try {
    set({ isFetchingSubscriptionPlans: true });
    const response = await subscriptionRepository.getSubscriptionPlans();
    set({ subscriptionPlans: response.data });
  } catch (error: any) {
    throw new Error(error);
  } finally {
    set({ isFetchingSubscriptionPlans: false });
  }
}

async function calculateAmountForSelectedSubscription(
  set: SetParamType<ISubscriptionPlans>,
  selectedSubscriptionId: string,
) {
  try {
    set({ isFetchingSelectedSubscriptionPlan: true });
    const response =
      await subscriptionRepository.calculateAmountForSelectedSubscription(
        selectedSubscriptionId,
      );
    set({ selectedSubscription: response.data });
  } catch (error: any) {
    throw new Error(error);
  } finally {
    set({ isFetchingSelectedSubscriptionPlan: false });
  }
}

async function getCustomerSubscriptionHistory(
  set: SetParamType<ISubscriptionPlans>,
) {
  try {
    set({ isFetchingSubscriptionHistory: false });
    const subscriptionHistory =
      await subscriptionRepository.getCustomerSubscriptionHistory();

    set({ customerSubscriptionHistory: subscriptionHistory.data });
  } catch (error: any) {
    throw new Error(error);
  } finally {
    set({ isFetchingSubscriptionHistory: false });
  }
}

const useSubscriptionPlansStore = create<ISubscriptionPlans>((set) => ({
  isFetchingSubscriptionPlans: false,
  isFetchingSelectedSubscriptionPlan: false,
  isFetchingSubscriptionHistory: false,
  subscriptionPlans: [],
  selectedSubscription: {} as ICalculateSubscriptionResponse,
  customerSubscriptionHistory: [],
  getSubscriptionPlans: async () => getSubscriptionPlans(set),
  calculateAmountForSelectedSubscription: async (
    selectedSubscriptionId: string,
  ) => calculateAmountForSelectedSubscription(set, selectedSubscriptionId),
  getCustomerSubscriptionHistory: async () =>
    getCustomerSubscriptionHistory(set),
}));

export default useSubscriptionPlansStore;
