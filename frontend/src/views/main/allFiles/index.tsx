import { getAllFile } from '@/api/modules/allFiles';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import AddButton from './components/addButton';
import CreateFolderModal from './components/createFolderDialog';
import HeaderBreadcrumb from './components/headerBreadcrumb';
import UploadFileModal from './components/uploadFileDialog';
import './index.less';
import { FolderBreadcrumb } from './types';
import { adaptBackendToFrontend } from '@/utils/fileAdapt';

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

  // 文件列表面包屑
  const [folderBreadCrumb, setFolderBreadCrumb] = useState<FolderBreadcrumb[]>(
    JSON.parse(localStorage.getItem('folderBreadCrumb') || '[]'),
  );
  const navigate = useNavigate();
  const updateBreadcrumb = (folder: FolderBreadcrumb) => {
    navigate(folder.path);
	};

  // 获取数据
  const params = useParams();
  const folderPath = params['*'] || '';
  const [files, setFiles] = useState<any[]>([]);
  const fetchFiles = async (currentFolderPath: any) => {
    try {
			const res = await getAllFile(currentFolderPath || "");
			if (res.data.code === 200) {
				const fileList = adaptBackendToFrontend(res.data.data, currentFolderPath)
				setFiles(fileList)
			} else { 
				message.error(`获取文件列表失败:${res.data.message}`);
			}
    } catch (error) {
      message.error(`获取文件列表失败:${error}`);
    }
  };
	
  useEffect(() => {
		if (folderPath) {
			// 分割路由路径，获取最后一个id
      const folderIdArray = folderPath.split('/');

      // 获取文件数据
      fetchFiles(folderPath + '/');

      // 处理面包屑
			const cachedBreadcrumbs: FolderBreadcrumb[] = JSON.parse(localStorage.getItem('folderBreadCrumb') || '[]');
      const newBreadcrumbs = folderIdArray.map((id, index) => {
        const existing = cachedBreadcrumbs.find((item) => item.id == id);
        return (
          existing || {
            id,
            name: `${id}`,
            path: `/allFiles/${folderIdArray.slice(0, index + 1).join('/')}`,
          }
        );
			});
			
      // 一次性更新状态和localStorage
      setFolderBreadCrumb(newBreadcrumbs);
      localStorage.setItem('folderBreadCrumb', JSON.stringify(newBreadcrumbs));
    } else {
      fetchFiles('');
      setFolderBreadCrumb([]);
      localStorage.setItem('folderBreadCrumb', '[]');
    }
  }, [folderPath]);

  // 排序文件
  const sortFile = (order: 'asc' | 'desc') => {
    setFiles((prev) =>
      [...prev].sort((a, b) => {
        return order === 'asc' ? a.fileTime.localeCompare(b.fileTime) : b.fileTime.localeCompare(a.fileTime);
      }),
    );
  };

  return (
    <div>
      {/* 头部面包屑 */}
      <HeaderBreadcrumb folderBreadCrumb={folderBreadCrumb} />

      {/* 文件列表 */}
      <Outlet context={{ files, sortFile, updateBreadcrumb }} />

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
