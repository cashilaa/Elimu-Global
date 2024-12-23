import React from 'react';
import { Form, Input, Button, Select, InputNumber, message } from 'antd';
import styled from 'styled-components';

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
`;

export const CourseForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      // Add your API call here to create course
      console.log('Course values:', values);
      message.success('Course created successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to create course');
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
          name="title"
          label="Course Title"
          rules={[{ required: true, message: 'Please enter course title' }]}
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
          <InputNumber
            prefix="$"
            min={0}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Course
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
}; 