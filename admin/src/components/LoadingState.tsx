import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const StyledLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;
  
  .loading-animation {
    width: 120px;
    height: 120px;
    
    .ant-spin-dot-item {
      background-color: ${props => props.theme.colors.primaryBlue};
    }
  }
  
  .loading-text {
    margin-top: 16px;
    font-family: 'Comic Sans MS', cursive;
    color: ${props => props.theme.colors.primaryBlue};
    font-size: 16px;
  }
`;

export const LoadingState = ({ text = 'Loading...' }) => (
  <StyledLoading>
    <Spin size="large" className="loading-animation" />
    <div className="loading-text">{text}</div>
  </StyledLoading>
); 