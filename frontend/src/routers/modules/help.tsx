import React from 'react';

import { RouteObject } from '@/routers/types';
import lazyLoad from '@/routers/utils/lazyLoad';

// 帮助页面
const helpRouter: Array<RouteObject> = [
  {
    path: '/help',
    element: lazyLoad(React.lazy(() => import('@/views/main/help/index'))),
    meta: {
      title: '帮助',
      key: 'help',
      rank: 5,
    },
  },
];

export default helpRouter;
