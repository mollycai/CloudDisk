import { getFileIconName } from '@/utils/mapIcon';
import { MoreOutlined } from '@ant-design/icons';
import { Checkbox, Dropdown } from 'antd';
import { useMemo, useState } from 'react';
import { FileItemProps } from '../types';
import { dropdownMenu } from './dropdownMenu';

// 动态导入所有图标文件
const iconModules = import.meta.glob('@/assets/fileIcon/*.png', { eager: true });

const FileItemGird: React.FC<FileItemProps> = ({ fileName, fileTime, onClick, isSelected = false, onSelect }) => {
  // 获取图标URL，使用useMemo缓存图标URL，避免每次渲染都重新计算
  const iconName = useMemo(() => getFileIconName(fileName), [fileName]);
  const iconUrl = useMemo(() => {
    const defaultIcon = (iconModules['/src/assets/fileIcon/others.png'] as { default: string }).default;
    return (iconModules[`/src/assets/fileIcon/${iconName}`] as { default: string })?.default || defaultIcon;
  }, [iconName]);

  // 判断是否浮动
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex h-40 w-36 cursor-pointer flex-col items-center rounded-lg p-4 hover:bg-gray-100 ${
        isSelected ? 'border border-blue-200 bg-blue-50' : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 左上角选择框 - 悬停时显示 */}
      {(isHovered || isSelected) && (
        <div className="absolute left-2 top-2 z-10" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onSelect?.(e.target.checked);
            }}
          />
        </div>
      )}

      {/* 右上角下拉菜单 - 悬停时显示 */}
      {isHovered && (
        <div className="absolute right-2 top-2 z-10" onClick={(e) => e.stopPropagation()}>
          <Dropdown menu={{ items: dropdownMenu }} trigger={['click']}>
            <MoreOutlined className="text-gray-500 hover:text-gray-700" onClick={(e) => e.stopPropagation()} />
          </Dropdown>
        </div>
      )}

      {/* 文件图标 */}
      <div className="mb-2 flex h-20 w-20 items-center justify-center">
        <img src={iconUrl} alt={fileName} className="h-full w-full object-contain" />
      </div>

      {/* 文件名 */}
      <div className="w-full text-center">
        <p className="truncate text-sm font-medium text-gray-800">{fileName}</p>
      </div>

      {/* 文件时间 */}
      <div className="mt-1 text-xs text-gray-500">{fileTime}</div>
    </div>
  );
};

export default FileItemGird;
