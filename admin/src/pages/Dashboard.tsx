import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { DashboardLayout } from '../components/DashboardLayout';
import { coursesService } from '../services/courses.service';
import { revenueService } from '../services/revenue.service';
import { StatsCarousel } from '../components/StatsCarousel';
import { UserOutlined, BookOutlined, TeamOutlined, DollarOutlined } from '@ant-design/icons';
import { DashboardHeader } from '../components/DashboardHeader';
import { InteractiveChart } from '../components/InteractiveChart';
import { QuickActions } from '../components/QuickActions';
import moment from 'moment';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 24px;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const DashboardGrid = styled(Row)`
  margin-top: 24px;

  @media (max-width: 576px) {
    margin-top: 16px;
  }
`;

const StatsSection = styled(Row)`
  margin-bottom: 24px;

  @media (max-width: 576px) {
    margin-bottom: 16px;
  }
`;

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalRevenue: 0,
    activeStudents: 0
  });

  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);
  const [viewType, setViewType] = useState('week');

  const [chartData, setChartData] = useState<Array<{
    date: string;
    students: number;
    revenue: number;
    courses: number;
  }>>([
    {
      date: '2024-01',
      students: 800,
      revenue: 12000,
      courses: 45
    },
    {
      date: '2024-02',
      students: 1000,
      revenue: 15000,
      courses: 50
    },
    {
      date: '2024-03',
      students: 1234,
      revenue: 18000,
      courses: 56
    },
    {
      date: '2024-04',
      students: 1500,
      revenue: 22000,
      courses: 60
    }
  ]);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const [courseStats, revenueStats] = await Promise.all([
          coursesService.getCourseStats(),
          revenueService.getRevenueStats()
        ]);

        if (mounted) {
          setStats({
            totalCourses: courseStats.totalCourses,
            totalRevenue: revenueStats.totalRevenue,
            activeStudents: courseStats.totalStudents
          });

          // You can add API call for chart data here
          // For now using static data
          // const chartDataResponse = await analyticsService.getChartData();
          // setChartData(chartDataResponse);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [dateRange, viewType]);

  const statsData = [
    {
      icon: <UserOutlined />,
      value: "1,234",
      label: "Total Students"
    },
    {
      icon: <BookOutlined />,
      value: "56",
      label: "Active Courses"
    },
    {
      icon: <TeamOutlined />,
      value: "89",
      label: "Instructors"
    },
    {
      icon: <DollarOutlined />,
      value: "$12.3K",
      label: "Revenue"
    }
  ];

  const handleRefresh = async () => {
    try {
      const [courseStats, revenueStats] = await Promise.all([
        coursesService.getCourseStats(),
        revenueService.getRevenueStats()
      ]);

      setStats({
        totalCourses: courseStats.totalCourses,
        totalRevenue: revenueStats.totalRevenue,
        activeStudents: courseStats.totalStudents
      });

      // Add chart data refresh logic here
      // const chartDataResponse = await analyticsService.getChartData();
      // setChartData(chartDataResponse);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  return (
    <DashboardLayout>
      <PageWrapper>
        <DashboardHeader 
          onDateRangeChange={setDateRange}
          onViewChange={setViewType}
          onRefresh={handleRefresh}
        />
        
        <StatsSection gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <StatsCard {...statsData[0]} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard {...statsData[1]} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard {...statsData[2]} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <StatsCard {...statsData[3]} />
          </Col>
        </StatsSection>

        <DashboardGrid gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <InteractiveChart data={chartData} />
          </Col>
          <Col xs={24} lg={8}>
            <QuickActions />
          </Col>
        </DashboardGrid>
      </PageWrapper>
    </DashboardLayout>
  );
};

export default Dashboard; 