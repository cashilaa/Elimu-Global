import React, { useEffect } from 'react';
import { Card, Form, Input, Button, Switch, Divider, Select, Tabs, Upload, Row, Col, Alert, TimePicker, InputNumber, message } from 'antd';
import { DashboardLayout } from '../components/DashboardLayout';
import styled from 'styled-components';
import { fadeIn } from '../utils/animations';
import { 
  UserOutlined, 
  MailOutlined, 
  GlobalOutlined,
  BellOutlined,
  SecurityScanOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { settingsService } from '../services/settings.service';

const PageWrapper = styled.div`
  padding: 24px;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 16px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;

    h1 {
      font-size: 24px;
      color: ${props => props.theme.colors.primaryBlue};
      margin: 0;

      @media (max-width: 768px) {
        font-size: 20px;
      }
    }

    @media (max-width: 576px) {
      flex-direction: column;
      align-items: stretch;
    }
  }
`;

const StyledCard = styled(Card)`
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 768px) {
    border-radius: 8px;
  }

  .ant-card-body {
    padding: 24px;

    @media (max-width: 768px) {
      padding: 16px;
    }
  }

  .ant-form-item {
    margin-bottom: 24px;

    @media (max-width: 576px) {
      margin-bottom: 16px;
    }
  }
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 24px;

    @media (max-width: 576px) {
      margin-bottom: 16px;
    }
  }

  .ant-tabs-tab {
    padding: 12px 16px;

    @media (max-width: 768px) {
      padding: 8px 12px;
      font-size: 14px;
    }

    @media (max-width: 576px) {
      padding: 6px 10px;
      font-size: 13px;
    }
  }
`;

const Settings = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const settings = await settingsService.getSettings();
      form.setFieldsValue(settings);
    } catch (error) {
      message.error('Failed to fetch settings');
    }
  };

  const handleSave = async (values: any) => {
    try {
      await settingsService.updateSettings(values);
      message.success('Settings saved successfully');
    } catch (error) {
      message.error('Failed to save settings');
    }
  };

  const items = [
    {
      key: 'general',
      label: (
        <span>
          <GlobalOutlined /> General
        </span>
      ),
      children: (
        <StyledCard>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            initialValues={{
              siteName: 'Elimu Learning Platform',
              adminEmail: 'admin@elimu.com',
              timezone: 'UTC+3',
              language: 'en',
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Site Name"
                  name="siteName"
                  rules={[{ required: true }]}
                >
                  <Input prefix={<GlobalOutlined />} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Admin Email"
                  name="adminEmail"
                  rules={[{ required: true, type: 'email' }]}
                >
                  <Input prefix={<MailOutlined />} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Timezone" name="timezone">
                  <Select>
                    <Select.Option value="UTC+3">East Africa Time (UTC+3)</Select.Option>
                    <Select.Option value="UTC+0">UTC</Select.Option>
                    <Select.Option value="UTC-5">Eastern Time (UTC-5)</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Language" name="language">
                  <Select>
                    <Select.Option value="en">English</Select.Option>
                    <Select.Option value="sw">Swahili</Select.Option>
                    <Select.Option value="fr">French</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Logo" name="logo">
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
                fileList={[]}
              >
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload Logo</div>
                </div>
              </Upload>
            </Form.Item>
          </Form>
        </StyledCard>
      )
    },
    {
      key: 'notifications',
      label: (
        <span>
          <BellOutlined /> Notifications
        </span>
      ),
      children: (
        <StyledCard>
          <Form
            layout="vertical"
            initialValues={{
              emailNotifications: true,
              pushNotifications: true,
              digestFrequency: 'daily'
            }}
          >
            <Form.Item
              label="Email Notifications"
              name="emailNotifications"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label="Push Notifications"
              name="pushNotifications"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label="Digest Frequency"
              name="digestFrequency"
            >
              <Select>
                <Select.Option value="daily">Daily</Select.Option>
                <Select.Option value="weekly">Weekly</Select.Option>
                <Select.Option value="monthly">Monthly</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Quiet Hours"
              name="quietHours"
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Form>
        </StyledCard>
      )
    },
    {
      key: 'security',
      label: (
        <span>
          <SecurityScanOutlined /> Security
        </span>
      ),
      children: (
        <StyledCard>
          <Alert
            message="Security Settings"
            description="Configure security settings for your platform"
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />
          <Form layout="vertical">
            <Form.Item
              label="Two-Factor Authentication"
              name="2fa"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label="Session Timeout (minutes)"
              name="sessionTimeout"
            >
              <InputNumber min={5} max={120} />
            </Form.Item>

            <Form.Item
              label="Password Expiry (days)"
              name="passwordExpiry"
            >
              <InputNumber min={30} max={365} />
            </Form.Item>

            <Form.Item
              label="Failed Login Attempts"
              name="maxLoginAttempts"
            >
              <InputNumber min={3} max={10} />
            </Form.Item>
          </Form>
        </StyledCard>
      )
    }
  ];

  return (
    <DashboardLayout>
      <PageWrapper>
        <div className="header">
          <h1>Settings</h1>
          <Button type="primary" onClick={() => form.submit()}>
            Save Changes
          </Button>
        </div>

        <StyledTabs items={items} />
      </PageWrapper>
    </DashboardLayout>
  );
};

export default Settings; 