import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Space, Modal, Input, message } from 'antd';
import { CheckOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { DashboardLayout } from '../components/DashboardLayout';
import { instructorsService } from '../services/instructors.service';
import styled from 'styled-components';

const { TextArea } = Input;
const { confirm } = Modal;

const PageWrapper = styled.div`
  padding: 24px;

  .header {
    margin-bottom: 24px;
    h1 {
      margin: 0;
    }
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

        <Table
          columns={columns}
          dataSource={instructors}
          loading={loading}
          rowKey="id"
        />

        <Modal
          title="Reject Instructor"
          open={rejectModalVisible}
          onOk={handleReject}
          onCancel={() => {
            setRejectModalVisible(false);
            setRejectionReason('');
          }}
        >
          <p>Please provide a reason for rejection:</p>
          <TextArea
            rows={4}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter rejection reason"
          />
        </Modal>
      </PageWrapper>
    </DashboardLayout>
  );
};

export default Instructors; 