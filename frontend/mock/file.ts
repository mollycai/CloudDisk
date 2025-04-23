import { defineFakeRoute } from 'vite-plugin-fake-server/client';

export default defineFakeRoute([
  {
    url: '/file/list',
    method: 'post',
    response: (data: any) => {
      console.log(data.body);
      return new Promise((resolve) => {
        setTimeout(() => {
          // 模拟数据
          if (data.body === 111) {
            resolve({
              code: 200,
              data: [
                {
                  id: 1111,
                  fileName: '子新建文件夹',
                  fileTime: '2023-06-12',
                  size: '2.4 MB',
                  type: 'folder',
                  url: '/files/folder/0',
                },
                {
                  id: 5,
                  fileName: '子文件1.txt',
                  fileTime: '2023-06-13',
                  size: '1.2 MB',
                  type: 'file',
                  url: '/files/5',
                },
                {
                  id: 6,
                  fileName: '子文件2.pdf',
                  fileTime: '2023-06-14',
                  size: '3.5 MB',
                  type: 'file',
                  url: '/files/6',
                },
              ],
            });
          }
          if (data.body === 1111) {
            resolve({
              code: 200,
              data: [
                {
                  id: 11111,
                  fileName: '子子新建文件夹',
                  fileTime: '2023-06-12',
                },
                {
                  id: 7,
                  fileName: '子子文件1.txt',
                  fileTime: '2023-06-13',
                  size: '1.2 MB',
                  type: 'file',
                  url: '/files/7',
                },
                {
                  id: 8,
                  fileName: '子子文件2.pdf',
                  fileTime: '2023-06-14',
                  size: '3.5 MB',
                  type: 'file',
                  url: '/files/8',
                },
              ],
            });
          } else {
            resolve({
              code: 200,
              data: [
                {
                  id: 111,
                  fileName: '新建文件夹',
                  fileTime: '2023-06-12',
                  size: '2.4 MB',
                  type: 'folder',
                  url: '/files/folder/0',
                },
                {
                  id: 112,
                  fileName: '文档.docx',
                  fileTime: '2023-06-15',
                  size: '2.4 MB',
                  type: 'file',
                  url: '/files/1',
                },
                {
                  id: 222,
                  fileName: '数据.xlsx',
                  fileTime: '2023-06-14',
                  size: '2.4 MB',
                  type: 'file',
                  url: '/files/2',
                },
                {
                  id: 323,
                  fileName: '图片.jpg',
                  fileTime: '2023-06-13',
                  size: '2.4 MB',
                  type: 'file',
                  url: '/files/3',
                },
                {
                  id: 413,
                  fileName: '代码.js',
                  fileTime: '2023-06-12',
                  size: '2.4 MB',
                  type: 'file',
                  url: '/files/4',
                },
              ],
            });
          }
        }, 1000);
      });
    },
  },
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
            allFiles.push(
              {
                id: 101,
                fileName: '音乐合集.mp3',
                fileTime: '2023-06-10',
                size: '128 MB',
                type: 'file',
                url: '/files/audio/101',
              },
              {
                id: 102,
                fileName: '录音文件.wav',
                fileTime: '2023-06-11',
                size: '56 MB',
                type: 'file',
                url: '/files/audio/102',
              },
            );
          }

          if (categoryIds.includes('2')) {
            // 视频分类
            allFiles.push(
              {
                id: 201,
                fileName: '宣传视频.mp4',
                fileTime: '2023-06-12',
                size: '2.8 GB',
                type: 'file',
                url: '/files/video/201',
              },
              {
                id: 202,
                fileName: '教程视频.mov',
                fileTime: '2023-06-13',
                size: '1.5 GB',
                type: 'file',
                url: '/files/video/202',
              },
            );
          }

          if (categoryIds.includes('3')) {
            // 文档分类
            allFiles.push(
              {
                id: 301,
                fileName: '项目文档.pdf',
                fileTime: '2023-06-14',
                size: '10 MB',
                type: 'file',
                url: '/files/doc/301',
              },
              {
                id: 302,
                fileName: '合同文件.docx',
                fileTime: '2023-06-15',
                size: '5 MB',
                type: 'file',
                url: '/files/doc/302',
              },
              {
                id: 303,
                fileName: '数据表格.xlsx',
                fileTime: '2023-06-16',
                size: '8 MB',
                type: 'file',
                url: '/files/doc/303',
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
]);
