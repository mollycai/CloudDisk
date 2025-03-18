import React from 'react';

import { RouteObject } from '@/routers/types';
import lazyLoad from '@/routers/utils/lazyLoad';

// 使用情况页面
const dashboardRouter: Array<RouteObject> = [
  {
    path: '/dashboard',
    element: lazyLoad(React.lazy(() => import('@/views/main/dashboard/index'))),
    meta: {
      title: '使用情况',
      key: 'dashboard',
      rank: 1,
    },
  },
];

export default dashboardRouter;
