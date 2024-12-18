import React from 'react';
import styled from 'styled-components';

const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  
  .empty-illustration {
    width: 200px;
    height: 200px;
    margin-bottom: 24px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  
  .empty-message {
    font-family: 'Comic Sans MS', cursive;
    color: ${props => props.theme.colors.textGray};
    font-size: 18px;
    text-align: center;
  }
`;

export const EmptyState = ({ message }) => (
  <StyledEmpty>
    <div className="empty-illustration">
      <img src="/assets/empty-state-cartoon.svg" alt="No data" />
    </div>
    <p className="empty-message">{message}</p>
  </StyledEmpty>
); 