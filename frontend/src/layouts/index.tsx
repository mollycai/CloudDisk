import { Layout, theme } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import LayoutFooter from './Footer';
import LayoutHeader from './Header';
import Logo from './Logo';
import LayoutMenus from './Menus';

const { Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
