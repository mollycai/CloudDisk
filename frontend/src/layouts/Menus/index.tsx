import { Menu, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import menuItems from './mock.tsx';
import { MenuItem } from './types';

const LayoutMenus = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([]);

  const getMenuData = () => {
    // 模拟从后端获取菜单
    setMenuList(menuItems);
  };
  // 点击当前菜单跳转页面
  const navigate = useNavigate();
  const clickMenu: MenuProps['onClick'] = ({ key }: { key: string }) => {
    navigate(key);
  };

  useEffect(() => {
    getMenuData();
  }, []);
  return <Menu theme="dark" mode="inline" defaultSelectedKeys={['/home']} items={menuList} onClick={clickMenu} />;
};

export default LayoutMenus;
