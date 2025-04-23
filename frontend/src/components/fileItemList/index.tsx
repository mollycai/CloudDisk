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

const FileItemList: React.FC<FileItemProps> = ({ file, onClick, isSelected = false, onSelect }) => {
  // 获取图标URL
	const iconUrl = useFileIcon(file.fileName);

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
        <img src={iconUrl} alt={file.fileName} className="mr-3 h-8 w-8 object-contain" />
        <span className="truncate">{file.fileName}</span>
      </div>

      {/* 修改时间 */}
      <div className="w-40 text-sm text-gray-500">{file.fileTime}</div>

      {/* 文件大小 */}
      <div className="w-24 text-sm text-gray-500">{file.fileSize}</div>

      {/* 操作按钮 */}
      {isHovered ? (
        <div className="w-12 text-right">
          <DropdownMenu file={file} />
        </div>
      ) : (
        <div className="w-12" />
      )}
    </div>
  );
};

export default FileItemList;
