// 文件项属性
interface FileItemProps {
  // 文件名
  fileName: string;
  // 文件时间（修改时间或创建时间）
  fileTime: string;
	// 文件大小
	fileSize?: string;
  // 点击事件处理函数
  onClick?: () => void;
  // 是否选中状态
  isSelected?: boolean;
  // 选中事件
  onSelect?: (checked: boolean) => void;
}

// 文件控制栏属性
interface FileControlBarProps {
  selectedFiles: Set<number>;
	allFiles: FileItemProps[];
  onSelectAll: (checked: boolean) => void;
  onSortChange: (sortType: 'asc' | 'desc') => void;
  onViewChange: (viewType: 'list' | 'grid') => void;
  isAllSelected: boolean;
  currentSort: 'asc' | 'desc';
  currentView: 'list' | 'grid';
}

export type { FileItemProps, FileControlBarProps };
