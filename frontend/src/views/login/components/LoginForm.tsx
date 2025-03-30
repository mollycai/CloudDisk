import { login } from '@/api/modules/login';
import { ReqLoginForm } from '@/api/types';
import { HOME_URL } from '@/config/config';
import { setToken } from '@/redux/modules/globals/action';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = (loginForm: ReqLoginForm) => {
    console.log('Received values:', loginForm);
    setLoading(true);
    // loginForm.password = md5(loginForm.password);
    login(loginForm)
      .then(({ token, msg }) => {
        if (token) {
          setToken(token);
          navigate(HOME_URL);
          message.success('登录成功');
        }
        if (msg) message.info(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('请检查输入是否正确！');
  };

  return (
    <Form
      form={form}
      name="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {/* 用户名输入框 */}
      <Form.Item
        name="username"
        rules={[
          { required: true, message: '请输入用户名！' },
          { min: 4, message: '用户名至少 4 个字符！' },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="用户名" />
      </Form.Item>

      {/* 密码输入框 */}
      <Form.Item
        name="password"
        rules={[
          { required: true, message: '请输入密码！' },
          { min: 6, message: '密码至少 6 个字符！' },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="密码" />
      </Form.Item>

      {/* 记住我选项 */}
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>记住我</Checkbox>
      </Form.Item>

      {/* 登录按钮 */}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
