import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PlusOutlined, CheckOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons';

const QuickActionsWrapper = styled.div`
  margin: 24px 0;

  h2 {
    font-family: 'Comic Sans MS', cursive;
    color: ${props => props.theme.colors.textGray};
    margin-bottom: 16px;
  }

  .actions-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .action-item {
    padding: 24px;
    border: 2px dashed ${props => props.theme.colors.lightBlue};
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;

    &:hover {
      border-color: ${props => props.theme.colors.primaryBlue};
      transform: translateY(-2px);
    }

    &.active {
      background: ${props => props.theme.colors.lightBlue};
      border-style: solid;
    }

    .icon {
      font-size: 24px;
      color: ${props => props.theme.colors.primaryBlue};
      margin-bottom: 8px;
    }

    .label {
      color: ${props => props.theme.colors.textGray};
      font-size: 14px;
    }
  }
`;

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: <PlusOutlined />,
      label: 'Add Course',
      onClick: () => navigate('/courses', { state: { openAddModal: true } })
    },
    {
      icon: <CheckOutlined />,
      label: 'Review Content',
      onClick: () => navigate('/courses', { state: { tab: 'review' } })
    },
    {
      icon: <BellOutlined />,
      label: 'Announcements',
      onClick: () => navigate('/announcements')
    },
    {
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/settings')
    }
  ];

  return (
    <QuickActionsWrapper>
      <h2>Quick Actions</h2>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <div
            key={index}
            className="action-item"
            onClick={action.onClick}
          >
            <div className="icon">{action.icon}</div>
            <div className="label">{action.label}</div>
          </div>
        ))}
      </div>
    </QuickActionsWrapper>
  );
}; 