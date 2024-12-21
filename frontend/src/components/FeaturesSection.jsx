import React from 'react';
import PropTypes from 'prop-types';
import { ChevronRight } from 'lucide-react';

const FeatureCard = ({ title, description, illustration, onClick, className }) => (
  <div className={`flex flex-col items-center p-6 text-center space-y-4 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}>
    <div className="w-32 h-32 mb-4">
      <img 
        src={illustration} 
        alt={title} 
        className="w-full h-full object-contain"
      />
    </div>
    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      {description}
    </p>
    <button 
      onClick={onClick}
      className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300"
    >
      <span>Learn More</span>
      <ChevronRight className="w-4 h-4 ml-1" />
    </button>
  </div>
);

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  illustration: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

const FeaturesSection = () => {
  // List of feature data
  const features = [
    {
      title: "Find an Instructor",
      description: "World-class education for everyone. Our platform offers unmatched expert instructors from beginner to advanced level courses.",
      illustration: "../african-girl-teacher-teaching-lesson_61103-872.jpg",
      onClick: () => { /* Navigate to 'Find Instructor' page */ },
    },
    {
      title: "Find a Course",
      description: "Explore a variety of courses tailored to your learning goals. Whether you're starting out or looking to specialize, we have the right course for you.",
      illustration: "../city-map-with-label-home-pin_1284-42340.avif",
      onClick: () => { /* Navigate to 'Find Course' page */ },
    },
    {
      title: "Enroll in a Course",
      description: "Join thousands of learners and start your educational journey with us. Enroll in courses that fit your schedule and learning style.",
      illustration: "../enroll.jpg",
      onClick: () => { /* Navigate to 'Enroll' page */ },
    },
    {
      title: "Interactive Webinars",
      description: "Participate in live sessions with industry leaders and peers. Gain insights and interact in real-time to boost your skills.",
      illustration: "../webinar.jpg",
      onClick: () => { /* Navigate to 'Webinars' page */ },
    },
    {
      title: "AI-Powered Assessments",
      description: "Get personalized feedback and progress tracking powered by cutting-edge AI technologies.",
      illustration: "../ai-assesment.jpeg",
      onClick: () => { /* Navigate to 'Assessments' page */ },
    },
    {
      title: "Join Study Groups",
      description: "Collaborate with peers worldwide in study groups. Share knowledge and learn together for a richer experience.",
      illustration: "../study goup.jpeg",
      onClick: () => { /* Navigate to 'Study Groups' page */ },
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              illustration={feature.illustration}
              onClick={feature.onClick}
              className="transform hover:-translate-y-2 hover:scale-105 transition-transform duration-300 opacity-90 hover:opacity-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
