import { http } from '..';

// mock: /mock/file/list
// 查询目录下文件
export const getAllFile = (path: any): Promise<any> => {
  return http.request('post', '/api/file/files', { data: { path } });
};

// 删除文件
export const deleteFile = (filenames: Array<any>): Promise<any> => {
  return http.request('post', '/api/file/delete', { data: { filenames } });
};

// 重命名文件
export const renameFile = (oldFilename: any, newFilename: any): Promise<any> => {
  return http.request('post', '/api/file/modify', { data: { fileInfo: [{ oldFilename, newFilename }] } });
};

// 移动文件
export const moveFile = (oldFilename: any, newFilename: any): Promise<any> => {
  return http.request('post', '/api/file/move', { data: { fileInfo: [{ oldFilename, newFilename }] } });
};

// 文件上传
export const uploadFile = (file: any, cb: (current: number) => void): Promise<any> => {
  return http.request(
    'post',
    '/api/file/upload',
    { data: file },
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        cb(progressEvent.loaded / progressEvent.total);
      },
    },
  );
};

// 文件下载
export const downloadFile = (path: any): Promise<any> => {
  return http.request('post', '/api/file/download', { data: { path } });
};

// 创建文件夹
export const createFolder = (path: any): Promise<any> => {
  return http.request('post', '/api/file/newFolder', { data: { path } });
};