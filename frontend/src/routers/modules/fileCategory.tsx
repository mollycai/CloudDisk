import React from 'react';

import { RouteObject } from '@/routers/types';
import lazyLoad from '@/routers/utils/lazyLoad';

// 文件分类页面
const fileCategoryRouter: Array<RouteObject> = [
  {
    path: '/fileCategory',
    element: lazyLoad(React.lazy(() => import('@/views/main/fileCategory/index'))),
    meta: {
      title: '文件分类',
      key: 'fileCategory',
      rank: 5,
    },
  },
];

export default fileCategoryRouter;
