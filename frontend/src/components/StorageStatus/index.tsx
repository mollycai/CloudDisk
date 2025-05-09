import { Modal, Progress } from 'antd';
import { useState } from 'react';

const StorageStatus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="mt-auto cursor-pointer border-t border-gray-700 bg-blue-900/20 p-3 backdrop-blur-sm transition-colors hover:bg-blue-900/30"
      >
        <div className="text-sm text-white/80">
          <span>1GB</span> / <span className="text-white/60">10GB</span>
        </div>
        <Progress
          percent={10}
          size="small"
          showInfo={false}
          className="[&_.ant-progress-bg]:bg-blue-400 [&_.ant-progress-inner]:bg-gray-700"
        />
      </div>
      <Modal
        title="存储详情"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div className="space-y-4">
          <p className="pt-5">
            已使用: <span className="font-medium">1GB</span>
          </p>
          <p>
            总容量: <span className="font-medium">10GB</span>
          </p>
          <p>
            剩余: <span className="font-medium">9GB</span>
          </p>
          <Progress
            percent={10}
            status="active"
          />
        </div>
      </Modal>
    </>
  );
};

export default StorageStatus;
