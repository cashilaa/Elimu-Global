import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Card } from 'antd';
import { fadeIn, pulse } from '../utils/animations';

// New animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shine = keyframes`
  0% { background-position: -100px; }
  40%, 100% { background-position: 140px; }
`;

const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(74, 144, 226, 0.12);
  border: none;
  transition: all 0.5s ease;
  animation: ${fadeIn} 0.5s ease-out, ${float} 6s ease-in-out infinite;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    border-radius: 12px;
  }

  @media (max-width: 576px) {
    border-radius: 8px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100px;
    width: 100px;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.6),
      transparent
    );
    animation: ${shine} 3s infinite linear;
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
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      width: 56px;
      height: 56px;
      border-radius: 12px;
    }

    @media (max-width: 576px) {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      padding: 10px;
    }
  }

  .stats-value {
    font-size: 28px;
    font-weight: bold;
    color: ${props => props.theme.colors.primaryBlue};
    margin-bottom: 8px;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      font-size: 24px;
    }

    @media (max-width: 576px) {
      font-size: 20px;
    }
  }

  .stats-label {
    font-size: 16px;
    color: ${props => props.theme.colors.textGray};
    font-family: 'Comic Sans MS', cursive;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      font-size: 14px;
    }

    @media (max-width: 576px) {
      font-size: 13px;
    }
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