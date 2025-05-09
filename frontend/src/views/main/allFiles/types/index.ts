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
  onUpload: (
    file: File, 
    folderPath: string, 
    progressCallback: (progress: number) => void
  ) => Promise<boolean>;
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

export type {
  AddButtonProps,
  CreateFolderModalProps,
  FileControlBarProps,
  FileItemProps,
  FolderBreadcrumb,
  HeaderBreadcrumbProps,
	UploadFileModalProps,
};
