import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { FolderBreadcrumb } from '../types';
import FileControlBar from './fileControlBar';
import FileItemGird from './fileItemGird';
import FileItemList from './fileItemList';

// 表头组件
const FileListHeader = () => {
  return (
    <div className="flex items-center border-b border-gray-200 bg-gray-50 p-3 font-medium text-gray-600">
      <div className="w-12"></div>
      <div className="flex-1">名称</div>
      <div className="w-40">修改时间</div>
      <div className="w-24">大小</div>
      <div className="w-12"></div>
    </div>
  );
};

const FileList: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(
    (localStorage.getItem('fileViewMode') || 'grid') as 'list' | 'grid',
  );

  useEffect(() => {
    localStorage.setItem('fileViewMode', viewMode);
  }, [viewMode]);

  const params = useParams();
  const folderPath = params['*'] || '';

  // 获取context传参
  const { files, sortFile, updateBreadcrumb } = useOutletContext<{
    files: any[];
    sortFile: (order: 'asc' | 'desc') => void;
    updateBreadcrumb: (newFolder: FolderBreadcrumb) => void;
  }>();

  // 点击文件夹事件
  const handleFolderClick = (file: any) => {
    if (file.type === 'folder') {
      // 创建新条目
      const newFolder = {
        id: file.id,
        name: file.fileName,
        path: folderPath ? `/allFiles/${folderPath}/${file.id}` : `/allFiles/${file.id}`,
      };

      // 获取当前缓存
      const cachedBreadcrumbs: FolderBreadcrumb[] = JSON.parse(localStorage.getItem('folderBreadCrumb') || '[]');

      // 更新缓存
      const newBreadcrumbs = [...cachedBreadcrumbs, newFolder];
      localStorage.setItem('folderBreadCrumb', JSON.stringify(newBreadcrumbs));
      updateBreadcrumb(newFolder);
    }
  };

  // 全选/取消全选
  const handleSelectAll = (checked: boolean) => {
    const newSelected = new Set(checked ? files.map((file) => file.id) : []);
    setSelectedFiles(newSelected);
  };

  // 排序文件
  const handleSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    sortFile(order);
  };

  // 多选
  const handleSelect = (fileId: number, checked: boolean) => {
    const newSelected = new Set(selectedFiles);
    checked ? newSelected.add(fileId) : newSelected.delete(fileId);
    setSelectedFiles(newSelected);
  };

  // 切换视图
  const handleViewChange = (view: 'list' | 'grid') => {
    setViewMode(view);
  };

  // 检查是否全选
  const isAllSelected = selectedFiles.size === files.length && files.length > 0;

  return (
    <div className="pt-4">
      {/* 控制按钮栏 */}
      <FileControlBar
        selectedFiles={selectedFiles}
        allFiles={files}
        onSelectAll={handleSelectAll}
        onSortChange={handleSortChange}
        onViewChange={handleViewChange}
        isAllSelected={isAllSelected}
        currentSort={sortOrder}
        currentView={viewMode}
      />

      {/* 文件列表 grid布局 */}
      {viewMode === 'grid' && (
        <div className="flex flex-wrap gap-2">
          {files.map((file) => (
            <FileItemGird
              key={file.id}
              file={file}
              isSelected={selectedFiles.has(file.id)}
              onSelect={(checked) => handleSelect(file.id, checked)}
              onClick={() => handleFolderClick(file)}
            />
          ))}
        </div>
      )}

      {/* 文件列表 list布局 */}
      {viewMode === 'list' && (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <FileListHeader />
          {files.map((file) => (
            <FileItemList
              key={file.id}
              file={file}
              isSelected={selectedFiles.has(file.id)}
              onSelect={(checked) => handleSelect(file.id, checked)}
              onClick={() => handleFolderClick(file)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;
