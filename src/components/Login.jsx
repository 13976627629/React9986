import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';

const { Title } = Typography;

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (values) => {
    // values 参数将会包含表单字段的值
    onLogin(values); // 调用登录函数并传递凭据
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
      <Card style={{ 
        maxWidth: '400px',
        width: '100%',
        padding: '40px',
        borderRadius: '10px',
        marginBottom: '200px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>登录</Title>
        <Form
          name="login"
          onFinish={handleSubmit} // 使用 onFinish 处理提交
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input 
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="请输入用户名"
            />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password 
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
