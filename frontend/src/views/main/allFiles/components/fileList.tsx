import React, { useState } from 'react';
import FileControlBar from './fileControlBar';
import FileItemGird from './fileItemGird';
import FileItemList from './fileItemList';

const mockFiles = [
  { id: 1, fileName: '文档.docx', fileTime: '2023-06-15', size: '2.4 MB' },
  { id: 2, fileName: '数据.xlsx', fileTime: '2023-06-14', size: '2.4 MB' },
  { id: 3, fileName: '图片.jpg', fileTime: '2023-06-13', size: '2.4 MB' },
  { id: 4, fileName: '代码.js', fileTime: '2023-06-12', size: '2.4 MB' },
];

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
  const [files, setFiles] = useState(mockFiles);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  // 全选/取消全选
  const handleSelectAll = (checked: boolean) => {
    const newSelected = new Set(checked ? files.map((f) => f.id) : []);
    setSelectedFiles(newSelected);
  };

  // 排序文件
  const handleSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    setFiles((prev) =>
      [...prev].sort((a, b) => {
        return order === 'asc' ? a.fileTime.localeCompare(b.fileTime) : b.fileTime.localeCompare(a.fileTime);
      }),
    );
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
              fileName={file.fileName}
              fileTime={file.fileTime}
              isSelected={selectedFiles.has(file.id)}
              onSelect={(checked) => handleSelect(file.id, checked)}
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
              fileName={file.fileName}
              fileTime={file.fileTime}
              fileSize={file.size}
              isSelected={selectedFiles.has(file.id)}
              onSelect={(checked) => handleSelect(file.id, checked)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;
