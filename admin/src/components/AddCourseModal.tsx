import React from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { coursesService } from '../services/courses.service';
import { useCourses } from '../contexts/CourseContext';

interface AddCourseModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
}

export const AddCourseModal: React.FC<AddCourseModalProps> = ({
  visible,
  onCancel,
  onSuccess
}) => {
  const [form] = Form.useForm();
  const { refreshCourses } = useCourses();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const courseData = {
        name: values.name,
        instructor: values.instructor,
        description: values.description,
        price: values.price.toString(),
        status: values.status
      };
      
      await coursesService.createCourse(courseData);
      message.success('Course created successfully!');
      form.resetFields();
      refreshCourses();
      onSuccess?.();
      onCancel();
    } catch (error) {
      console.error('Form submission error:', error);
      message.error('Failed to create course');
    }
  };

  return (
    <Modal
      title="Add New Course"
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Create Course"
    >
      <Form
        form={form}
        layout="vertical"
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
          rules={[{ required: true, message: 'Please select instructor' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true }]}
        >
          <Input 
            prefix="$" 
            type="number" 
            min={0}
            step="0.01"
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          initialValue="Draft"
        >
          <Select>
            <Select.Option value="Draft">Draft</Select.Option>
            <Select.Option value="Published">Published</Select.Option>
            <Select.Option value="Archived">Archived</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}; 