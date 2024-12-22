import React from 'react'
import { ParallaxSection, AnimatedSection } from '../components/ParallaxAndAnimations'

const ReadmePage = () => {
  return (
    <ParallaxSection bgImage="/images/readme-bg.jpg" height="auto">
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h1 className="text-4xl font-bold text-center mb-8 text-white">README</h1>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto prose prose-invert">
            <AnimatedSection>
              <h2>EduTech - Online Learning Platform</h2>
              <p>
                EduTech is a cutting-edge online learning platform built with React and Vite. It aims to provide an engaging and interactive educational experience for students worldwide.
              </p>
            </AnimatedSection>
            <AnimatedSection>
              <h3>Features</h3>
              <ul>
                <li>Responsive design for all devices</li>
                <li>Interactive UI with smooth animations and parallax scrolling</li>
                <li>Integration with separate student and instructor platforms</li>
                <li>AI-powered personalized learning</li>
                <li>Course management system</li>
                <li>User authentication and authorization</li>
              </ul>
            </AnimatedSection>
            <AnimatedSection>
              <h3>Getting Started</h3>
              <p>To run this project locally:</p>
              <ol>
                <li>Clone the repository</li>
                <li>Install dependencies with <code>npm install</code></li>
                <li>Start the development server with <code>npm run dev</code></li>
              </ol>
            </AnimatedSection>
            <AnimatedSection>
              <h3>Technologies Used</h3>
              <ul>
                <li>React</li>
                <li>Vite</li>
                <li>React Router</li>
                <li>Framer Motion</li>
                <li>Tailwind CSS</li>
              </ul>
            </AnimatedSection>
            <AnimatedSection>
              <h3>External Platforms</h3>
              <p>
                This project integrates with separate student and instructor platforms. The main website serves as a landing page and information hub, while the actual learning and teaching experiences are handled by dedicated platforms:
              </p>
              <ul>
                <li>Student Platform: <a href="https://student.com" className="text-blue-300 hover:underline">https://student.com</a></li>
                <li>Instructor Platform: <a href="https://instructor.com" className="text-blue-300 hover:underline">https://instructor.com</a></li>
              </ul>
            </AnimatedSection>
            <AnimatedSection>
              <h3>Contributing</h3>
              <p>
                We welcome contributions to EduTech! Please read our contributing guidelines before submitting a pull request.
              </p>
            </AnimatedSection>
            <AnimatedSection>
              <h3>License</h3>
              <p>
                This project is licensed under the MIT License. See the LICENSE file for details.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </ParallaxSection>
  )
}

export default ReadmePage

