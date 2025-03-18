import React from 'react';

import { RouteObject } from '@/routers/types';
import lazyLoad from '@/routers/utils/lazyLoad';

// 首页
const homeRouter: Array<RouteObject> = [
  {
    path: '/home',
    element: lazyLoad(React.lazy(() => import('@/views/main/home/index'))),
    meta: {
      title: '首页',
      key: 'home',
      rank: 0,
    },
  },
];

export default homeRouter;
