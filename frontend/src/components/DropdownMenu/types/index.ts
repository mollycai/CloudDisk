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

export type { DropdownMenuProps, FileDetailModalProps, RenameModalProps };
