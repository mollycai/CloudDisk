import { useMemo } from 'react';
import { getFileIconName } from '@/utils/mapIcon';

// 动态导入所有图标文件（放在Hook外部，避免重复执行）
const iconModules = import.meta.glob('@/assets/fileIcon/*.png', { eager: true });

export default function useFileIcon(fileName: string) {
  const iconName = useMemo(() => getFileIconName(fileName), [fileName]);
  
  const iconUrl = useMemo(() => {
    const defaultIcon = (iconModules['/src/assets/fileIcon/others.png'] as { default: string }).default;
    return (iconModules[`/src/assets/fileIcon/${iconName}`] as { default: string })?.default || defaultIcon;
  }, [iconName]);

  return iconUrl;
}