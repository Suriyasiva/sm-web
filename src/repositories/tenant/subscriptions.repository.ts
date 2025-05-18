import API from '../../services/api.service';
import { Endpoints } from '../../constants/Endpoints';
import { IAPIResponse, ISubscriptionPlan } from '../../types';
import {
  ICalculateSubscriptionResponse,
  ISubscriptionStatusHistory,
} from '../../store/super_admin/interface';

class SubscriptionRepository {
  async getSubscriptionPlans(): Promise<IAPIResponse<ISubscriptionPlan[]>> {
    return API.get(Endpoints.tenant.getSubscriptionPlans);
  }

  async calculateAmountForSelectedSubscription(
    subscriptionId: string,
  ): Promise<IAPIResponse<ICalculateSubscriptionResponse>> {
    return API.get(Endpoints.tenant.calculateAmount, {
      pathParams: {
        subscriptionId,
      },
    });
  }

  async getCustomerSubscriptionHistory(): Promise<
    IAPIResponse<ISubscriptionStatusHistory[]>
  > {
    return API.get(Endpoints.tenant.subscriptionHistory);
  }
  async toggleAutoRenew(): Promise<IAPIResponse<{ message: string }>> {
    return API.put(Endpoints.tenant.toggleAutoRenew);
  }
}

const subscriptionRepository = new SubscriptionRepository();
export default subscriptionRepository;
