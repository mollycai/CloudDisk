import FileItemGird from '@/components/fileItemGird';
import MultiSelectActions from '@/components/MultiSelectAction';
import { Checkbox, Empty } from 'antd';
import { useState } from 'react';
import { FileCategoryListProps } from '../types';

const FileCategoryList: React.FC<FileCategoryListProps> = ({ files }) => {
  // 选中的文件
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());

  // 检查是否全选
  const isAllSelected = selectedFiles.size === files.length && files.length > 0;

  // 全选/取消全选
  const handleSelectAll = (checked: boolean) => {
    const newSelected = new Set(checked ? files.map((file) => file.id) : []);
    setSelectedFiles(newSelected);
  };

  // 多选
  const handleSelect = (fileId: number, checked: boolean) => {
    const newSelected = new Set(selectedFiles);
    checked ? newSelected.add(fileId) : newSelected.delete(fileId);
    setSelectedFiles(newSelected);
  };

  // 批量下载 @TODO对这几个通用的方法封装成hook
  const handleMultiDownload = () => {
    console.log('下载文件');
  };

  // 批量删除
  const handleMultiDelete = () => {
    console.log('删除文件');
  };

  // 批量分享
  const handleMultiShare = () => {
    console.log('分享文件');
  };

  return (
    <>
      {/* 多选框 */}
      {files.length > 0 && (
        <Checkbox
          checked={isAllSelected}
          indeterminate={selectedFiles.size > 0 && selectedFiles.size < files.length}
          onClick={() => handleSelectAll(!isAllSelected)}
          className="pb-2 pt-6"
        >
          {selectedFiles.size > 0 ? `已选 ${selectedFiles.size} 项` : `共 ${files.length} 项`}
        </Checkbox>
      )}
      {/* 列表 */}
      {files.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {files.map((file) => (
            <FileItemGird
              key={file.id}
              file={file}
              isSelected={selectedFiles.has(file.id)}
              onSelect={(checked) => handleSelect(file.id, checked)}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="列表为空" />
        </div>
      )}
      {/* 多选时的控制列表 */}
      <MultiSelectActions
        selectedFiles={selectedFiles}
        allFiles={files}
        onDownload={handleMultiDownload}
        onDelete={handleMultiDelete}
        onShare={handleMultiShare}
      />
    </>
  );
};
export default FileCategoryList;
