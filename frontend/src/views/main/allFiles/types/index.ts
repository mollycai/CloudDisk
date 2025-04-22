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

// 添加按钮属性
interface AddButtonProps {
  onOpenFolderModal: () => void; // 接收父组件传递的方法
  onOpenUploadModal: () => void;
}

// 创建文件夹弹窗属性
interface CreateFolderModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: (folderName: string) => void;
}

// 上传文件弹窗属性
interface UploadFileModalProps {
  visible: boolean;
  onCancel: () => void;
  onUpload: (file: File) => Promise<void>; // 支持异步上传
}

// 面包屑导航项属性
interface FolderBreadcrumb {
  id: number | string;
  name: string;
  path: string;
}
interface HeaderBreadcrumbProps {
  folderBreadCrumb: FolderBreadcrumb[];
}

// 文件详情弹窗属性
interface FileDetailModalProps {
  visible: boolean;
  file: any; // 传递文件信息
	setVisible: (visible: boolean) => void;
}

// 重命名文件夹弹窗属性
interface RenameModalProps {
	visible: boolean;
	file: any;
  setVisible: (visible: boolean) => void;
}

interface DropdownMenuProps {
	// @TODO 后面定义file类型
  file: any;
}

export type {
  AddButtonProps,
  CreateFolderModalProps,
  FileControlBarProps,
	FileDetailModalProps,
	RenameModalProps,
  FileItemProps,
  FolderBreadcrumb,
  HeaderBreadcrumbProps,
	UploadFileModalProps,
	DropdownMenuProps
};
