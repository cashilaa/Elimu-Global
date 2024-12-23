import React from 'react';
import styled from 'styled-components';
import { bounce } from '../utils/animations';

const BannerWrapper = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primaryBlue}, ${props => props.theme.colors.secondaryBlue});
  border-radius: 24px;
  padding: 32px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 16px;
    margin-bottom: 24px;
  }

  @media (max-width: 576px) {
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    flex-direction: column;
    text-align: center;
  }

  .banner-content {
    flex: 1;
    color: white;
    z-index: 1;

    h1 {
      font-family: 'Comic Sans MS', cursive;
      font-size: 32px;
      margin-bottom: 8px;

      @media (max-width: 768px) {
        font-size: 28px;
      }

      @media (max-width: 576px) {
        font-size: 24px;
      }
    }

    p {
      font-size: 16px;
      opacity: 0.9;

      @media (max-width: 576px) {
        font-size: 14px;
      }
    }
  }

  .banner-illustration {
    position: absolute;
    right: 32px;
    bottom: 0;
    width: 180px;
    height: 180px;
    animation: ${bounce} 3s infinite ease-in-out;
    display: flex;
    align-items: flex-end;

    @media (max-width: 768px) {
      width: 140px;
      height: 140px;
      right: 24px;
    }

    @media (max-width: 576px) {
      position: relative;
      right: 0;
      width: 120px;
      height: 120px;
      margin-top: 20px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

export const WelcomeBanner = () => (
  <BannerWrapper>
    <div className="banner-content">
      <h1>Welcome back, Admin! 👋</h1>
      <p>Here's what's happening in your learning platform today.</p>
    </div>
    <div className="banner-illustration">
      <img src="/assets/illustrations/teacher-cartoon.svg" alt="Teacher" />
    </div>
  </BannerWrapper>
); 