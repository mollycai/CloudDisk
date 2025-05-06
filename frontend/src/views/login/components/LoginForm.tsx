import { login } from '@/api/modules/login';
import { HOME_URL } from '@/config/config';
import { setToken } from '@/redux/modules/globals/action';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ReqLoginForm {
  username: string;
	password: string;
	remember?: boolean;
}

const LoginForm = () => {
	const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = (loginForm: ReqLoginForm) => {
    setLoading(true);
    login(loginForm)
			.then((data) => {
        if (data.data.code === 200) {
          setToken(data.data.data);
          navigate(HOME_URL);
          message.success("登录成功");
        }
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
			initialValues={{
				username: 'Jane Doe',
				password: '123456789',
				remember: true,
			}}
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
