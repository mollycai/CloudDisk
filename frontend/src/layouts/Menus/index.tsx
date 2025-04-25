import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, MenuProps } from 'antd';
import menuItems from './mock.tsx';
import { MenuItem } from './types';

const LayoutMenus = () => {
  const { pathname } = useLocation();
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);

  const getMenuData = () => {
    // 模拟从后端获取菜单
    setMenuList(menuItems);
  };

  // 点击当前菜单跳转页面
  const navigate = useNavigate();
  const clickMenu: MenuProps['onClick'] = useCallback(
    ({ key }: { key: string }) => {
      navigate(key);
    },
    [navigate],
  );

  useEffect(() => {
    // 匹配/allFiles及其子路由
    if (pathname.startsWith('/allFiles')) {
      setSelectedKeys(['/allFiles']);
    } else {
      setSelectedKeys([pathname]);
    }
  }, [pathname]);

  useEffect(() => {
    // @TODO 暂时在这里获取menudata
    getMenuData();
  }, []);
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['/home']}
      selectedKeys={selectedKeys}
      items={menuList}
      onClick={clickMenu}
    />
  );
};

export default LayoutMenus;
