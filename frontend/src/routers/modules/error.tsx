import React from 'react';

import { RouteObject } from '@/routers/types';
import lazyLoad from '@/routers/utils/lazyLoad';

// 错误页面模块
const errorRouter: Array<RouteObject> = [
  {
    path: '/403',
    element: lazyLoad(React.lazy(() => import('@/views/main/error/403'))),
    meta: {
      title: '403',
      key: '500',
    },
  },
  {
    path: '/404',
    element: lazyLoad(React.lazy(() => import('@/views/main/error/404'))),
    meta: {
      title: '404',
      key: '500',
    },
  },
  {
    path: '/500',
    element: lazyLoad(React.lazy(() => import('@/views/main/error/500'))),
    meta: {
      title: '500',
      key: '500',
    },
  },
];

export default errorRouter;
