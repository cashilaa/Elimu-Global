import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Tag, Modal, message, Row, Col } from 'antd';
import { DashboardLayout } from '../components/DashboardLayout';
import { studentsService } from '../services/students.service';
import { ExclamationCircleOutlined, EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import { EditStudentForm } from '../components/EditStudentForm';
import styled, { keyframes } from 'styled-components';

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

const PageWrapper = styled.div`
  padding: 24px;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 16px;
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
    white-space: nowrap;

    @media (max-width: 768px) {
      padding: 12px;
      font-size: 14px;
    }

    @media (max-width: 576px) {
      padding: 8px;
      font-size: 13px;
    }
  }

  .ant-table-tbody > tr > td {
    padding: 16px;
    border-bottom: 1px solid #f0f7ff;
    transition: all 0.3s ease;
    white-space: nowrap;

    @media (max-width: 768px) {
      padding: 12px;
      font-size: 14px;
    }

    @media (max-width: 576px) {
      padding: 8px;
      font-size: 13px;
    }
  }

  .ant-table-pagination {
    margin: 16px !important;
    
    @media (max-width: 768px) {
      margin: 12px !important;
      flex-wrap: wrap;
      row-gap: 8px;
    }

    @media (max-width: 576px) {
      margin: 8px !important;
      
      .ant-pagination-options {
        display: none;
      }
    }
  }
`;

const ActionButton = styled(Button)`
  border-radius: 8px;
  padding: 4px 12px;
  height: 32px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 14px;
  }

  @media (max-width: 576px) {
    width: 100%;
    height: 36px;
  }

  .anticon {
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

const StyledModal = styled(Modal)`
  @media (max-width: 768px) {
    max-width: calc(100vw - 32px) !important;
    margin: 0 16px !important;
  }

  .ant-modal-content {
    border-radius: 16px;
    overflow: hidden;

    @media (max-width: 576px) {
      border-radius: 8px;
    }
  }

  .ant-modal-header {
    padding: 16px 24px;
    
    @media (max-width: 576px) {
      padding: 12px 16px;
    }
  }

  .ant-modal-body {
    padding: 24px;
    
    @media (max-width: 576px) {
      padding: 16px;
    }
  }

  .ant-modal-footer {
    padding: 16px 24px;
    
    @media (max-width: 576px) {
      padding: 12px 16px;
    }
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

interface Student {
  _id: string;
  fullName: string;
  email: string;
  dateOfBirth?: string;
  enrolledCourses?: number;
  status?: string;
}

const { confirm } = Modal;

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentsService.getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
      message.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setEditModalVisible(true);
  };

  const handleDelete = (student: Student) => {
    confirm({
      title: 'Are you sure you want to delete this student?',
      icon: <ExclamationCircleOutlined />,
      content: `This will permanently delete ${student.fullName}'s record.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await studentsService.deleteStudent(student._id);
          message.success('Student deleted successfully');
          fetchStudents();
        } catch (error) {
          console.error('Error deleting student:', error);
          message.error('Failed to delete student');
        }
      },
    });
  };

  const handleEditSubmit = async (values: any) => {
    try {
      if (!selectedStudent) return;
      
      // Format the data according to API requirements
      const updatedData = {
        fullName: values.fullName,
        email: values.email,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth : undefined,
        status: values.status || 'Active',
        enrolledCourses: typeof selectedStudent.enrolledCourses === 'string' 
          ? parseInt(selectedStudent.enrolledCourses) 
          : selectedStudent.enrolledCourses
      };

      console.log('Selected student:', selectedStudent);
      console.log('Updating student with data:', updatedData);
      
      await studentsService.updateStudent(selectedStudent._id, updatedData);
      message.success('Student updated successfully');
      setEditModalVisible(false);
      setSelectedStudent(null);
      fetchStudents();
    } catch (error: any) {
      console.error('Error updating student:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update student';
      message.error(errorMessage);
    }
  };

  const getColumns = () => {
    const baseColumns = [
      {
        title: 'Name',
        dataIndex: 'fullName',
        key: 'fullName',
        fixed: 'left' as const,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        responsive: ['md'],
      },
      {
        title: 'Date of Birth',
        dataIndex: 'dateOfBirth',
        key: 'dateOfBirth',
        responsive: ['lg'],
      },
      {
        title: 'Enrolled Courses',
        dataIndex: 'enrolledCourses',
        key: 'enrolledCourses',
        responsive: ['md'],
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => (
          <Tag color={status === 'Active' ? 'success' : 'error'}>
            {status}
          </Tag>
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        fixed: 'right' as const,
        render: (_: any, record: Student) => (
          <Space wrap>
            <ActionButton
              type="link"
              onClick={() => handleEdit(record)}
              icon={<EditOutlined />}
            >
              {window.innerWidth > 576 ? 'Edit' : ''}
            </ActionButton>
            <ActionButton
              type="link"
              danger
              onClick={() => handleDelete(record)}
              icon={<DeleteOutlined />}
            >
              {window.innerWidth > 576 ? 'Delete' : ''}
            </ActionButton>
          </Space>
        ),
      },
    ];

    return baseColumns;
  };

  return (
    <DashboardLayout>
      <PageWrapper>
        <HeaderSection>
          <h1>Student Management</h1>
          <ActionButton
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => setEditModalVisible(true)}
          >
            Add Student
          </ActionButton>
        </HeaderSection>

        <StyledCard>
          <StyledTable
            columns={getColumns()}
            dataSource={students}
            rowKey="_id"
            loading={loading}
            scroll={{ x: 'max-content' }}
            pagination={{
              total: students.length,
              pageSize: 10,
              showTotal: (total) => `Total ${total} students`,
              showSizeChanger: true,
              showQuickJumper: true,
              responsive: true,
              size: window.innerWidth <= 576 ? 'small' : 'default',
            }}
          />
        </StyledCard>

        <StyledModal
          title={selectedStudent ? 'Edit Student' : 'Add Student'}
          open={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          footer={null}
          width={window.innerWidth <= 576 ? '90%' : 520}
        >
          {selectedStudent && (
            <EditStudentForm
              initialValues={selectedStudent}
              onSubmit={handleEditSubmit}
              onCancel={() => setEditModalVisible(false)}
            />
          )}
        </StyledModal>
      </PageWrapper>
    </DashboardLayout>
  );
};

export default Students; 