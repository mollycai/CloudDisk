import React from 'react';

import { RouteObject } from '@/routers/types';
import lazyLoad from '@/routers/utils/lazyLoad';

// 主页
const homeRouter: Array<RouteObject> = [
  {
    path: '/home',
    element: lazyLoad(React.lazy(() => import('@/views/main/home/index'))),
    meta: {
      title: '文件分类页面',
      key: 'home',
      rank: 0,
    },
  },
];

export default homeRouter;
