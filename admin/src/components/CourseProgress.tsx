import React from 'react';
import styled from 'styled-components';
import { Card, Progress, Tag } from 'antd';
import { fadeIn } from '../utils/animations';

const ProgressWrapper = styled(Card)`
  margin: 24px 0;
  border-radius: 16px;
  animation: ${fadeIn} 0.5s ease-out;

  .course-item {
    padding: 16px 0;
    border-bottom: 1px solid ${props => props.theme.colors.lightBlue};

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    h4 {
      margin: 0 0 8px;
      color: ${props => props.theme.colors.primaryBlue};
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

export const CourseProgress = () => {
  const courses = [
    {
      title: 'React Fundamentals',
      progress: 75,
      students: 234,
      status: 'Active'
    },
    {
      title: 'Python for Beginners',
      progress: 90,
      students: 567,
      status: 'Popular'
    },
    {
      title: 'Web Design Basics',
      progress: 45,
      students: 123,
      status: 'New'
    }
  ];

  return (
    <ProgressWrapper title="Course Progress">
      {courses.map((course, index) => (
        <div key={index} className="course-item">
          <h4>
            {course.title}
            <Tag color={course.status === 'Popular' ? '#4A90E2' : course.status === 'New' ? '#FFD93D' : '#81C784'}>
              {course.status}
            </Tag>
          </h4>
          <Progress percent={course.progress} strokeColor="#4A90E2" />
          <small>{course.students} enrolled students</small>
        </div>
      ))}
    </ProgressWrapper>
  );
}; 