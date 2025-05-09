import { http } from "..";

export const getRecycleBinFiles = (): Promise<any> => {
  return http.request('post', '/mock/file/recycleBin');
};
