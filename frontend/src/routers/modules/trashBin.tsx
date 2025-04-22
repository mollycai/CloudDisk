import React from 'react';

import { RouteObject } from '@/routers/types';
import lazyLoad from '@/routers/utils/lazyLoad';

// 首页
const homeRouter: Array<RouteObject> = [
  {
    path: '/trashBin',
    element: lazyLoad(React.lazy(() => import('@/views/main/trashBin/index'))),
    meta: {
      title: '回收站',
      key: 'trashBin',
      rank: 5,
    },
  },
];

export default homeRouter;