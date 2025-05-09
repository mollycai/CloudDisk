import { deleteFile, downloadFile } from '@/api/modules/allFiles';
import { FileContext } from '@/context/fileContext';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, message } from 'antd';
import { useContext, useState } from 'react';
import FileInfoDialog from './components/fileInfoDialog';
import RenameDialog from './components/renameDialog';
import { DropdownMenuProps } from './types';

const DropdownMenu: React.FC<DropdownMenuProps> = ({ file }) => {
  // 展示文件详情
  const [fileInfoVisible, setFileInfoVisible] = useState<boolean>(false);

  // 展示重命名
  const [renameVisible, setRenameVisible] = useState<boolean>(false);
  const { refreshFiles } = useContext(FileContext);
  // 获取父路径
  const getParentPath = (url: string) => {
    const lastSlashIndex = url.lastIndexOf('/');
    if (lastSlashIndex === -1) return ''; // 如果没有斜杠，说明是根目录
    const parentPath = url.substring(0, lastSlashIndex); // 去掉最后一个斜杠
    return parentPath === '' ? '' : parentPath; // 如果去掉斜杠后为空字符串，说明是根目录下的文件夹
  };

  const dropdownMenu: MenuProps['items'] = [
    {
      key: 'download',
      label: '下载',
      onClick: async (e) => {
        console.log(e, file);
        e.domEvent.stopPropagation();
        const res = await downloadFile(file.url);
        console.log(res);
        const link = document.createElement('a');
        link.href = res.data.data; // 使用后端返回的URL
        link.download = file.fileName; // 设置下载文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
      onClick: async (e) => {
        e.domEvent.stopPropagation();
        const url = file.type === 'folder' ? `${file.url}/` : file.url;
        const res = await deleteFile([url]);
        if (res.data.code === 200) {
          message.success('加入回收站成功');
          const parentPath = getParentPath(file.url);
          refreshFiles(parentPath === '' ? '' : parentPath + '/');
        } else {
          message.error(`加入回收站失败：${res.data.msg}`);
        }
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
