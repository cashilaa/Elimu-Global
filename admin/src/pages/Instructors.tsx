import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Space, Modal, Input, message } from 'antd';
import { CheckOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { DashboardLayout } from '../components/DashboardLayout';
import { instructorsService } from '../services/instructors.service';
import styled, { keyframes } from 'styled-components';

const { TextArea } = Input;
const { confirm } = Modal;

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

// Styled Components
const PageWrapper = styled.div`
  padding: 24px;
  animation: ${fadeIn} 0.5s ease-out;

  .header {
    margin-bottom: 24px;
    animation: ${slideIn} 0.5s ease-out;
    h1 {
      margin: 0;
      font-size: 24px;
      color: #1890ff;
    }
  }
`;

const StyledCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const StyledTable = styled(Table)`
  .ant-table {
    background: transparent;
  }

  .ant-table-thead > tr > th {
    background: #f8faff;
    padding: 16px;
    font-weight: 600;
    border-bottom: 2px solid #e6f0ff;
    transition: background 0.3s ease;

    &:hover {
      background: #f0f5ff !important;
    }
  }

  .ant-table-tbody > tr > td {
    padding: 16px;
    border-bottom: 1px solid #f0f7ff;
    transition: all 0.3s ease;
  }

  .ant-table-tbody > tr:hover > td {
    background: #f8faff;
  }

  .status-tag {
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: 500;
    text-transform: capitalize;
  }

  .status-pending {
    background: #fff7e6;
    color: #d46b08;
    border-color: #ffd591;
  }

  .status-approved {
    background: #f6ffed;
    color: #389e0d;
    border-color: #b7eb8f;
  }

  .status-rejected {
    background: #fff1f0;
    color: #cf1322;
    border-color: #ffa39e;
  }
`;

const ActionButton = styled(Button)`
  border-radius: 8px;
  padding: 4px 12px;
  height: 32px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .anticon {
    font-size: 14px;
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    overflow: hidden;
  }

  .ant-modal-header {
    background: #f8faff;
    padding: 16px 24px;
    border-bottom: 1px solid #f0f7ff;
  }

  .ant-modal-body {
    padding: 24px;
  }

  textarea.ant-input {
    border-radius: 8px;
    padding: 12px;
    min-height: 120px;
    resize: vertical;
  }
`;

interface Instructor {
  id: string;
  name: string;
  email: string;
  phone: string;
  expertise: string[];
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  documents?: string[];
}

const Instructors = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const data = await instructorsService.getAllInstructors();
      setInstructors(data);
    } catch (error) {
      message.error('Failed to fetch instructors');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (instructor: Instructor) => {
    confirm({
      title: 'Are you sure you want to approve this instructor?',
      icon: <ExclamationCircleOutlined />,
      content: 'This will send an approval email to the instructor.',
      async onOk() {
        try {
          await instructorsService.approveInstructor(instructor.id);
          message.success('Instructor approved successfully');
          fetchInstructors();
        } catch (error) {
          message.error('Failed to approve instructor');
        }
      },
    });
  };

  const showRejectModal = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setRejectModalVisible(true);
  };

  const handleReject = async () => {
    if (!selectedInstructor) return;

    try {
      await instructorsService.rejectInstructor(selectedInstructor.id, rejectionReason);
      message.success('Instructor rejected');
      setRejectModalVisible(false);
      setRejectionReason('');
      fetchInstructors();
    } catch (error) {
      message.error('Failed to reject instructor');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Expertise',
      dataIndex: 'expertise',
      key: 'expertise',
      render: (expertise: string[]) => (
        <Space size={[0, 8]} wrap>
          {expertise.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag className={`status-${status.toLowerCase()}`}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Instructor) => (
        <Space>
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleApprove(record)}
              >
                Approve
              </Button>
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => showRejectModal(record)}
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <PageWrapper>
        <div className="header">
          <h1>Instructor Applications</h1>
        </div>

        <StyledCard>
          <StyledTable
            columns={columns}
            dataSource={instructors}
            loading={loading}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} applications`,
            }}
          />
        </StyledCard>

        <StyledModal
          title="Reject Instructor"
          open={rejectModalVisible}
          onOk={handleReject}
          onCancel={() => {
            setRejectModalVisible(false);
            setRejectionReason('');
          }}
          okButtonProps={{ 
            danger: true,
            icon: <CloseOutlined /> 
          }}
        >
          <p>Please provide a reason for rejection:</p>
          <TextArea
            rows={4}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter rejection reason"
          />
        </StyledModal>
      </PageWrapper>
    </DashboardLayout>
  );
};

export default Instructors; 