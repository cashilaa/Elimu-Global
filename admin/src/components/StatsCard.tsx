import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import { fadeIn, pulse } from '../utils/animations';

const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(74, 144, 226, 0.12);
  border: none;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(74, 144, 226, 0.2);
    
    .stats-icon {
      animation: ${pulse} 1s infinite;
    }
  }

  .stats-icon {
    width: 64px;
    height: 64px;
    background: ${props => props.theme.colors.lightBlue};
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    padding: 12px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .stats-value {
    font-size: 28px;
    font-weight: bold;
    color: ${props => props.theme.colors.primaryBlue};
    margin-bottom: 8px;
  }

  .stats-label {
    font-size: 16px;
    color: ${props => props.theme.colors.textGray};
    font-family: 'Comic Sans MS', cursive;
  }
`;

interface StatsCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconSrc?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ icon, value, label, iconSrc }) => (
  <StyledCard>
    <div className="stats-icon">
      {iconSrc ? <img src={iconSrc} alt={label} /> : icon}
    </div>
    <div className="stats-value">{value}</div>
    <div className="stats-label">{label}</div>
  </StyledCard>
); 