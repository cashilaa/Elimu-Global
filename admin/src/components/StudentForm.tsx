import React from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import styled from 'styled-components';

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
`;

export const StudentForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      // Add your API call here to create student
      console.log('Student values:', values);
      message.success('Student registered successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to register student');
    }
  };

  return (
    <FormWrapper>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true },
            { type: 'email' }
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
          label="Enrolled Courses"
        >
          <Select
            mode="multiple"
            placeholder="Select courses"
            // Add options based on your courses data
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register Student
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
}; 