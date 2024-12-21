import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Globe, Award, Heart, Coffee } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            About Elimu Global
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Empowering learners worldwide through accessible, quality education and innovative learning solutions.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h2>
            <p className="text-gray-600">
              To provide accessible, high-quality education to learners worldwide, breaking down barriers and creating opportunities for personal and professional growth through innovative learning solutions.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Our Vision</h2>
            <p className="text-gray-600">
              To be the leading global platform for accessible education, fostering a world where quality learning knows no boundaries and every individual has the opportunity to reach their full potential.
            </p>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-12 h-12 text-blue-600" />,
                title: "Global Reach",
                description: "Connecting learners and educators across borders"
              },
              {
                icon: <BookOpen className="w-12 h-12 text-blue-600" />,
                title: "Quality Content",
                description: "Expertly crafted courses and learning materials"
              },
              {
                icon: <Users className="w-12 h-12 text-blue-600" />,
                title: "Community Focus",
                description: "Building a supportive learning environment"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Values */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              icon: <Award className="w-8 h-8" />,
              title: "Excellence",
              description: "Striving for the highest quality in education"
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Inclusivity",
              description: "Education accessible to all"
            },
            {
              icon: <Coffee className="w-8 h-8" />,
              title: "Innovation",
              description: "Embracing new ways of learning"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Community",
              description: "Growing together through collaboration"
            }
          ].map((value, index) => (
            <div key={index} className="text-center p-6">
              <div className="flex justify-center mb-4 text-blue-600">{value.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Learning Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your learning journey today and be part of our global community of learners.
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
