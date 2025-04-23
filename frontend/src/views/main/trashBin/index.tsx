import { Empty } from 'antd';

const TrashBin = () => {
  const isEmpty = true; // 实际使用时应从API获取

  return (
    <div className="p-6">
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center h-96">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div className="text-center">
                <p className="text-gray-800">回收站为空</p>
                <p className="text-gray-500 text-sm mt-2">
                  回收站内容保存10天，到期后自动清理
                </p>
              </div>
            }
          />
        </div>
      ) : (
        <div>回收站内容列表</div>
      )}
    </div>
  );
};

export default TrashBin;