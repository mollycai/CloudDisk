import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useState } from 'react';

const LayoutHeader = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
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
    </Header>
  );
};

export default LayoutHeader;
