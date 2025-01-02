import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Avatar, Tag, Modal, Form, Input, Upload, message, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, StarFilled } from '@ant-design/icons';
import { DashboardLayout } from '../components/DashboardLayout';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from '../utils/animations';

interface Instructor {
  id: number;
  avatar: string;
  name: string;
  specialization: string;
  rating: number;
  coursesCount: number;
  studentsCount: number;
  status: string;
  bio: string;
}

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageWrapper = styled.div`
  padding: 24px;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;

  h1 {
    font-size: 24px;
    margin: 0;
    color: ${props => props.theme.colors.primaryBlue};

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InstructorCard = styled(Card)`
  height: 100%;
  transition: all 0.3s ease;
  animation: ${slideUp} 0.5s ease-out;
  animation-fill-mode: both;
  border-radius: 12px;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }

  .ant-card-body {
    padding: 24px;

    @media (max-width: 768px) {
      padding: 16px;
    }
  }

  .instructor-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;

    .instructor-info {
      flex: 1;

      h3 {
        margin: 0 0 4px;
        font-size: 18px;
        color: ${props => props.theme.colors.primaryBlue};
      }

      p {
        margin: 0;
        color: ${props => props.theme.colors.textGray};
      }
    }
  }

  .stats-row {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
    flex-wrap: wrap;
    gap: 8px;

    .stat-item {
      text-align: center;
      flex: 1;
      min-width: 80px;

      .value {
        font-size: 20px;
        font-weight: bold;
        color: ${props => props.theme.colors.primaryBlue};
      }

      .label {
        font-size: 12px;
        color: ${props => props.theme.colors.textGray};
      }
    }
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #faad14;
  }
`;

const StyledTag = styled(Tag)`
  border-radius: 4px;
  padding: 2px 8px;
`;

const Instructors = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchInstructors = async () => {
      const abortController = new AbortController();
      setLoading(true);
      
      try {
        const JWT_TOKEN = 'jdfisdsododksnscuisdjmdoadkoajdwdiudhaiodmokqodqdjdwudh';
        const response = await fetch('https://1b8c-102-212-236-207.ngrok-free.app/api/instructors/logged-in-count', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JWT_TOKEN}`
          },
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setInstructors(data);
      } catch (error: any) {
        console.error('Error fetching instructors:', error);
        message.error('Failed to load instructors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const handleAddInstructor = async (values: any) => {
    try {
      const JWT_TOKEN = 'jdfisdsododksnscuisdjmdoadkoajdwdiudhaiodmokqodqdjdwudh';
      const response = await fetch('https://1b8c-102-212-236-207.ngrok-free.app/api/instructors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JWT_TOKEN}`
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error('Failed to add instructor');
      }

      message.success('Instructor added successfully');
      setModalVisible(false);
      form.resetFields();
      // Refresh the instructors list
      window.location.reload();
    } catch (error) {
      console.error('Error adding instructor:', error);
      message.error('Failed to add instructor');
    }
  };

  return (
    <DashboardLayout>
      <PageWrapper>
        <HeaderSection>
          <h1>Instructors</h1>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Add Instructor
          </Button>
        </HeaderSection>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {instructors.map((instructor, index) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={instructor.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <InstructorCard
                  actions={[
                    <EditOutlined key="edit" />,
                    <DeleteOutlined key="delete" />
                  ]}
                >
                  <div className="instructor-header">
                    <Avatar size={64} src={instructor.avatar} />
                    <div className="instructor-info">
                      <h3>{instructor.name}</h3>
                      <p>{instructor.specialization}</p>
                    </div>
                  </div>
                  <div className="rating">
                    <StarFilled /> {instructor.rating}
                  </div>
                  <div className="stats-row">
                    <div className="stat-item">
                      <div className="value">{instructor.coursesCount}</div>
                      <div className="label">Courses</div>
                    </div>
                    <div className="stat-item">
                      <div className="value">{instructor.studentsCount}</div>
                      <div className="label">Students</div>
                    </div>
                  </div>
                  <StyledTag color={instructor.status === 'Active' ? 'success' : 'warning'}>
                    {instructor.status}
                  </StyledTag>
                  <p style={{ marginTop: 16, fontSize: 14 }}>{instructor.bio}</p>
                </InstructorCard>
              </Col>
            ))}
          </Row>
        )}

        <Modal
          title="Add New Instructor"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddInstructor}
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter instructor name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="specialization"
              label="Specialization"
              rules={[{ required: true, message: 'Please enter specialization' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="bio"
              label="Bio"
              rules={[{ required: true, message: 'Please enter bio' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="avatar"
              label="Profile Picture"
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
              >
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Add Instructor
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </PageWrapper>
    </DashboardLayout>
  );
};

export default Instructors;
