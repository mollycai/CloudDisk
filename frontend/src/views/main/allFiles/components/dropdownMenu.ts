import { MenuProps } from 'antd';

// 下拉菜单
export const dropdownMenu: MenuProps['items'] = [
  {
    key: 'download',
    label: '下载',
    onClick: (e) => {
      e.domEvent.stopPropagation();
    },
  },
  {
    key: 'share',
    label: '分享',
    onClick: (e) => {
      e.domEvent.stopPropagation();
    },
  },
  {
    key: 'rename',
    label: '重命名',
    onClick: (e) => {
      e.domEvent.stopPropagation();
    },
  },
  {
    key: 'move',
    label: '移动',
    onClick: (e) => {
      e.domEvent.stopPropagation();
    },
  },
  {
    key: 'view',
    label: '查看详细信息',
    onClick: (e) => {
      e.domEvent.stopPropagation();
    },
  },
  {
    key: 'delete',
    label: '加入回收站',
    danger: true,
    onClick: (e) => {
      e.domEvent.stopPropagation();
    },
  },
];
