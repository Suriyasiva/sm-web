import { Endpoints } from '../../constants/Endpoints';
import API from '../../services/api.service';
import { IPaymentOptions } from '../../store/super_admin/interface';
import {
  IAPIResponse,
  ICreateCustomer,
  ISubscriptionTransaction,
  IUserSubscription,
} from '../../types';

class CustomerRepository {
  async getCustomerSubscription(): Promise<IAPIResponse<IUserSubscription>> {
    return API.get(Endpoints.tenant.subscription);
  }

  async createCustomer(
    payload: ICreateCustomer,
  ): Promise<IAPIResponse<ICreateCustomer>> {
    return API.post(Endpoints.tenant.createCustomer, {
      body: payload,
    });
  }

  async getPaymentTransactions(): Promise<
    IAPIResponse<ISubscriptionTransaction[]>
  > {
    return API.get(Endpoints.tenant.paymentTransactions);
  }

  async createPayment(payload: IPaymentOptions) {
    return API.post(Endpoints.tenant.createPayment, {
      body: payload,
    });
  }
}

const customerRepository = new CustomerRepository();
export default customerRepository;
