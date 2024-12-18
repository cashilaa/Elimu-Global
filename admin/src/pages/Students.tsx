import React, { useEffect, useState } from 'react';
import { Table, Card, Button, Modal, Tag, Space, Tooltip, Statistic, Row, Col } from 'antd';
import { EyeOutlined, BarChartOutlined } from '@ant-design/icons';
import { DashboardLayout } from '../components/DashboardLayout';
import { studentsService } from '../services/students.service';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 24px;

  .header {
    margin-bottom: 24px;
  }

  .stats-cards {
    margin-bottom: 24px;
  }
`;

interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number;
  status: string;
  lastActive: string;
  progress: number;
  enrollments?: any[];
}

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    averageProgress: 0
  });

  useEffect(() => {
    fetchStudents();
    fetchStats();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await studentsService.getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await studentsService.getStudentStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const showStudentDetails = async (student: Student) => {
    try {
      const [progress, enrollments] = await Promise.all([
        studentsService.getStudentProgress(student.id),
        studentsService.getStudentEnrollments(student.id)
      ]);
      setSelectedStudent({ ...student, progress, enrollments });
      setIsModalVisible(true);
    } catch (error) {
      console.error('Failed to fetch student details:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Enrolled Courses',
      dataIndex: 'enrolledCourses',
      key: 'enrolledCourses',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => `${progress}%`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Student) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              icon={<EyeOutlined />} 
              onClick={() => showStudentDetails(record)}
              type="text"
            />
          </Tooltip>
          <Tooltip title="View Progress">
            <Button 
              icon={<BarChartOutlined />} 
              onClick={() => showStudentDetails(record)}
              type="text"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <PageWrapper>
        <div className="header">
          <h1>Students</h1>
        </div>

        <Row gutter={16} className="stats-cards">
          <Col span={8}>
            <Card>
              <Statistic
                title="Total Students"
                value={stats.totalStudents}
                precision={0}
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
          <Col span={8}>
            <Card>
              <Statistic
                title="Average Progress"
                value={stats.averageProgress}
                precision={1}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={students}
          loading={loading}
          rowKey="id"
        />

        <Modal
          title="Student Details"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={800}
        >
          {selectedStudent && (
            <div>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card title="Basic Information">
                    <p><strong>Name:</strong> {selectedStudent.name}</p>
                    <p><strong>Email:</strong> {selectedStudent.email}</p>
                    <p><strong>Status:</strong> 
                      <Tag color={selectedStudent.status === 'active' ? 'green' : 'red'}>
                        {selectedStudent.status.toUpperCase()}
                      </Tag>
                    </p>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Course Progress">
                    <p><strong>Enrolled Courses:</strong> {selectedStudent.enrolledCourses}</p>
                    <p><strong>Overall Progress:</strong> {selectedStudent.progress}%</p>
                    <p><strong>Last Active:</strong> {selectedStudent.lastActive}</p>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </Modal>
      </PageWrapper>
    </DashboardLayout>
  );
};

export default Students; 