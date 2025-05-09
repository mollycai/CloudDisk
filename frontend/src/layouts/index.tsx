import { Layout, theme } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import LayoutFooter from './Footer';
import LayoutHeader from './Header';
import Logo from './Logo';
import LayoutMenus from './Menus';
import StorageStatus from '@/components/StorageStatus';

const { Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        theme="dark"
        className="relative"
      >
        <div className="overflow-y-auto">
          <Logo />
          <LayoutMenus />
        </div>
        <div className="fixed bottom-0 left-0 w-[200px]">
          <StorageStatus />
        </div>
      </Sider>
      <Layout>
        <LayoutHeader />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        {/* <LayoutFooter /> */}
      </Layout>
    </Layout>
  );
};

export default AppLayout;
