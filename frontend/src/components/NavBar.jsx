import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Home, BookOpen, Layout, Users, LogIn, Phone } from "lucide-react";
import PropTypes from 'prop-types';

const NavBar = ({ className }) => {
  NavBar.propTypes = {
    className: PropTypes.string,
  };
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path, e) => {
    e.preventDefault();
    if (isNavigating) return;
    
    setIsNavigating(true);
    navigate(path);
    
    // Reset after navigation
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
  };

  const navItems = [
    { name: 'Home', icon: <Home size={18} />, path: '/' },
    {
      name: 'Category',
      icon: <Layout size={18} />,
      path: '/category',
      dropdownItems: [
        { name: 'Grade 1-6', path: '/category/grade-1-6' },
        { name: 'JSSC', path: '/category/jssc' },
        { name: 'SSC', path: '/category/ssc' },
        { name: 'Higher Learning', path: '/category/higher-learning' },
      ]
    },
    { 
      name: 'Courses', 
      icon: <BookOpen size={18} />,
      path: '/student/courses',
      dropdownItems: [
        { name: 'Popular Courses', path: '/courses/popular' },
        { name: 'New Releases', path: '/courses/new' },
        { name: 'Free Courses', path: '/courses/free' },
        { name: 'Premium Courses', path: '/courses/premium' },
      ]
    },
    { name: 'About Us', icon: <Users size={18} />, path: '/aboutus' },
    { name: 'Contact Us', icon: <Phone size={18} />, path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 mb-5 transition-all duration-300 mb-6 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/90'} ${className}`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/">
              <img src="/logo1.jpeg" alt="Global Elimu" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 mx-auto">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={(e) => handleNavigation(item.path, e)}
                  className="flex items-center space-x-1 px-4 py-2 rounded-full hover:bg-gray-100 cursor-pointer disabled:opacity-50"
                  disabled={isNavigating}
                >
                  <span className="text-gray-700">{item.icon}</span>
                  <span className="text-gray-700 font-medium">{item.name}</span>
                  {item.dropdownItems && (
                    <ChevronDown 
                      size={16} 
                      className={`ml-1 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {item.dropdownItems && (
                  <div
                    className={`absolute top-full left-0 w-48 py-2 bg-white rounded-xl shadow-lg transform transition-all duration-300 ${activeDropdown === item.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.dropdownItems.map((dropdownItem, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => handleNavigation(dropdownItem.path, e)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                        disabled={isNavigating}
                      >
                        {dropdownItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Login Button - Desktop View */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={(e) => handleNavigation('/login', e)}
              className="flex items-center space-x-2 px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 font-medium disabled:opacity-50"
              disabled={isNavigating}
            >
              <LogIn size={18} />
              <span>Log In</span>
            </button>
            <button
              onClick={(e) => handleNavigation('/signup', e)}
              className="flex items-center space-x-2 px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 font-medium disabled:opacity-50"
              disabled={isNavigating}
            >
              <span>Sign Up</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full overflow-y-auto px-4 py-6">
          {navItems.map((item, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={(e) => handleNavigation(item.path, e)}
                className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                disabled={isNavigating}
              >
                <span className="text-gray-600">{item.icon}</span>
                <span className="text-lg font-medium">{item.name}</span>
              </button>
              
              {item.dropdownItems && (
                <div className="ml-8 mt-2 space-y-2">
                  {item.dropdownItems.map((dropdownItem, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => handleNavigation(dropdownItem.path, e)}
                      className="block p-2 text-gray-600 hover:text-blue-600 disabled:opacity-50"
                      disabled={isNavigating}
                    >
                      {dropdownItem.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Mobile Login Button */}
          <div className="mt-6">
            <button
              onClick={(e) => handleNavigation('/login', e)}
              className="flex items-center justify-center space-x-2 w-full px-6 py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50"
              disabled={isNavigating}
            >
              <LogIn size={18} />
              <span>Log In</span>
            </button>
            <button
              onClick={(e) => handleNavigation('/signup', e)}
              className="flex items-center justify-center space-x-2 w-full px-6 py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50"
              disabled={isNavigating}
            >
              <LogIn size={18} />
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;