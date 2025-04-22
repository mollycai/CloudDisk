import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { useState } from 'react';
import { DropdownMenuProps } from '../types';
import FileInfoDialog from './FIleInfoDialog';
import RenameDialog from './renameDialog';

const DropdownMenu: React.FC<DropdownMenuProps> = ({ file }) => {
  // 展示文件详情
  const [fileInfoVisible, setFileInfoVisible] = useState<boolean>(false);

  // 展示重命名
  const [renameVisible, setRenameVisible] = useState<boolean>(false);

  const dropdownMenu: MenuProps['items'] = [
    {
      key: 'download',
      label: '下载',
      onClick: (e) => {
        e.domEvent.stopPropagation();
      },
    },
    {
      key: 'share',
      label: '分享',
      onClick: (e) => {
        e.domEvent.stopPropagation();
      },
    },
    {
      key: 'rename',
      label: '重命名',
      onClick: (e) => {
        e.domEvent.stopPropagation();
        setRenameVisible(true);
      },
    },
    {
      key: 'move',
      label: '移动',
      onClick: (e) => {
        e.domEvent.stopPropagation();
      },
    },
    {
      key: 'view',
      label: '查看详细信息',
      onClick: (e) => {
        e.domEvent.stopPropagation();
        setFileInfoVisible(true);
      },
    },
    {
      key: 'delete',
      label: '加入回收站',
      danger: true,
      onClick: (e) => {
        e.domEvent.stopPropagation();
      },
    },
  ];
  return (
    <>
      {/* 下拉列表 */}
      <Dropdown menu={{ items: dropdownMenu }} trigger={['click']}>
        <MoreOutlined
          className="cursor-pointer text-gray-400 hover:text-gray-600"
          onClick={(e) => e.stopPropagation()}
        />
      </Dropdown>
      {/* 文件详情 */}
      <FileInfoDialog visible={fileInfoVisible} setVisible={setFileInfoVisible} file={file} />
      {/* 文件重命名 */}
      <RenameDialog visible={renameVisible} setVisible={setRenameVisible} file={file} />
    </>
  );
};
export default DropdownMenu;
