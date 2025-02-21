import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled, { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { fadeIn } from '../utils/animations';
import axios from 'axios';

const theme = {
  colors: {
    primaryBlue: '#1890ff',
    secondaryBlue: '#e6f7ff',
  },
};

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

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        'https://centralize-auth-elimu.onrender.com/auth/login/admin',
        values,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API Response:', response.data); // Log the response

      const { access_token } = response.data;
      if (access_token) {
        localStorage.setItem('token', access_token);
        message.success('Login successful!');
        navigate('/dashboard');
      } else {
        console.error('Token is undefined');
        message.error('Failed to retrieve token');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('Logout successful!');
    navigate('/login');
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Button type="default" onClick={handleLogout} className="login-button">
            Log Out
          </Button>
        </Card>
      </LoginWrapper>
    </ThemeProvider>
  );
};

export default Login;
