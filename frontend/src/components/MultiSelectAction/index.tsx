import { DeleteOutlined, DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

interface MultiSelectActionsProps {
  selectedFiles: Set<number>;
  allFiles: any[];
  onDownload: () => void;
  onDelete: () => void;
  onShare: () => void;
}

const MultiSelectActions: React.FC<MultiSelectActionsProps> = ({
  selectedFiles,
  allFiles,
  onDownload,
  onDelete,
  onShare,
}) => {
  if (selectedFiles.size === 0) return null;

  const selectedFileObjects = allFiles.filter((file) => selectedFiles.has(file.id));

  return (
    <div className="fixed bottom-10 left-1/2 flex -translate-x-1/2 transform items-center space-x-3 rounded-lg bg-black/80 p-3 shadow-xl backdrop-blur-sm">
      <div className="mr-2 text-sm text-white">已选择 {selectedFiles.size} 个文件</div>
      <div className="flex space-x-2">
        <Button
          type="text"
          icon={<DownloadOutlined className="p-1 text-white" />}
          onClick={onDownload}
          disabled={selectedFileObjects.some((file) => file.type === 'folder')}
          className="p-1 hover:bg-gray-200"
          title="下载"
        />
        <Button
          type="text"
          icon={<ShareAltOutlined className="p-1 text-white" />}
          onClick={onShare}
          className="p-1 hover:bg-gray-200"
          title="分享"
        />
        <Button
          type="text"
          icon={<DeleteOutlined className="p-1 text-red-400" />}
          onClick={onDelete}
          className="p-1 hover:bg-gray-200"
          title="删除"
        />
      </div>
    </div>
  );
};

export default MultiSelectActions;
