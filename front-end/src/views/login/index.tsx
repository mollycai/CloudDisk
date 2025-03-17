import { useState } from 'react';
import loginImg from '@/assets/login_image.png';
import './index.less';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // 默认显示登录表单

  // 切换表单
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <img src={loginImg} alt="login" />
        </div>
        <div className="login-right">
          {/* 登录表单 */}
          <div className={`login-form ${isLogin ? 'active' : 'inactive'}`}>
            <div className="logo">
              <span className="logo-text">Login</span>
            </div>
            <LoginForm />
            <div className="goto-register">
              没有账号？
              <a className="link" onClick={toggleForm}>
                去注册
              </a>
            </div>
          </div>

          {/* 注册表单 */}
          <div className={`register-form ${!isLogin ? 'active' : 'inactive'}`}>
            <div className="logo">
              <span className="register-text">Register</span>
            </div>
            <RegisterForm />
            <div className="goto-login">
              已有账号？
              <a className="link" onClick={toggleForm}>
                去登录
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
