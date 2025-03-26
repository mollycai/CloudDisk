import {
  DashboardOutlined,
  DatabaseOutlined,
  HomeOutlined,
  ProfileOutlined,
  RocketOutlined,
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
    icon: <DatabaseOutlined />,
  },
  {
    key: '/fileCategory',
    label: '文件分类',
    icon: <ProfileOutlined />,
  },
  {
    key: '/uploadFile',
    label: '上传文件',
    icon: <RocketOutlined />,
  },
  {
    key: '/help',
    label: '帮助',
    icon: <SmileOutlined />,
  },
];

export default menuItems;
