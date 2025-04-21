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
					} if (data.body === 1111) { 
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
                }
							] 
						})
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
        }, 1500);
      });
    },
  },
]);
