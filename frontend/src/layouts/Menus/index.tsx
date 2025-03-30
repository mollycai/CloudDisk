import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Menu, MenuProps } from 'antd';

import menuItems from './mock.tsx';
import { MenuItem } from './types';

import { setBreadcrumb } from '@/redux/modules/breadcrumb/action';
import { BreadcrumbItem } from '@/redux/types/index.ts';

const LayoutMenus = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);

  // 路由转面包屑列表
  const mapMenuToBreadcrumb = (menuItems: any) => {
    let breadcrumbList: BreadcrumbItem[] = [];
    for (const item of menuItems) {
      if (item.children) {
        breadcrumbList = breadcrumbList.concat(mapMenuToBreadcrumb(item.children));
      } else {
        breadcrumbList.push({
          path: item.key,
          title: item.label,
        });
      }
    }
    return breadcrumbList;
  };

  const breadcrumbItems = mapMenuToBreadcrumb(menuItems);
  const getMenuData = () => {
    // 模拟从后端获取菜单
    setMenuList(menuItems);
    // 设置面包屑
    setBreadcrumb(breadcrumbItems);
  };

  // 点击当前菜单跳转页面
  const navigate = useNavigate();
  const clickMenu: MenuProps['onClick'] = useCallback(
    ({ key }: { key: string }) => {
      navigate(key);
      const matchedBreadcrumb = breadcrumbItems.filter((item) => item.path === key);
      dispatch(setBreadcrumb(matchedBreadcrumb));
    },
    [dispatch, navigate, breadcrumbItems],
  );

  useEffect(() => {
    setSelectedKeys([pathname]);
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
