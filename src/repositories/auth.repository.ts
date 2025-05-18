import { Endpoints } from '../constants/Endpoints';
import API from '../services/api.service';
import { ICreateTenant } from '../store/super_admin/interface';
import {
  IAPIResponse,
  IFindOrganization,
  ILoginResponse,
  IUserLookupResponse,
} from '../types';

class AuthRepository {
  async tenantLogin(payload: {
    username: string;
    password: string;
  }): Promise<IAPIResponse<ILoginResponse>> {
    return API.post(Endpoints.tenant.tenantLogin, {
      body: {
        email: payload.username,
        password: payload.password,
      },
    });
  }

  async tenantLookupUser(): Promise<IAPIResponse<IUserLookupResponse>> {
    return API.get(Endpoints.tenant.tenantLookup);
  }

  async findOrganization(
    code: string,
  ): Promise<IAPIResponse<IFindOrganization>> {
    return API.post(Endpoints.public.findOrganizations, {
      body: {
        organizationIdentifier: code,
      },
    });
  }

  async createTenant(payload: ICreateTenant): Promise<any> {
    return API.post(Endpoints.public.createUser, {
      body: {
        ...payload,
      },
    });
  }
}

const authRepository = new AuthRepository();
export default authRepository;
