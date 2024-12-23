import React, { useState } from 'react';
import { Card, Row, Col, Button, Tag, Progress, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';
import { DashboardLayout } from '../components/DashboardLayout';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from '../utils/animations';

const { TextArea } = Input;
const { Option } = Select;

// Sample course data
const sampleCourses = [
  {
    id: 1,
    title: 'Introduction to React',
    instructor: 'John Doe',
    coverImage: 'https://res.cloudinary.com/dj7nomqfd/image/upload/v1647958227/react_js_lgq1ww.png',
    price: 49.99,
    enrolled: 234,
    progress: 78,
    status: 'Active',
    description: 'Learn the fundamentals of React development...'
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    instructor: 'Jane Smith',
    coverImage: 'https://res.cloudinary.com/dj7nomqfd/image/upload/v1647958227/javascript_fes7aa.png',
    price: 59.99,
    enrolled: 189,
    progress: 65,
    status: 'Active',
    description: 'Master advanced JavaScript concepts...'
  },
  {
    id: 3,
    title: 'UI/UX Design Basics',
    instructor: 'Mike Johnson',
    coverImage: 'https://res.cloudinary.com/dj7nomqfd/image/upload/v1647958227/ux_design_d2duj1.png',
    price: 39.99,
    enrolled: 156,
    progress: 92,
    status: 'Active',
    description: 'Learn the fundamentals of UI/UX design...'
  },
  {
    id: 4,
    title: 'Python for Beginners',
    instructor: 'Sarah Wilson',
    coverImage: 'https://res.cloudinary.com/dj7nomqfd/image/upload/v1647958227/python_zfqx2v.png',
    price: 44.99,
    enrolled: 312,
    status: 'Draft',
    progress: 45,
    description: 'Start your journey with Python programming...'
  }
];

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

const CourseCard = styled(Card)`
  height: 100%;
  transition: all 0.3s ease;
  animation: ${slideUp} 0.5s ease-out;
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }

  .ant-card-cover {
    height: 200px;
    overflow: hidden;
    background: #f5f5f5;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    &:hover img {
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      height: 180px;
    }

    @media (max-width: 576px) {
      height: 160px;
    }
  }

  .ant-card-body {
    padding: 20px;

    @media (max-width: 768px) {
      padding: 16px;
    }
  }

  .course-title {
    font-size: 18px;
    margin-bottom: 8px;
    color: ${props => props.theme.colors.primaryBlue};

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  .course-stats {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
    color: ${props => props.theme.colors.textGray};

    .stat-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`;

const StyledTag = styled(Tag)`
  border-radius: 4px;
  padding: 2px 8px;
  margin: 4px;
`;

const Courses = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddCourse = (values: any) => {
    console.log('New course:', values);
    message.success('Course added successfully');
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <DashboardLayout>
      <PageWrapper>
        <HeaderSection>
          <h1>Courses</h1>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Add Course
          </Button>
        </HeaderSection>

        <Row gutter={[24, 24]}>
          {sampleCourses.map((course, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={course.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CourseCard
                hoverable
                cover={
                  <img 
                    alt={course.title} 
                    src={course.coverImage}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/assets/illustrations/course-placeholder.svg';
                    }}
                  />
                }
                actions={[
                  <EditOutlined key="edit" />,
                  <DeleteOutlined key="delete" />
                ]}
              >
                <h3 className="course-title">{course.title}</h3>
                <div className="course-stats">
                  <span className="stat-item">
                    <UserOutlined /> {course.enrolled}
                  </span>
                  <span className="stat-item">
                    <BookOutlined /> {course.status}
                  </span>
                </div>
                <p>${course.price}</p>
                <StyledTag color={course.status === 'Active' ? 'success' : 'warning'}>
                  {course.status}
                </StyledTag>
                <Progress percent={course.progress} status="active" />
              </CourseCard>
            </Col>
          ))}
        </Row>

        <Modal
          title="Add New Course"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddCourse}
          >
            <Form.Item
              name="title"
              label="Course Title"
              rules={[{ required: true, message: 'Please enter course title' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="instructor"
              label="Instructor"
              rules={[{ required: true, message: 'Please enter instructor name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter course description' }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please enter course price' }]}
            >
              <InputNumber
                prefix="$"
                min={0}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              initialValue="Draft"
            >
              <Select>
                <Option value="Active">Active</Option>
                <Option value="Draft">Draft</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Course
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </PageWrapper>
    </DashboardLayout>
  );
};

export default Courses; 