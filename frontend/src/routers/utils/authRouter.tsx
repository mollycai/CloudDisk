import { store } from '@/redux/index';
import { Navigate } from 'react-router-dom';

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
  // @TODO 在跳转路由之前，清除所有的请求
  // axiosCanceler.removeAllPending();

  // 判断是否有Token
  const token = store.getState().global.token;
  if (!token) return <Navigate to="/login" replace />;

  // 当前账号有权限返回 Router，正常访问页面
  return props.children;
};

export default AuthRouter;
