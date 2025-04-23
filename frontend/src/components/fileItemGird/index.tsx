import { Checkbox } from 'antd';
import { useState } from 'react';
import DropdownMenu from '@/components/DropdownMenu';
import useFileIcon from '@/hooks/useFileIcon';

// 文件项属性
interface FileItemProps {
  // 文件
  file: any;
  // 点击事件处理函数
  onClick?: () => void;
  // 是否选中状态
  isSelected?: boolean;
  // 选中事件
  onSelect?: (checked: boolean) => void;
}

const FileItemGird: React.FC<FileItemProps> = ({ file, onClick, isSelected = false, onSelect }) => {
	// 获取图标URL
  const iconUrl = useFileIcon(file.fileName);

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
          <DropdownMenu file={file} />
        </div>
      )}

      {/* 文件图标 */}
      <div className="mb-2 flex h-20 w-20 items-center justify-center">
        <img src={iconUrl} alt={file.fileName} className="h-full w-full object-contain" />
      </div>

      {/* 文件名 */}
      <div className="w-full text-center">
        <p className="truncate text-sm font-medium text-gray-800">{file.fileName}</p>
      </div>

      {/* 文件时间 */}
      <div className="mt-1 text-xs text-gray-500">{file.fileTime}</div>
    </div>
  );
};

export default FileItemGird;
