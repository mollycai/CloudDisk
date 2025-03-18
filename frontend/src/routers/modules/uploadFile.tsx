import React from 'react';

import { RouteObject } from '@/routers/types';
import lazyLoad from '@/routers/utils/lazyLoad';

// 文件上传页面
const uploadFileRouter: Array<RouteObject> = [
  {
    path: '/uploadFile',
    element: lazyLoad(React.lazy(() => import('@/views/main/uploadFile/index'))),
    meta: {
      title: '文件分类页面',
      key: 'uploadFile',
      rank: 4,
    },
  },
];

export default uploadFileRouter;
