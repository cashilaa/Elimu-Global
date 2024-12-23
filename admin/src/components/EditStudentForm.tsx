import React from 'react';
import { Form, Input, DatePicker, Select, Button, Space } from 'antd';
import moment from 'moment';

interface EditStudentFormProps {
  initialValues: any;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

export const EditStudentForm: React.FC<EditStudentFormProps> = ({
  initialValues,
  onSubmit,
  onCancel
}) => {
  const [form] = Form.useForm();

  // Set initial values when component mounts
  React.useEffect(() => {
    const formData = {
      ...initialValues,
      dateOfBirth: initialValues.dateOfBirth ? moment(initialValues.dateOfBirth) : undefined
    };
    form.setFieldsValue(formData);
  }, [initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Format the data before submitting
      const formattedValues = {
        fullName: values.fullName,
        email: values.email,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : undefined,
        status: values.status || 'Active',
        enrolledCourses: initialValues.enrolledCourses
      };
      
      console.log('Submitting form with values:', formattedValues);
      onSubmit(formattedValues);
    } catch (error) {
      console.error('Validation failed:', error);
      message.error('Please check the form fields');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
    >
      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[{ required: true, message: 'Please enter full name' }]}
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
        <DatePicker 
          style={{ width: '100%' }} 
          format="YYYY-MM-DD"
        />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        initialValue="Active"
      >
        <Select>
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Inactive">Inactive</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button onClick={onCancel}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}; 