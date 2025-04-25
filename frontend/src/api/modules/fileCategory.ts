import { http } from "..";

export const getFilesByCategory = (ids: string[]): Promise<any> => {
  return http.request('post', '/api/file/category', { data: ids });
};