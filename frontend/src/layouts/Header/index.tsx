import { useState } from 'react';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';

import LayoutBreadcrumb from './components/breadcrumb';
import UserIcon from './components/userIcon';
import './index.less';

const LayoutHeader = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header style={{ background: colorBgContainer }} className="flex justify-start p-0">
      {/* 折叠 */}
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      {/* 面包屑 */}
      <LayoutBreadcrumb />
      {/* 用户头像 */}
      <UserIcon />
    </Header>
  );
};

export default LayoutHeader;
