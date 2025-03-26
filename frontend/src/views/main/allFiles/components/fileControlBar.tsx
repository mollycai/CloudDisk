import {
  AppstoreOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Checkbox, Dropdown, Radio, Space } from 'antd';
import React from 'react';
import { FileControlBarProps } from '../types';

const FileControlBar: React.FC<FileControlBarProps> = ({
  selectedFiles,
  allFiles,
  onSelectAll,
  onSortChange,
  onViewChange,
  isAllSelected,
  currentSort,
  currentView,
}) => {
  const sortMenuItems: MenuProps['items'] = [
    {
      key: 'asc',
      label: '按时间升序',
      icon: <SortAscendingOutlined />,
      onClick: () => onSortChange('asc'),
    },
    {
      key: 'desc',
      label: '按时间降序',
      icon: <SortDescendingOutlined />,
      onClick: () => onSortChange('desc'),
    },
  ];

  return (
    <div className="flex items-center justify-between bg-white p-2">
      {/* 左侧 - 全选按钮 */}
      <Checkbox
        checked={isAllSelected}
        indeterminate={selectedFiles.size > 0 && selectedFiles.size < allFiles.length}
        onClick={() => onSelectAll(!isAllSelected)}
      >
        {selectedFiles.size > 0 ? `已选 ${selectedFiles.size} 项` : `共 ${allFiles.length} 项`}
      </Checkbox>

      {/* 右侧 - 排序和视图切换 */}
      <Space>
        {/* 排序下拉菜单 */}
        <Dropdown menu={{ items: sortMenuItems }} trigger={['click']}>
          <Button type="text" icon={currentSort === 'asc' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}>
            排序
          </Button>
        </Dropdown>

        {/* 视图切换按钮 */}
        <Radio.Group
          value={currentView}
          onChange={(e) => onViewChange(e.target.value)}
          buttonStyle="solid"
          size="small"
        >
          <Radio.Button value="list">
            <UnorderedListOutlined />
          </Radio.Button>
          <Radio.Button value="grid">
            <AppstoreOutlined />
          </Radio.Button>
        </Radio.Group>
      </Space>
    </div>
  );
};

export default FileControlBar;
