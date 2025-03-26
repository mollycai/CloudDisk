import { FileAddOutlined, FolderAddOutlined, FolderOutlined, PlusOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, message } from 'antd';

const onClick: MenuProps['onClick'] = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const items: MenuProps['items'] = [
  {
    label: '新建文件夹',
    key: '1',
		icon: <FolderOutlined />
  },
  {
    label: '上传文件夹',
    key: '2',
		icon: <FolderAddOutlined />
  },
  {
    label: '上传文件',
    key: '3',
		icon: <FileAddOutlined />
  },
];

const AddButton: React.FC = () => {
  return (
    <Dropdown menu={{ items, onClick }} trigger={['click']} placement="topRight">
      <div className='upload-button'>
				<PlusOutlined />
      </div>
    </Dropdown>
  );
};

export default AddButton;
