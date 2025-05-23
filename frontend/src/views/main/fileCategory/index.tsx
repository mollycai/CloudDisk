import { getFilesByCategory } from '@/api/modules/fileCategory';
import { useEffect, useState } from 'react';
import CategoryController from './components/categoryController';
import FileCategoryList from './components/fileCategoryList';
import { FileContext } from '@/context/fileContext';
import { TagItem } from './types';

// @TODO 从后端获取数据
const tagsData: TagItem[] = [
  { id: '1', name: '音频' },
  { id: '2', name: '视频' },
	{ id: '3', name: '文件' },
	{ id: '4', name: '图片' }
];

const FileCategory = () => {
  // 分类标签选择
  const [selectedTags, setSelectedTags] = useState<string[]>(['1']);
  // 分类文件列表
  const [fileList, setFileList] = useState<any[]>([]);

  // 分类标签选择事件
  const handleChange = (tagId: string, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tagId] : selectedTags.filter((id) => id !== tagId);
    setSelectedTags(nextSelectedTags);
  };
  // 根据分类标签获取文件列表
  const fetchFiles = async () => {
    try {
      const res = await getFilesByCategory(selectedTags);
      setFileList(res.data.data);
    } catch (error) {
      console.error('获取文件列表失败:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [selectedTags]);

  return (
    <FileContext.Provider value={{ refreshFiles: fetchFiles }}>
      <CategoryController tagsList={tagsData} selectedTags={selectedTags} handleChange={handleChange} />
      <FileCategoryList files={fileList} />
    </FileContext.Provider>
  );
};

export default FileCategory;
