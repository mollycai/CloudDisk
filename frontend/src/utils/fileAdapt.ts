import { formatDateTime } from './date';

// 适配函数
export function adaptBackendToFrontend(backendData: Array<any>, currentPath = '') {
	return backendData.map((item) => {
		// 获取当前路径的父目录
    const parentPath = currentPath.split('/').slice(0, -1).join('/');
		const fullPath = parentPath ? `${parentPath}/` : '';
		const fileName = formatName(item.name, fullPath);
    return {
      id: item.etag || fileName, // 使用etag作为唯一标识@TODO 待更改
      fileName: fileName || '',
      fileTime: formatDateTime(item.lastModified) || '',
      size: formatFileSize(item.size), // 需要实现格式化函数
      type: item.name.endsWith('/') ? 'folder' : 'file', // 根据contentType判断类型
      url: parentPath ? `${parentPath}/${fileName}` : fileName
    };
  });
}

// 格式化文件名，去掉末尾的/
function formatName(name: string, currentPath: string) {
	// 格式化文件名，去掉当前路径前缀
	let formattedName = name;
	if (currentPath && formattedName.startsWith(currentPath)) {
		formattedName = name.slice(currentPath.length);
	}
	// 去掉末尾的/
	if (formattedName.endsWith('/')) {
		formattedName = formattedName.slice(0, -1);
	}
	return formattedName
}

// 文件大小格式化函数
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
