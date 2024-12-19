import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Testimonial from '../components/ui/Testimonial';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-primary-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary-600">Welcome Back</h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to continue your teaching journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    className="mt-1 block w-full pl-10 pr-4 py-3 
                             bg-white border border-gray-200 rounded-lg 
                             focus:ring-2 focus:ring-primary-500 focus:border-transparent
                             transition-all duration-200
                             hover:border-primary-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="mt-1 block w-full pl-10 pr-12 py-3 
                             bg-white border border-gray-200 rounded-lg 
                             focus:ring-2 focus:ring-primary-500 focus:border-transparent
                             transition-all duration-200
                             hover:border-primary-300"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                         shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                         transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image & Testimonials Section */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-cover bg-center" 
             style={{ backgroundImage: "url('/images/teacher-background.jpg')" }} />
        <Testimonial />
      </div>
    </div>
  );
};

export default Login; 