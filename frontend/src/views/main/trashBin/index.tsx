import { getRecycleBinFiles } from '@/api/modules/trashBin';
import { Empty } from 'antd';
import { useEffect, useState } from 'react';
import FileTrashBinList from './components/fileTrashBinList';
import TrashBinController from './components/trashBinController';

const TrashBin = () => {
  // 选中的文件
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  // 回收站文件列表
  const [fileList, setFileList] = useState<any[]>([]);
  // 检查是否全选
  const isAllSelected = selectedFiles.size === fileList.length && fileList.length > 0;

  // 多选
  const handleSelect = (fileId: number, checked: boolean) => {
    const newSelected = new Set(selectedFiles);
    checked ? newSelected.add(fileId) : newSelected.delete(fileId);
    setSelectedFiles(newSelected);
	};
	
	// 全选/取消全选
  const handleSelectAll = (checked: boolean) => {
    const newSelected = new Set(checked ? fileList.map((file) => file.id) : []);
    setSelectedFiles(newSelected);
  };

  // 获取列表数据
  const fetchFiles = async () => {
    try {
      const res = await getRecycleBinFiles();
      setFileList(res.data.data);
    } catch (error) {
      console.error('获取文件列表失败:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      {fileList.length === 0 ? (
        <div className="flex h-96 flex-col items-center justify-center">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div className="text-center">
                <p className="text-gray-800">回收站为空</p>
                <p className="mt-2 text-sm text-gray-500">回收站内容保存10天，到期后自动清理</p>
              </div>
            }
          />
        </div>
      ) : (
        <>
          <TrashBinController
            selectedFiles={selectedFiles}
            allFiles={fileList}
            isAllSelected={isAllSelected}
            onSelectAll={handleSelectAll}
          />
          <FileTrashBinList files={fileList} selectedFiles={selectedFiles} onSelect={handleSelect} />
        </>
      )}
    </div>
  );
};

export default TrashBin;
