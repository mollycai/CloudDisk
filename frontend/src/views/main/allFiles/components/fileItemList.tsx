import { getFileIconName } from '@/utils/mapIcon';
import { MoreOutlined } from '@ant-design/icons';
import { Checkbox, Dropdown } from 'antd';
import { useMemo, useState } from 'react';
import { FileItemProps } from '../types';
import { dropdownMenu } from './dropdownMenu';

// 动态导入所有图标文件
const iconModules = import.meta.glob('@/assets/fileIcon/*.png', { eager: true });

const FileItemList: React.FC<FileItemProps> = ({
  fileName,
  fileTime,
  fileSize,
  onClick,
  isSelected = false,
  onSelect,
}) => {
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
      className={`flex items-center border-b border-gray-100 p-3 hover:bg-gray-50 ${
        isSelected ? 'border border-blue-200 bg-blue-50' : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered || isSelected ? (
        <div className="w-12" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onSelect?.(e.target.checked);
            }}
          />
        </div>
      ) : (
        <div className="w-12" />
      )}

      {/* 文件图标和名称 */}
      <div className="flex min-w-0 flex-1 items-center">
        <img src={iconUrl} alt={fileName} className="mr-3 h-8 w-8 object-contain" />
        <span className="truncate">{fileName}</span>
      </div>

      {/* 修改时间 */}
      <div className="w-40 text-sm text-gray-500">{fileTime}</div>

      {/* 文件大小 */}
      <div className="w-24 text-sm text-gray-500">{fileSize}</div>

      {/* 操作按钮 */}

      {isHovered && iconName !== 'folder.png' ? (
        <div className="w-12 text-right">
          <Dropdown menu={{ items: dropdownMenu }} trigger={['click']}>
            <MoreOutlined
              className="cursor-pointer text-gray-400 hover:text-gray-600"
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        </div>
      ) : (
        <div className="w-12" />
      )}
    </div>
  );
};

export default FileItemList;
