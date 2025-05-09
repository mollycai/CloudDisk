import { store } from '@/redux/index';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation();
  
  // 判断是否有Token
  const token = localStorage.getItem('token') || store.getState().global.token;
  // 如果是登录页且没有token，直接放行
  if (pathname === '/login' && !token) return props.children;
  // 非登录页且没有token，重定向到登录页
  if (!token) return <Navigate to="/login" replace />;

  // 当前账号有权限返回 Router，正常访问页面
  return props.children;
};

export default AuthRouter;
