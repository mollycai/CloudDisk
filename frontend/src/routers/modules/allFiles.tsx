import React from 'react';

import { RouteObject } from '@/routers/types';
import lazyLoad from '@/routers/utils/lazyLoad';

// 所有文件页面
const allFileRouter: Array<RouteObject> = [
  {
    path: '/allFiles',
    element: lazyLoad(React.lazy(() => import('@/views/main/allFiles/index'))),
    meta: {
      title: '所有文件',
      key: 'allFiles',
      rank: 3,
    },
  },
];

export default allFileRouter;
