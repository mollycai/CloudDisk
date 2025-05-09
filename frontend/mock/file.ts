import { defineFakeRoute } from 'vite-plugin-fake-server/client';

export default defineFakeRoute([
  {
    url: '/file/category',
    method: 'post',
    response: (data: any) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const categoryIds = data.body; // 接收分类ID数组
          // 合并所有选中分类的文件数据
          const allFiles = [];

          if (categoryIds.includes('1')) {
            // 音频分类
            allFiles.push({
              id: '14e2200b06bd464d273cddc7201d5903',
              fileName: 'test3.wav',
              fileTime: '2025-05-10 00:14:58',
              size: '126.5 KB',
              type: 'file',
              url: '新建文件夹/新建文件夹2/test3.wav',
            });
          }

          if (categoryIds.includes('2')) {
            // 视频分类
            allFiles.push({
              id: 'eed9a1f31853c93515f843f4a6a65c29-2',
              fileName: '序列 01.mp4',
              fileTime: '2025-05-10 00:22:45',
              size: '23.3 MB',
              type: 'file',
              url: '新建文件夹/序列 01.mp4',
            });
          }

          if (categoryIds.includes('3')) {
            // 文档分类
            allFiles.push(
              {
                id: 'e509c30130768907453a8b62572ebf80-2',
                fileName: 'HowToCook.pdf',
                fileTime: '2025-05-09 22:24:08',
                size: '26.2 MB',
                type: 'file',
                url: 'HowToCook.pdf',
              },
              {
                id: '0fe45850cc6199ddb2bfc71c0c13c1cc',
                fileName: 'ProjectFinalPresentationAndFinalReport.docx',
                fileTime: '2025-05-09 22:28:49',
                size: '24.9 KB',
                type: 'file',
                url: 'ProjectFinalPresentationAndFinalReport.docx',
              },
              {
                id: 'c0b7c647554bae48cf366919b3007529',
                fileName: 'log 700s.txt',
                fileTime: '2025-05-10 00:51:45',
                size: '30.2 KB',
                type: 'file',
                url: 'log 700s.txt',
              },
              {
                id: '82ff430179e5ce51aad7e16379bdc29d',
                fileName: '新建 Microsoft Excel 工作表.xlsx',
                fileTime: '2025-05-09 22:28:05',
                size: '18.4 KB',
                type: 'file',
                url: '新建 Microsoft Excel 工作表.xlsx',
              },
            );
          }

          if (categoryIds.includes('4')) {
            // 图片分类
            allFiles.push(
              {
                id: '46b106d950faa986e8ba4af512cf7756',
                fileName: 'background.jpg',
                fileTime: '2025-05-10 00:10:36',
                size: '17.9 KB',
                type: 'file',
                url: '新建文件夹/background.jpg',
              },
              {
                id: '3f26a8647f01baa74c1b54336d3421f3',
                fileName: 'wallhaven-r2yw17.png',
                fileTime: '2025-05-10 00:11:28',
                size: '9.5 MB',
                type: 'file',
                url: '新建文件夹/wallhaven-r2yw17.png',
              },
            );
          }

          resolve({
            code: 200,
            data: allFiles,
          });
        }, 500);
      });
    },
  },
  {
    url: '/file/recycleBin',
    method: 'post',
    response: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: 200,
            data: [
              {
                id: '0fe45850cc6199ddb2bfc71c0c13c1cc',
                fileName: 'ProjectFinalPresentationAndFinalReport.docx',
                fileTime: '2025-05-09 22:28:49',
                size: '24.9 KB',
                type: 'file',
                url: 'ProjectFinalPresentationAndFinalReport.docx',
              },
              {
                id: '82ff430179e5ce51aad7e16379bdc29d',
                fileName: '新建 Microsoft Excel 工作表.xlsx',
                fileTime: '2025-05-09 22:28:05',
                size: '18.4 KB',
                type: 'file',
                url: '新建 Microsoft Excel 工作表.xlsx',
              },
            ],
          });
        }, 500);
      });
    },
  },
]);
