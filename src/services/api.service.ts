import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  PREF_ACCESS_TOKEN,
  PREF_ORGANIZATION_INFO,
} from '../constants/PreferenceKey';
import { IAPIResponse } from '../types';

interface IAPIOption {
  queryParams?: Record<string, string> | object;
  pathParams?: object;
  body?: object;
  headers?: object;
  formData?: object;
}

interface IServerError {
  message: {
    message: { message: string }[] | { message: string };
  };
}

// queryParams: {},
//   pathParams: {},
//   body: {},
//   headers: {}

/**
 * @typedef {Object} APIOptions
 * @property {Object} queryParams
 * @property {Object} pathParams
 * @property {Object} body
 * @property {Object} headers
 * @property {string} accessTokenPreferenceKey
 */

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

const DEFAULT_OPTIONS = {
  queryParams: {},
  pathParams: {},
  body: {},
  headers: {},
  formData: {},
};

const SOMETHING_WENT_WRONG = 'Something went wrong. Please try again later';

function _formattedErrorMessage(serverError: IServerError | string) {
  if (typeof serverError === 'string') return serverError;

  if (typeof serverError === 'object') {
    if (Object.keys(serverError).length === 0) return;

    const error = serverError?.message ?? {};

    if (Array.isArray(error.message)) {
      return error.message[0].message;
    } else {
      return _formattedErrorMessage(error as unknown as string);
    }
  }
}

const _getErrorMessage = (axiosError: AxiosError) => {
  const response = axiosError.response;

  if (!response) return SOMETHING_WENT_WRONG;

  const serverError = response.data as IServerError;
  const serverErrorMessage = _formattedErrorMessage(serverError);

  if (!serverErrorMessage) return axiosError?.message || SOMETHING_WENT_WRONG;
  if (typeof serverErrorMessage === 'object') {
    return axiosError?.message || SOMETHING_WENT_WRONG;
  }

  return serverErrorMessage;
};

class APIService {
  private accessTokenPreferenceKey: string;

  constructor(options: { accessTokenPreferenceKey: string }) {
    this.accessTokenPreferenceKey = options.accessTokenPreferenceKey;
  }

  /**
   *
   * @param {string} url
   * @param {APIOptions} options
   * @returns
   */
  get = async <T>(
    url: string,
    options: IAPIOption = DEFAULT_OPTIONS,
  ): Promise<IAPIResponse<T>> => {
    const qp = ({ ...options.queryParams } as Record<string, string>) || {};

    url = this._prepareURL(url, { ...options, queryParams: qp });
    const _headers = this._prepareHeaders(options);

    try {
      const response = await axios.get(url, { headers: _headers });
      const data = await _formattedResponse<T>(response);

      return data;
    } catch (e) {
      const errorMessage = _getErrorMessage(e as unknown as AxiosError);
      throw new Error(errorMessage);
    }
  };

  /**
   *
   * @param {string} url
   * @param {APIOptions} options
   * @returns
   */
  async post<T>(
    url: string,
    options: IAPIOption = DEFAULT_OPTIONS,
    isUpload = false,
  ): Promise<IAPIResponse<T>> {
    url = this._prepareURL(url, options);
    const _headers = this._prepareHeaders(options);
    if (options.formData && Object.keys(options.formData).length) {
      const data = new FormData();
      Object.keys(options.formData).forEach((item) => {
        const dataValue = options.formData as { [x: string]: string };
        data.append(item, dataValue[item]);
      });
      options.body = data;
    }
    try {
      const response = await axios.post(url, options.body, {
        headers: _headers,
        ...(isUpload && {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }),
      });

      const data = await _formattedResponse<T>(response);
      return data;
    } catch (e) {
      const errorMessage = _getErrorMessage(e as unknown as AxiosError);
      throw new Error(errorMessage);
    }
  }

  /**
   *
   * @param {string} url
   * @param {APIOptions} options
   * @returns
   */
  put = async <T>(
    url: string,
    options: IAPIOption = DEFAULT_OPTIONS,
  ): Promise<IAPIResponse<T>> => {
    url = this._prepareURL(url, options);
    const _headers = this._prepareHeaders(options);

    try {
      if (options.formData && Object.keys(options.formData).length) {
        const data = new FormData();
        Object.keys(options.formData).forEach((item) => {
          const dataValue = options.formData as { [x: string]: string };
          data.append(item, dataValue[item]);
        });
        options.body = data;
      }
      const response = await axios.put(url, options.body, {
        headers: _headers,
      });
      const data = await _formattedResponse<T>(response);

      return data;
    } catch (e) {
      const errorMessage = _getErrorMessage(e as unknown as AxiosError);
      throw new Error(errorMessage);
    }
  };

  /**
   *
   * @param {string} url
   * @param {APIOptions} options
   * @returns
   */
  delete = async <T>(url: string, options: IAPIOption = DEFAULT_OPTIONS) => {
    url = this._prepareURL(url, options);
    const _headers = this._prepareHeaders(options);

    try {
      const response = await axios.delete(url, { headers: _headers });
      const data = await _formattedResponse<T>(response);

      return data;
    } catch (e) {
      const errorMessage = _getErrorMessage(e as unknown as AxiosError);
      throw new Error(errorMessage);
    }
  };

  /**
   *
   * @param {string} url
   * @param {APIOptions} options
   */
  _prepareURL = (url: string, options: IAPIOption = DEFAULT_OPTIONS) => {
    const { queryParams, pathParams = {} } = options;

    Object.entries(pathParams).forEach(([k, v]) => {
      url = url.replace(`:${k}`, v as string);
    });

    if (queryParams) {
      const params = new URLSearchParams(queryParams as Record<string, string>);
      const qp = params.toString();

      url = url + `?${qp}`;
    }

    return url;
  };

  _prepareHeaders = (options: IAPIOption = DEFAULT_OPTIONS) => {
    const organizationInfo = localStorage.getItem(PREF_ORGANIZATION_INFO);
    let orgIdentifier = null;
    if (organizationInfo) {
      const parsedOrganizationInfo = JSON.parse(organizationInfo);
      orgIdentifier = parsedOrganizationInfo.identifier;
    }
    return {
      Authorization: `${localStorage.getItem(this.accessTokenPreferenceKey)}`,
      'x-tenant-id': orgIdentifier ?? 'suriya_org',
      ...(options?.headers || {}),
    };
  };
}

/**
 *
 * @param {AxiosResponse} response
 */
const _formattedResponse = async <T>(
  response: AxiosResponse<unknown, unknown>,
): Promise<IAPIResponse<T>> => {
  // if (response.data.data) {
  //   return response.data.data
  // }

  return response.data as IAPIResponse<T>;
};

const API = new APIService({ accessTokenPreferenceKey: PREF_ACCESS_TOKEN });
export default API;
