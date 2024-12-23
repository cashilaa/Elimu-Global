import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Button, Tooltip, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  PlusOutlined, 
  UserAddOutlined, 
  FileAddOutlined,
  SettingOutlined 
} from '@ant-design/icons';
import { AddCourseModal } from './AddCourseModal';
import { AddStudentModal } from './AddStudentModal';

const ActionsWrapper = styled(Card)`
  .actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
  }

  .action-button {
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .anticon {
      font-size: 24px;
    }
  }
`;

export const QuickActions = () => {
  const navigate = useNavigate();
  const [isAddCourseModalVisible, setIsAddCourseModalVisible] = useState(false);
  const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);
  
  const handleNewCourse = () => {
    setIsAddCourseModalVisible(true);
  };

  const handleAddStudent = () => {
    setIsAddStudentModalVisible(true);
  };

  const handleNewReport = () => {
    Modal.confirm({
      title: 'Generate New Report',
      content: 'Choose the type of report you want to generate:',
      okText: 'Generate',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          message.loading('Generating report...', 2);
          // Add your report generation logic here
          setTimeout(() => {
            message.success('Report generated successfully!');
            navigate('/reports');
          }, 2000);
        } catch (error) {
          message.error('Failed to generate report');
        }
      }
    });
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleAddCourseSuccess = () => {
    // Optionally navigate to courses page after success
    navigate('/courses');
  };

  const handleAddStudentSuccess = () => {
    navigate('/students');
  };

  const actions = [
    {
      icon: <PlusOutlined />,
      title: 'New Course',
      onClick: handleNewCourse,
      tooltip: 'Create a new course'
    },
    {
      icon: <UserAddOutlined />,
      title: 'Add Student',
      onClick: handleAddStudent,
      tooltip: 'Register new student'
    },
    {
      icon: <FileAddOutlined />,
      title: 'New Report',
      onClick: handleNewReport,
      tooltip: 'Generate new report'
    },
    {
      icon: <SettingOutlined />,
      title: 'Settings',
      onClick: handleSettings,
      tooltip: 'Configure dashboard'
    }
  ];

  return (
    <>
      <ActionsWrapper title="Quick Actions">
        <div className="actions-grid">
          {actions.map((action, index) => (
            <Tooltip key={index} title={action.tooltip}>
              <Button 
                className="action-button" 
                onClick={action.onClick}
                type="default"
                size="large"
              >
                {action.icon}
                <span>{action.title}</span>
              </Button>
            </Tooltip>
          ))}
        </div>
      </ActionsWrapper>

      <AddCourseModal
        visible={isAddCourseModalVisible}
        onCancel={() => setIsAddCourseModalVisible(false)}
        onSuccess={handleAddCourseSuccess}
      />

      <AddStudentModal
        visible={isAddStudentModalVisible}
        onCancel={() => setIsAddStudentModalVisible(false)}
        onSuccess={handleAddStudentSuccess}
      />
    </>
  );
}; 