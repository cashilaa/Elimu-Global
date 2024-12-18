import React from 'react';
import styled from 'styled-components';
import { Card, Badge, Avatar } from 'antd';
import { BellOutlined, UserOutlined, BookOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { fadeIn } from '../utils/animations';

const NotificationWrapper = styled(Card)`
  margin: 24px 0;
  border-radius: 16px;
  animation: ${fadeIn} 0.5s ease-out;

  .notification-item {
    padding: 12px 0;
    border-bottom: 1px solid ${props => props.theme.colors.lightBlue};
    display: flex;
    align-items: center;
    gap: 12px;

    &:last-child {
      border-bottom: none;
    }

    .notification-icon {
      background: ${props => props.theme.colors.lightBlue};
      padding: 8px;
      border-radius: 8px;
    }

    .notification-content {
      flex: 1;

      h4 {
        margin: 0;
        color: ${props => props.theme.colors.primaryBlue};
      }

      p {
        margin: 4px 0 0;
        font-size: 12px;
        color: ${props => props.theme.colors.textGray};
      }
    }
  }
`;

export const NotificationCenter = () => {
  const notifications = [
    {
      icon: <UserOutlined />,
      title: 'New Instructor Registration',
      message: 'John Doe has requested instructor verification',
      time: '5 minutes ago'
    },
    {
      icon: <BookOutlined />,
      title: 'Course Submitted',
      message: 'New course "React Basics" needs review',
      time: '1 hour ago'
    },
    {
      icon: <CheckCircleOutlined />,
      title: 'System Update',
      message: 'Platform maintenance scheduled for tonight',
      time: '2 hours ago'
    }
  ];

  return (
    <NotificationWrapper
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BellOutlined />
          <span>Notifications</span>
          <Badge count={notifications.length} style={{ backgroundColor: '#4A90E2' }} />
        </div>
      }
    >
      {notifications.map((notification, index) => (
        <div key={index} className="notification-item">
          <div className="notification-icon">
            {notification.icon}
          </div>
          <div className="notification-content">
            <h4>{notification.title}</h4>
            <p>{notification.message}</p>
            <small>{notification.time}</small>
          </div>
        </div>
      ))}
    </NotificationWrapper>
  );
}; 