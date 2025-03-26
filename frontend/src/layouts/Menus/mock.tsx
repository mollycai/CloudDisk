import {
  DashboardOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  ProductOutlined,
  SmileOutlined,
} from '@ant-design/icons';

import { MenuItem } from './types';

const menuItems: MenuItem[] = [
  {
    key: '/home',
    label: '首页',
    icon: <HomeOutlined />,
  },
  {
    key: '/dashboard',
    label: '使用情况',
    icon: <DashboardOutlined />,
  },
  {
    key: '/allFiles',
    label: '所有文件',
    icon: <FolderOpenOutlined />,
  },
  {
    key: '/fileCategory',
    label: '文件分类',
    icon: <ProductOutlined />,
  },
  {
    key: '/help',
    label: '帮助',
    icon: <SmileOutlined />,
  },
];

export default menuItems;
