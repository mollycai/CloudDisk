import { Method } from 'axios';

export type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'>;

export interface responseType  { 
	code: number;
	data: any;
	msg: string;
}