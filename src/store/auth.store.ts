import { StoreApi, create } from 'zustand';
import {
  ICreateCustomer,
  IFindOrganization,
  ILoginParam,
  IUserLookupResponse,
  SetParamType,
} from '../types';
import {
  PREF_ACCESS_TOKEN,
  PREF_CURRENT_USER,
  PREF_ORGANIZATION_INFO,
} from '../constants/PreferenceKey';
import { showToast } from '../util/toast.util';
import { PUBLIC_PATH, Routes } from '../constants/Routes';
import authRepository from '../repositories/auth.repository';
import customerRepository from '../repositories/tenant/customer.repo';
import { ICreateTenant } from './super_admin/interface';

export enum AuthState {
  notDetermined,
  isDeterming,
  isAuthenticating,
  authenticated,
  unauthenticated,
}

export interface AuthStore {
  authState: AuthState;
  currentUser?: IUserLookupResponse;
  isLoggingIn: boolean;
  isLoading: boolean;
  isDeterminingRoute: boolean;
  isDetermining: boolean;
  isCreatingCustomer: boolean;
  isFindingOrganization: boolean;
  isCreatingTenant: boolean;

  organizationInfo: IFindOrganization;

  onLogin(payload: ILoginParam): Promise<boolean>;
  lookupUser(force?: boolean): Promise<void>;
  logout(): void;
  setRouteDetermination(value: boolean): void;
  createCustomer: (payload: ICreateCustomer) => Promise<void>;
  findOrganization: (code: string) => Promise<void>;
  createTenant: (payload: ICreateTenant) => Promise<void>;
}

function markAsUnauthenticated(set: SetParamType<AuthStore>) {
  localStorage.removeItem(PREF_ACCESS_TOKEN);
  localStorage.removeItem(PREF_CURRENT_USER);
  localStorage.removeItem(PREF_ORGANIZATION_INFO);

  set({
    authState: AuthState.unauthenticated,
    currentUser: undefined,
  });
}

async function handleLogin(
  set: SetParamType<AuthStore>,
  store: StoreApi<AuthStore>,
  payload: ILoginParam,
): Promise<boolean> {
  set({ isLoggingIn: true });
  try {
    const loginResponse = await authRepository.tenantLogin(payload);
    const currentState = store.getState();
    localStorage.setItem(
      PREF_ACCESS_TOKEN,
      `Bearer ${loginResponse.data.token}`,
    );
    localStorage.setItem(
      PREF_ORGANIZATION_INFO,
      JSON.stringify(currentState.organizationInfo),
    );

    await handleLookupUser(set, true);
    return true;
  } catch (e) {
    markAsUnauthenticated(set);
    showToast('error', (e as Error).message, 'error');
    return false;
  } finally {
    set({ isLoggingIn: false });
  }
}

async function handleLookupUser(
  set: SetParamType<AuthStore>,
  shouldNavigate = false,
) {
  set({ authState: AuthState.isDeterming, isDetermining: true });
  try {
    const user = await authRepository.tenantLookupUser();
    const organizationInfo = localStorage.getItem(PREF_ORGANIZATION_INFO);
    let orgIdentifier = null;
    if (organizationInfo) {
      const parsedOrganizationInfo = JSON.parse(organizationInfo);
      orgIdentifier = parsedOrganizationInfo.organizationCode;
    }
    const organization = await authRepository.findOrganization(orgIdentifier);
    localStorage.setItem(PREF_CURRENT_USER, JSON.stringify(user.data));
    set({
      authState: AuthState.authenticated,
      currentUser: user.data,
      isDeterminingRoute: shouldNavigate,
      organizationInfo: organization.data,
    });
  } catch (e) {
    markAsUnauthenticated(set);
    if (!PUBLIC_PATH.includes(location.pathname)) {
      location.pathname = Routes.auth.findOrganization;
    }
  } finally {
    set({ isDetermining: false });
  }
}

async function handleLogout(set: SetParamType<AuthStore>) {
  markAsUnauthenticated(set);
}

async function createTenant(
  set: SetParamType<AuthStore>,
  payload: ICreateTenant,
) {
  try {
    set({ isCreatingTenant: true });
    const response = await authRepository.createTenant(payload);
    showToast('Organization Created', response.data.organizationCode, 'info');
  } catch (error: any) {
    throw new Error(error);
  } finally {
    set({ isCreatingTenant: false });
  }
}

async function createCustomer(
  set: SetParamType<AuthStore>,
  payload: ICreateCustomer,
) {
  try {
    set({ isCreatingCustomer: true });
    await customerRepository.createCustomer(payload);
  } catch (error: any) {
    throw new Error(error);
  } finally {
    set({ isCreatingCustomer: false });
  }
}

async function findOrganization(set: SetParamType<AuthStore>, code: string) {
  try {
    set({ isFindingOrganization: true });
    const response = await authRepository.findOrganization(code);
    if (!response) {
      showToast('error', 'Organization not found.', 'error');
      throw new Error('Organization not found.');
    }

    localStorage.setItem(PREF_ORGANIZATION_INFO, JSON.stringify(response.data));

    set({ organizationInfo: response.data });
  } catch (error) {
    showToast('error', 'Organization not found.', 'error');
  } finally {
    set({ isFindingOrganization: false });
  }
}

const useAuthStore = create<AuthStore>((set, _get, store) => ({
  authState: AuthState.unauthenticated,
  currentUser: undefined,
  isLoggingIn: false,
  isLoading: false,
  isDeterminingRoute: false,
  isDetermining: false,
  isFindingOrganization: false,
  isCreatingTenant: false,

  isCreatingCustomer: false,

  organizationInfo: {} as IFindOrganization,

  onLogin: async (payload: ILoginParam) => handleLogin(set, store, payload),
  lookupUser: async (force: boolean) => handleLookupUser(set, force),
  logout: async () => handleLogout(set),
  setRouteDetermination: (value: boolean) => set({ isDeterminingRoute: value }),
  createCustomer: (payload: ICreateCustomer) => createCustomer(set, payload),
  findOrganization: (code: string) => findOrganization(set, code),
  createTenant: (payload: ICreateTenant) => createTenant(set, payload),
}));

export default useAuthStore;
