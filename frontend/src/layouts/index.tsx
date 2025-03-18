import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
import LayoutFooter from './Footer';
import LayoutMenus from './Menus';
import LayoutHeader from './Header';
import Logo from './Logo';

const { Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-full">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
				<Logo/>
        <LayoutMenus />
      </Sider>
      <Layout>
				<LayoutHeader/>
        <Content
          style={{
            margin: '24px 16px 0px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <LayoutFooter/>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
