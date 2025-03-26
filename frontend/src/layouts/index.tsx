import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import LayoutFooter from './Footer';
import LayoutHeader from './Header';
import Logo from './Logo';
import LayoutMenus from './Menus';

const { Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed] = useState(false);

  return (
    <Layout className="h-full">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        <Logo />
        <LayoutMenus />
      </Sider>
      <Layout>
        <LayoutHeader />
        <Content
          style={{
            margin: '24px 16px 0px',
          }}
        >
          <Outlet />
        </Content>
        <LayoutFooter />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
