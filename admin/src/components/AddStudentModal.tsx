import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, message } from 'antd';
import { studentsService } from '../services/students.service';
import { coursesService } from '../services/courses.service';
import { useStudents } from '../contexts/StudentContext';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

interface AddStudentModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
}

interface Course {
  _id: string;
  name: string;
  instructor: string;
  status: string;
}

interface CourseOption {
  value: string;
  label: string;
  description?: string;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  visible,
  onCancel,
  onSuccess
}) => {
  const [form] = Form.useForm();
  const { refreshStudents } = useStudents();
  const [courseOptions, setCourseOptions] = useState<CourseOption[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Try health check first
        await coursesService.checkHealth().catch(error => {
          console.error('API health check failed:', error);
        });
        
        const response = await coursesService.getAllCourses();
        console.log('Courses response:', response);
        
        const publishedCourses = response.filter((course: Course) => 
          course.status === 'Published' || course.status === 'Draft'
        );
        
        const options = publishedCourses.map((course: Course) => ({
          value: course.id.toString(),
          label: course.name,
          description: `Instructor: ${course.instructor}`
        }));
        
        setCourseOptions(options);
      } catch (error: any) {
        console.error('Error fetching courses:', error);
        message.error('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (visible) {
      fetchCourses();
    }
  }, [visible]);

  // Custom option render to show more course details
  const customOptionRender = (option: any) => (
    <div>
      <div>{option.label}</div>
      <small style={{ color: '#666' }}>{option.data?.description}</small>
    </div>
  );

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Format the data according to API requirements
      const studentData = {
        fullName: values.name,
        email: values.email,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : undefined,
        enrolledCourses: Number(values.courses[0]),
        status: 'Active'
      };
      
      console.log('Submitting student data:', studentData);
      
      await studentsService.createStudent(studentData);
      message.success('Student registered successfully!');
      form.resetFields();
      refreshStudents();
      onSuccess?.();
      onCancel();
      navigate('/students');
    } catch (error: any) {
      console.error('Form submission error:', error);
      message.error(error.response?.data?.message || 'Failed to register student');
    }
  };

  return (
    <Modal
      title="Add New Student"
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Register Student"
      confirmLoading={loading}
      width={600} // Made modal wider for better display
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter student name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          label="Date of Birth"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="courses"
          label="Enrolled Course"
          rules={[{ required: true, message: 'Please select a course' }]}
        >
          <Select
            placeholder="Select a course"
            options={courseOptions}
            style={{ width: '100%' }}
            loading={loading}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) ||
              (option?.description ?? '').toLowerCase().includes(input.toLowerCase())
            }
            optionRender={customOptionRender}
            showSearch
            notFoundContent={loading ? 'Loading courses...' : 'No courses found'}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}; 