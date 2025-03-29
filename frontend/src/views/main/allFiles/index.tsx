import { message } from 'antd';
import { useState } from 'react';
import AddButton from './components/addButton';
import CreateFolderModal from './components/createFolderDialog';
import FileList from './components/fileList';
import HeaderBreadcrumb from './components/headerBreadcrumb';
import UploadFileModal from './components/uploadFileDialog';
import './index.less';

const AllFiles: React.FC = () => {
  // 新建文件夹弹窗
  const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);
  const handleCreateFolder = (folderName: string) => {
    // @TODO
    message.success(`文件夹 ${folderName} 创建成功`);
    setIsFolderModalVisible(false);
  };

  // 上传文件弹窗
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const handleUploadFile = async (file: File) => {
    // 这里实现实际的上传逻辑，例如调用API
    console.log('上传文件:', file.name);
    // 模拟上传延迟
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return Promise.resolve();
  };
  return (
    <div>
      {/* 头部面包屑 */}
      <HeaderBreadcrumb />

      {/* 文件列表 */}
      <FileList />

      {/* 添加按钮 */}
      <AddButton
        onOpenFolderModal={() => setIsFolderModalVisible(true)}
        onOpenUploadModal={() => setIsUploadModalVisible(true)}
      />

      {/* 新建文件夹弹窗 */}
      <CreateFolderModal
        visible={isFolderModalVisible}
        onCancel={() => setIsFolderModalVisible(false)}
        onCreate={handleCreateFolder}
      />

      {/* 上传文件弹窗 */}
      <UploadFileModal
        visible={isUploadModalVisible}
        onCancel={() => setIsUploadModalVisible(false)}
        onUpload={handleUploadFile}
      />
    </div>
  );
};
export default AllFiles;
