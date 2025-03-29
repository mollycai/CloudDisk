import { FileAddOutlined, FolderAddOutlined, FolderOutlined, PlusOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { AddButtonProps } from '../types';

const AddButton: React.FC<AddButtonProps> = ({ onOpenFolderModal, onOpenUploadModal }) => {
  const items: MenuProps['items'] = [
    {
      label: '新建文件夹',
      key: '1',
      icon: <FolderOutlined />,
      onClick: onOpenFolderModal,
    },
    {
      label: '上传文件夹',
      key: '2',
      icon: <FolderAddOutlined />,
    },
    {
      label: '上传文件',
      key: '3',
      icon: <FileAddOutlined />,
      onClick: onOpenUploadModal,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="topRight">
      <div className="upload-button">
        <PlusOutlined />
      </div>
    </Dropdown>
  );
};

export default AddButton;
