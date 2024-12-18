import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message, Space, Popconfirm, Tag, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { DashboardLayout } from '../components/DashboardLayout';
import { coursesService } from '../services/courses.service';

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
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0 }}>Courses</h1>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => {
              setModalMode('add');
              form.resetFields();
              setIsModalVisible(true);
            }}
          >
            Add Course
          </Button>
        </div>

        <Table 
          columns={columns} 
          dataSource={courses}
          loading={loading}
          rowKey="_id"
        />

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
      </div>
    </DashboardLayout>
  );
};

export default Courses; 