import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { RequestMethods } from './types';

import NProgress from '@/config/nprogress';

// 默认配置
const defaultConfig = {
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 10000,
  withCredentials: true,
};

class RequestHttp {
  private static axiosInstance: AxiosInstance;
  constructor() {
    if (!RequestHttp.axiosInstance) {
      RequestHttp.axiosInstance = Axios.create(defaultConfig);
      this.httpInterceptorsRequest();
      this.httpInterceptorsResponse();
    }
  }

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    RequestHttp.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        NProgress.start();
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    RequestHttp.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        NProgress.done();
        return response;
      },
      async (error: AxiosError) => {
        NProgress.done();
        return Promise.reject(error);
      },
    );
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: AxiosRequestConfig,
  ): Promise<T> {
    // 重组配置
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    } as AxiosRequestConfig;
    // 单独处理自定义请求/响应回调
    return new Promise<T>((resolve, reject) => {
      RequestHttp.axiosInstance
        .request<any, T>(config)
        .then((response: T) => {
          resolve(response);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  /** get工具函数 */
  public get<T, P>(url: string, params?: AxiosRequestConfig<P>, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('get', url, params, config);
  }

  /** post工具函数 */
  public post<T, P>(url: string, params?: AxiosRequestConfig<P>, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('post', url, params, config);
  }

  /** put工具函数 */
  public put<T, P>(url: string, params?: AxiosRequestConfig<P>, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('put', url, params, config);
  }

  /** delete工具函数 */
  public delete<T, P>(url: string, params?: AxiosRequestConfig<P>, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('delete', url, params, config);
  }
}

export const http = new RequestHttp();
