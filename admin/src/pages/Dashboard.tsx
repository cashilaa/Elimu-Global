import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { DashboardLayout } from '../components/DashboardLayout';
import { coursesService } from '../services/courses.service';
import { revenueService } from '../services/revenue.service';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalRevenue: 0,
    activeStudents: 0
  });

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
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
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Courses"
              value={stats.totalCourses}
              precision={0}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={stats.totalRevenue}
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Active Students"
              value={stats.activeStudents}
              precision={0}
            />
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default Dashboard; 