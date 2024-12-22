import React from 'react';
import Slider from 'react-slick';

const testimonials = [
  {
    quote: "EduTech has transformed my learning experience!",
    author: "John Doe",
  },
  {
    quote: "The interactive features are amazing and engaging.",
    author: "Jane Smith",
  },
  {
    quote: "I love the flexibility of studying at my own pace.",
    author: "Alice Johnson",
  },
];

const TestimonialsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="py-20">
      <h2 className="text-4xl font-bold text-center mb-8">What Our Students Say</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="text-center">
            <p className="text-xl italic">"{testimonial.quote}"</p>
            <p className="text-lg font-semibold mt-4">- {testimonial.author}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialsCarousel;
