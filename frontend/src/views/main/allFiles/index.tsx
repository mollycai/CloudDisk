import { createFolder, getAllFile, uploadFile } from '@/api/modules/allFiles';
import { FileContext } from '@/context/fileContext';
import { adaptBackendToFrontend } from '@/utils/fileAdapt';
import { Empty, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import AddButton from './components/addButton';
import CreateFolderModal from './components/createFolderDialog';
import HeaderBreadcrumb from './components/headerBreadcrumb';
import UploadFileModal from './components/uploadFileDialog';
import './index.less';
import { FolderBreadcrumb } from './types';

const AllFiles: React.FC = () => {
  // 上传文件弹窗
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const handleUploadFile = async (file: File, folderPath: string, progressCallback: (p: number) => void) => {
    try {
      const res = await uploadFile(file, folderPath, progressCallback);
      if (res.data.code === 200) {
        // 如果在根目录上传，直接传folderPath，否则传folderPath + "/"
        const refreshPath = folderPath === '' ? folderPath : folderPath + '/';
        fetchFiles(refreshPath);
        return true;
      }
      return false;
    } catch (error) {
      message.error('上传失败');
      return false;
    }
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
  // 在fetchFiles函数中添加null判断
  const fetchFiles = async (currentFolderPath: any) => {
    try {
      const res = await getAllFile(currentFolderPath || '');
      if (res.data.code === 200) {
        if (res.data.data) {
          // 过滤掉与当前路径相同的文件
          const filteredData = res.data.data.filter((item: any) => item.name !== currentFolderPath);
					const fileList = adaptBackendToFrontend(filteredData, currentFolderPath);
					console.log('fileList', fileList);
          setFiles(fileList);
        } else {
          setFiles([]); // 当data为null时，设置files为空数组
        }
      } else {
        message.error(`获取文件列表失败:${res.data.message}`);
      }
    } catch (error) {
      message.error(`获取文件列表失败:${error}`);
    }
  };

  // 新建文件夹弹窗
  const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);
  const handleCreateFolder = async (folderName: string) => {
    const newFolderPath = folderPath ? `${folderPath}/${folderName}/` : folderName + '/';
    const res = await createFolder(newFolderPath);
    if (res.data.code === 200) {
      message.success(`文件夹 ${folderName} 创建成功`);
      // 刷新
      const refreshPath = folderPath === '' ? folderPath : folderPath + '/';
      fetchFiles(refreshPath);
    } else {
      message.error(`文件夹创建失败：${res.data.msg}`);
    }
    setIsFolderModalVisible(false);
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

  const outletContext = useMemo(
    () => ({
      files,
      sortFile,
      updateBreadcrumb,
      refreshFiles: (path?: string) => fetchFiles(path || folderPath),
    }),
    [files, sortFile, updateBreadcrumb, fetchFiles, folderPath],
  );

  return (
    <FileContext.Provider value={{ refreshFiles: fetchFiles }}>
      <div>
        {/* 头部面包屑 - 始终显示 */}
        <HeaderBreadcrumb folderBreadCrumb={folderBreadCrumb} />

        {files.length > 0 ? (
          // 文件列表
          <Outlet context={outletContext} />
        ) : (
          // 空状态
          <div className="flex h-64 items-center justify-center">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无文件" />
          </div>
        )}

        {/* 添加按钮 - 始终显示 */}
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
    </FileContext.Provider>
  );
};
export default AllFiles;
