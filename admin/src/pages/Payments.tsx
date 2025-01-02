import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, InputNumber, Tag, message, Tooltip } from 'antd';
import { DashboardLayout } from '../components/DashboardLayout';
import { PlusOutlined, DollarOutlined, FileTextOutlined, CheckCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { fadeIn } from '../utils/animations';

const { Option } = Select;
const { TextArea } = Input;

interface Contract {
  id: string;
  instructorId: string;
  instructorName: string;
  contractType: 'Revenue Share' | 'Fixed Rate';
  amount: number;
  status: 'Active' | 'Pending' | 'Completed';
  startDate: string;
  endDate: string;
  terms: string;
  paymentHistory: Payment[];
}

interface Payment {
  id: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Failed';
}

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

  h1 {
    font-size: 24px;
    margin: 0;
    color: ${props => props.theme.colors.primaryBlue};
  }

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .stat-title {
    color: ${props => props.theme.colors.textGray};
    font-size: 14px;
    margin-bottom: 8px;
  }

  .stat-value {
    font-size: 24px;
    font-weight: 600;
    color: ${props => props.theme.colors.primaryBlue};
  }
`;

const Payments = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const sampleContracts: Contract[] = [
    {
      id: '1',
      instructorId: 'INS001',
      instructorName: 'Dr. Sarah Wilson',
      contractType: 'Revenue Share',
      amount: 30, // 30% revenue share
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      terms: 'Revenue share agreement for all courses...',
      paymentHistory: [
        { id: 'P1', amount: 1500, date: '2024-01-31', status: 'Paid' },
        { id: 'P2', amount: 1800, date: '2024-02-29', status: 'Paid' }
      ]
    },
    // Add more sample contracts...
  ];

  const columns = [
    {
      title: 'Instructor',
      dataIndex: 'instructorName',
      key: 'instructorName',
    },
    {
      title: 'Contract Type',
      dataIndex: 'contractType',
      key: 'contractType',
      render: (type: string) => (
        <Tag color={type === 'Revenue Share' ? 'blue' : 'green'}>
          {type}
        </Tag>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number, record: Contract) => (
        <span>
          {record.contractType === 'Revenue Share' ? `${amount}%` : `$${amount}`}
        </span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={
          status === 'Active' ? 'success' :
          status === 'Pending' ? 'warning' : 'default'
        }>
          {status}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Contract) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tooltip title="View Contract">
            <Button 
              icon={<FileTextOutlined />} 
              onClick={() => handleViewContract(record)}
            />
          </Tooltip>
          <Tooltip title="Process Payment">
            <Button 
              icon={<DollarOutlined />} 
              type="primary"
              onClick={() => handleProcessPayment(record)}
            />
          </Tooltip>
        </div>
      )
    }
  ];

  const handleCreateContract = (values: any) => {
    console.log('New contract:', values);
    message.success('Contract created successfully');
    setModalVisible(false);
    form.resetFields();
  };

  const handleViewContract = (contract: Contract) => {
    Modal.info({
      title: `Contract Details - ${contract.instructorName}`,
      width: 600,
      content: (
        <div>
          <p><strong>Contract Type:</strong> {contract.contractType}</p>
          <p><strong>Amount:</strong> {contract.contractType === 'Revenue Share' ? `${contract.amount}%` : `$${contract.amount}`}</p>
          <p><strong>Period:</strong> {contract.startDate} to {contract.endDate}</p>
          <p><strong>Terms:</strong></p>
          <p>{contract.terms}</p>
          <h4>Payment History</h4>
          <Table 
            dataSource={contract.paymentHistory}
            columns={[
              { title: 'Date', dataIndex: 'date' },
              { title: 'Amount', dataIndex: 'amount', render: (amount: number) => `$${amount}` },
              { 
                title: 'Status', 
                dataIndex: 'status',
                render: (status: string) => (
                  <Tag color={status === 'Paid' ? 'success' : 'warning'}>{status}</Tag>
                )
              }
            ]}
            pagination={false}
          />
        </div>
      )
    });
  };

  const handleProcessPayment = (contract: Contract) => {
    // Implement payment processing logic
    message.success(`Processing payment for ${contract.instructorName}`);
  };

  return (
    <DashboardLayout>
      <PageWrapper>
        <HeaderSection>
          <h1>Payments & Contracts</h1>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            New Contract
          </Button>
        </HeaderSection>

        <StatsRow>
          <StatCard>
            <div className="stat-title">Active Contracts</div>
            <div className="stat-value">12</div>
          </StatCard>
          <StatCard>
            <div className="stat-title">Total Paid (This Month)</div>
            <div className="stat-value">$24,500</div>
          </StatCard>
          <StatCard>
            <div className="stat-title">Pending Payments</div>
            <div className="stat-value">$3,200</div>
          </StatCard>
        </StatsRow>

        <Table 
          dataSource={sampleContracts}
          columns={columns}
          rowKey="id"
        />

        <Modal
          title="Create New Contract"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateContract}
          >
            <Form.Item
              name="instructorId"
              label="Select Instructor"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="INS001">Dr. Sarah Wilson</Option>
                <Option value="INS002">Prof. Michael Chen</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="contractType"
              label="Contract Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="Revenue Share">Revenue Share</Option>
                <Option value="Fixed Rate">Fixed Rate</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={value => `${value}${form.getFieldValue('contractType') === 'Revenue Share' ? '%' : '$'}`}
                parser={value => value!.replace(/[%$]/g, '')}
              />
            </Form.Item>

            <Form.Item
              name="terms"
              label="Contract Terms"
              rules={[{ required: true }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Contract
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </PageWrapper>
    </DashboardLayout>
  );
};

export default Payments; 