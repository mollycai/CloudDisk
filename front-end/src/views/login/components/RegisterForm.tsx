import { LockOutlined, MailOutlined, PhoneOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [captchaLoading, setCaptchaLoading] = useState(false);

  // 模拟发送验证码
  const sendCaptcha = () => {
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaLoading(false);
      message.success('验证码已发送！');
    }, 2000);
  };

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    message.success('注册成功！');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('请检查输入是否正确！');
  };

  return (
    <Form
      form={form}
      name="register-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {/* 用户名 */}
      <Form.Item
        name="username"
        rules={[
          { required: true, message: '请输入用户名！' },
          { min: 4, message: '用户名至少 4 个字符！' },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="用户名" />
      </Form.Item>

      {/* 密码 */}
      <Form.Item
        name="password"
        rules={[
          { required: true, message: '请输入密码！' },
          { min: 6, message: '密码至少 6 个字符！' },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="密码" />
      </Form.Item>

      {/* 确认密码 */}
      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: '请确认密码！' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不一致！'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
      </Form.Item>

      {/* 邮箱 */}
      <Form.Item
        name="email"
        rules={[
          { required: true, message: '请输入邮箱！' },
          { type: 'email', message: '请输入有效的邮箱地址！' },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="邮箱" />
      </Form.Item>

      {/* 手机号 */}
      <Form.Item
        name="phone"
        rules={[
          { required: true, message: '请输入手机号！' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号！' },
        ]}
      >
        <Input prefix={<PhoneOutlined />} placeholder="手机号" />
      </Form.Item>

      {/* 验证码 */}
      <Form.Item name="captcha" rules={[{ required: true, message: '请输入验证码！' }]}>
        <Input
          prefix={<SafetyOutlined />}
          placeholder="验证码"
          addonAfter={
            <Button type="link" onClick={sendCaptcha} loading={captchaLoading}>
              获取验证码
            </Button>
          }
        />
      </Form.Item>

      {/* 注册按钮 */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
