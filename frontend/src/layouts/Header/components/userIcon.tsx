import InfoDrawer from '@/layouts/Drawer';
import { store } from '@/redux';
import { setToken } from '@/redux/modules/globals/action';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserIcon = () => {
  // 控制抽屉的打开和关闭
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // 下拉菜单项
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '用户信息',
      icon: <UserOutlined />,
      onClick: () => {
        // 跳转到用户信息页面
        showDrawer();
        console.log('进入用户信息');
      },
    },
    {
      key: '2',
      label: '设置',
      icon: <SettingOutlined />,
      onClick: () => {
        // 跳转到设置页面
        console.log('进入设置');
      },
    },
    {
      key: '3',
      label: '退出登录',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        // 处理退出登录逻辑
        localStorage.removeItem('token');
				store.dispatch(setToken(''));
        navigate('/login', { replace: true });
      },
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']}>
        <div className="user-icon-container">
          <Avatar size="default" icon={<UserOutlined />} />
        </div>
      </Dropdown>
      <InfoDrawer open={open} onClose={onClose} />
    </>
  );
};

export default UserIcon;
