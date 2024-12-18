import React from 'react';
import { Card, Row, Col, DatePicker } from 'antd';
import { DollarOutlined, RiseOutlined, TeamOutlined } from '@ant-design/icons';
import { DashboardLayout } from '../components/DashboardLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { fadeIn } from '../utils/animations';

const { RangePicker } = DatePicker;

const PageWrapper = styled.div`
  animation: ${fadeIn} 0.5s ease-out;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    h1 {
      font-family: 'Comic Sans MS', cursive;
      color: ${props => props.theme.colors.primaryBlue};
      margin: 0;
    }
  }

  .stat-card {
    .ant-card-body {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .icon-wrapper {
      width: 48px;
      height: 48px;
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      background: ${props => props.theme.colors.lightBlue};
      color: ${props => props.theme.colors.primaryBlue};
    }

    .stat-content {
      h3 {
        margin: 0;
        color: ${props => props.theme.colors.textGray};
      }
      
      .value {
        font-size: 24px;
        font-weight: bold;
        color: ${props => props.theme.colors.primaryBlue};
      }
    }
  }
`;

const Revenue = () => {
  const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 19000 },
    { month: 'Mar', revenue: 15000 },
    { month: 'Apr', revenue: 22000 },
    { month: 'May', revenue: 28000 },
    { month: 'Jun', revenue: 25000 },
  ];

  return (
    <DashboardLayout>
      <PageWrapper>
        <div className="header">
          <h1>Revenue</h1>
          <RangePicker />
        </div>

        <Row gutter={[24, 24]}>
          <Col span={8}>
            <Card className="stat-card">
              <div className="icon-wrapper">
                <DollarOutlined />
              </div>
              <div className="stat-content">
                <h3>Total Revenue</h3>
                <div className="value">$121,000</div>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="stat-card">
              <div className="icon-wrapper">
                <RiseOutlined />
              </div>
              <div className="stat-content">
                <h3>Growth</h3>
                <div className="value">+15.3%</div>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="stat-card">
              <div className="icon-wrapper">
                <TeamOutlined />
              </div>
              <div className="stat-content">
                <h3>New Subscriptions</h3>
                <div className="value">234</div>
              </div>
            </Card>
          </Col>
        </Row>

        <Card style={{ marginTop: 24 }}>
          <h3>Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#4A90E2" 
                strokeWidth={2}
                dot={{ fill: '#4A90E2' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </PageWrapper>
    </DashboardLayout>
  );
};

export default Revenue; 