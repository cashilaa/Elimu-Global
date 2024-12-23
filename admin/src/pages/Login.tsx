import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { fadeIn } from '../utils/animations';
import { authService } from '../services/auth.service';

const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.primaryBlue}, ${props => props.theme.colors.secondaryBlue});
  padding: 24px;

  .login-card {
    width: 100%;
    max-width: 420px;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    animation: ${fadeIn} 0.5s ease-out;

    .ant-card-head-title {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
    }

    .login-form {
      .ant-form-item {
        margin-bottom: 24px;
      }

      .login-button {
        width: 100%;
        height: 40px;
        font-size: 16px;
      }
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    try {
      await authService.login(values);
      message.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Invalid credentials');
    }
  };

  return (
    <LoginWrapper>
      <Card title="Admin Login" className="login-card">
        <Form
          name="login"
          onFinish={handleLogin}
          className="login-form"
          initialValues={{ email: 'admin@elimu.com' }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </LoginWrapper>
  );
};

export default Login; 