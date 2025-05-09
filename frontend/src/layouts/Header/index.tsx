import { Input, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';

import UserIcon from './components/userIcon';
import './index.less';
import { SearchOutlined } from '@ant-design/icons';

const LayoutHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header style={{ background: colorBgContainer }} className="flex items-center justify-between p-0 px-4">
      {/* 搜索框 */}
      <div className="w-72 flex align-center">
        <Input
          placeholder="搜索文件或文件夹"
          prefix={<SearchOutlined className="text-gray-400" />}
          allowClear
          className="rounded-md bg-gray-100 border-0 h-10"
        />
      </div>

      {/* 用户头像 */}
      <UserIcon />
    </Header>
  );
};

export default LayoutHeader;
