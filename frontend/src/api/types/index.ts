import { Method } from 'axios';

export type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'>;

export interface ReqLoginForm {
  username: string;
  password: string;
}

export interface ReqRegisterForm {
  username: string;
  password: string;
  email: string;
}

export interface ResLogin {
  toke?: string;
  msg?: string;
}
