import React from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';
import { StatsCard } from './StatsCard';

const StyledCarousel = styled(Carousel)`
  .slick-dots li button {
    background: ${props => props.theme.colors.primaryBlue} !important;
  }

  .slick-dots li.slick-active button {
    background: ${props => props.theme.colors.primaryBlue} !important;
  }

  @media (max-width: 768px) {
    .slick-slide {
      padding: 0 10px;
    }
  }
`;

const CarouselWrapper = styled.div`
  margin: 20px 0;
  padding: 20px 0;

  .carousel-container {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

interface StatsData {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconSrc?: string;
}

interface StatsCarouselProps {
  stats: StatsData[];
}

export const StatsCarousel: React.FC<StatsCarouselProps> = ({ stats }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <CarouselWrapper>
      <div className="carousel-container">
        <StyledCarousel {...settings}>
          {stats.map((stat, index) => (
            <div key={index}>
              <StatsCard
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                iconSrc={stat.iconSrc}
              />
            </div>
          ))}
        </StyledCarousel>
      </div>
    </CarouselWrapper>
  );
}; 