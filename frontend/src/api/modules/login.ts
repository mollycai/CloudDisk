import { http } from '..';
import { responseType } from '../types';

/** 登录 */
export const login = (data?: any): Promise<responseType> => {
  return http.request('post', '/api/user/login', { data });
};

/** 注册 */
export const register = (data?: any): Promise<responseType> => {
  return http.request('post', '/api/user/signup', { data });
};
