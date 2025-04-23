import { http } from "..";

export const getFilesByCategory = (ids: string[]): Promise<any> => {
	console.log(ids)
  return http.request('post', '/api/file/category', { data: ids });
};