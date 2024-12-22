import React from 'react';

const ParallaxSection = ({ bgImage, height, children }) => {
  return (
    <div
      className="parallax-section"
      style={{
        backgroundImage: `url(${bgImage})`,
        height: height,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;
