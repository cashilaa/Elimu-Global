import React from 'react';
import { Card, Row, Col, DatePicker } from 'antd';
import { DollarOutlined, RiseOutlined, TeamOutlined } from '@ant-design/icons';
import { DashboardLayout } from '../components/DashboardLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { fadeIn } from '../utils/animations';

const { RangePicker } = DatePicker;

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
      align-items: flex-start;
    }
  }
`;

const StatsGrid = styled(Row)`
  margin-bottom: 24px;

  @media (max-width: 576px) {
    margin-bottom: 16px;
  }
`;

const StatCard = styled(Card)`
  .ant-card-body {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;

    @media (max-width: 768px) {
      padding: 16px;
    }

    @media (max-width: 576px) {
      padding: 12px;
    }
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

    @media (max-width: 576px) {
      width: 40px;
      height: 40px;
      font-size: 20px;
    }
  }

  .stat-content {
    h3 {
      margin: 0;
      font-size: 14px;
      color: ${props => props.theme.colors.textGray};

      @media (max-width: 576px) {
        font-size: 12px;
      }
    }

    .value {
      font-size: 24px;
      font-weight: bold;
      color: ${props => props.theme.colors.primaryBlue};

      @media (max-width: 576px) {
        font-size: 20px;
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

        <StatsGrid gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8}>
            <StatCard>
              <div className="icon-wrapper">
                <DollarOutlined />
              </div>
              <div className="stat-content">
                <h3>Total Revenue</h3>
                <div className="value">$121,000</div>
              </div>
            </StatCard>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <StatCard>
              <div className="icon-wrapper">
                <RiseOutlined />
              </div>
              <div className="stat-content">
                <h3>Growth</h3>
                <div className="value">+15.3%</div>
              </div>
            </StatCard>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <StatCard>
              <div className="icon-wrapper">
                <TeamOutlined />
              </div>
              <div className="stat-content">
                <h3>New Subscriptions</h3>
                <div className="value">234</div>
              </div>
            </StatCard>
          </Col>
        </StatsGrid>

        <Card>
          <h3>Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={window.innerWidth <= 576 ? 300 : 400}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: window.innerWidth <= 576 ? 12 : 14 }}
              />
              <YAxis 
                tick={{ fontSize: window.innerWidth <= 576 ? 12 : 14 }}
              />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#4A90E2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </PageWrapper>
    </DashboardLayout>
  );
};

export default Revenue; 