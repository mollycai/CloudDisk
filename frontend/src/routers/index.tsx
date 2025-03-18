import { Navigate, useRoutes } from 'react-router-dom';

import { RouteObject } from './types';

import AppLayout from '@/layouts';
import Login from '@/views/login';

// 导入所有router
const metaRouters: Record<string, any> = import.meta.glob('./modules/*.tsx', { eager: true });

// 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach((item) => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key]);
  });
});

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录页',
      key: 'login',
    },
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [...routerArray],
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
