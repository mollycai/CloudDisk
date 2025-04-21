import { http } from '..';

export const getAllFile = (id: any): Promise<any> => {
  return http.request('post', '/api/file/list', { data: id });
};