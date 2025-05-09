import { http } from "..";

export const getFilesByCategory = (ids: string[]): Promise<any> => {
  return http.request('post', '/mock/file/category', { data: ids });
};