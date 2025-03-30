import { http } from '..';
import { ReqLoginForm, ReqRegisterForm } from '../types';

/** 登录 */
export const login = (data?: ReqLoginForm): Promise<{ token?: string; msg?: string }> => {
  return http.request('post', '/api/user/login', { data });
};

/** 注册 */
export const register = (data?: ReqRegisterForm): Promise<{ msg?: string }> => {
  return http.request('post', '/api/user/signup', { data });
};
