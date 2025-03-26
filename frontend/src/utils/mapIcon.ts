interface FileIconMap {
  [key: string]: string;
}

// 使用 Vite 的静态资源处理方式
const fileIconMap: FileIconMap = {
  // 文档类型
  'doc': 'word.png',
  'docx': 'word.png',
  'txt': 'txt.png',
  'pdf': 'pdf.png',
  'rtf': 'txt.png',
	'md': 'markdown.png',
	'ppt':'ppt.png',
	'pptx':'ppt.png',
  
  // 表格类型
  'xls': 'excel.png',
  'xlsx': 'excel.png',
  'csv': 'excel.png',
  
  // 图片类型
  'jpg': 'picture.png',
  'jpeg': 'picture.png',
  'png': 'picture.png',
  'gif': 'picture.png',
  'svg': 'picture.png',
  'bmp': 'picture.png',
  
  // 压缩包类型
  'zip': 'zip.png',
  'rar': 'zip.png',
  '7z': 'zip.png',
  'tar': 'zip.png',
  'gz': 'zip.png',
  
  // 代码类型
  'js': 'code.png',
  'jsx': 'code.png',
  'ts': 'code.png',
  'tsx': 'code.png',
  'html': 'code.png',
  'css': 'code.png',
  'json': 'code.png',
  
  // 音频类型
  'mp3': 'audio.png',
  'wav': 'audio.png',
  'ogg': 'audio.png',
  'flac': 'audio.png',
  'aac': 'audio.png',
  'm4a': 'audio.png',
  
  // 视频类型
  'mp4': 'video.png',
  'avi': 'video.png',
  'mov': 'video.png',
  'wmv': 'video.png',
  'flv': 'video.png',
  'mkv': 'video.png',
  'webm': 'video.png',
  
  // 默认图标
  'default': 'others.png'
};

/**
 * 根据文件名获取对应的图标文件名
 * @param fileName 文件名
 * @returns 图标文件名
 */
export const getFileIconName = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  return fileIconMap[extension] || fileIconMap['default'];
};