import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message, Space, Popconfirm, Tag, Tooltip, Card, Row, Col, Progress } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { DashboardLayout } from '../components/DashboardLayout';
import { coursesService } from '../services/courses.service';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from '../utils/animations';

const { Option } = Select;
const { TextArea } = Input;

// Add type for course
interface Course {
  _id: string;
  name: string;
  instructor: string;
  description: string;
  price: number;
  status: string;
  students?: number;
}

// Add the slideIn animation
const slideIn = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
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
  animation: ${slideIn} 0.5s ease-out;
  gap: 16px;

  h1 {
    margin: 0;
    font-size: 24px;
    color: #1890ff;
    white-space: nowrap;

    @media (max-width: 768px) {
      font-size: 20px;
    }

    @media (max-width: 576px) {
      font-size: 18px;
    }
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

const StyledCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
  overflow-x: auto;

  @media (max-width: 768px) {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

const CourseGrid = styled(Row)`
  margin-top: 24px;

  @media (max-width: 576px) {
    margin-top: 16px;
  }
`;

const CourseCard = styled(Card)`
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    border-radius: 8px;
  }

  .ant-card-cover {
    height: 200px;
    overflow: hidden;

    @media (max-width: 576px) {
      height: 160px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .ant-card-body {
    padding: 20px;

    @media (max-width: 768px) {
      padding: 16px;
    }

    @media (max-width: 576px) {
      padding: 12px;
    }
  }

  .course-title {
    font-size: 18px;
    margin-bottom: 8px;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  .course-instructor {
    color: #666;
    margin-bottom: 16px;
    font-size: 14px;

    @media (max-width: 576px) {
      font-size: 13px;
      margin-bottom: 12px;
    }
  }
`;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await coursesService.getAllCourses();
      setCourses(data);
    } catch (error) {
      message.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEdit = async (values: any) => {
    try {
      if (modalMode === 'add') {
        await coursesService.createCourse(values);
        message.success('Course created successfully');
      } else {
        if (selectedCourse) {
          await coursesService.updateCourse(selectedCourse._id, values);
        }
        message.success('Course updated successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchCourses();
    } catch (error) {
      message.error(`Failed to ${modalMode} course`);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await coursesService.deleteCourse(id);
      message.success('Course deleted successfully');
      fetchCourses();
    } catch (error) {
      message.error('Failed to delete course');
    }
  };

  const showEditModal = (course: any) => {
    setModalMode('edit');
    setSelectedCourse(course);
    form.setFieldsValue(course);
    setIsModalVisible(true);
  };

  const showViewModal = (course: any) => {
    setSelectedCourse(course);
    setIsViewModalVisible(true);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      Active: 'green',
      Draft: 'gold',
      Inactive: 'red'
    };
    return colors[status] || 'default';
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a onClick={() => showViewModal({ name: text })}>{text}</a>,
    },
    {
      title: 'Instructor',
      dataIndex: 'instructor',
      key: 'instructor',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <Button 
              icon={<EyeOutlined />} 
              onClick={() => showViewModal(record)}
              type="text"
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              icon={<EditOutlined />} 
              onClick={() => showEditModal(record)}
              type="text"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this course?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} type="text" danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <PageWrapper>
        <HeaderSection>
          <h1>Courses</h1>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
            Add Course
          </Button>
        </HeaderSection>

        <CourseGrid gutter={[24, 24]}>
          {courses.map(course => (
            <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
              <CourseCard
                hoverable
                cover={<img alt={course.title} src={course.coverImage} />}
                actions={[
                  <EditOutlined key="edit" onClick={() => handleEdit(course)} />,
                  <DeleteOutlined key="delete" onClick={() => handleDelete(course)} />
                ]}
              >
                <h3 className="course-title">{course.title}</h3>
                <p className="course-instructor">{course.instructor}</p>
                <Progress percent={course.progress} status="active" />
              </CourseCard>
            </Col>
          ))}
        </CourseGrid>

        {/* Add/Edit Modal */}
        <Modal
          title={modalMode === 'add' ? "Add New Course" : "Edit Course"}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddEdit}
          >
            <Form.Item
              name="name"
              label="Course Name"
              rules={[{ required: true, message: 'Please enter course name' }]}
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
                min={0}
                prefix="$"
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button onClick={() => setIsModalVisible(false)}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  {modalMode === 'add' ? 'Create Course' : 'Update Course'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>

        {/* View Details Modal */}
        <Modal
          title="Course Details"
          open={isViewModalVisible}
          onCancel={() => setIsViewModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsViewModalVisible(false)}>
              Close
            </Button>
          ]}
        >
          {selectedCourse && (
            <div>
              <p><strong>Name:</strong> {selectedCourse.name}</p>
              <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
              <p><strong>Description:</strong> {selectedCourse.description}</p>
              <p><strong>Price:</strong> ${selectedCourse.price}</p>
              <p><strong>Status:</strong> 
                <Tag color={getStatusColor(selectedCourse.status)} style={{ marginLeft: 8 }}>
                  {selectedCourse.status}
                </Tag>
              </p>
              <p><strong>Students Enrolled:</strong> {selectedCourse.students || 0}</p>
            </div>
          )}
        </Modal>
      </PageWrapper>
    </DashboardLayout>
  );
};

export default Courses; 