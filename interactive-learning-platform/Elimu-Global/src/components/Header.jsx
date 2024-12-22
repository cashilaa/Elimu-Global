import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HomeIcon, UsersIcon, BookOpenIcon, ChartBarIcon, Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.header
      className="fixed w-full z-50 bg-blue-700 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-white flex items-center">
           <BookOpenIcon className="w-6 h-6 mr-2" /> Elimu Global
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="text-white md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`fixed top-0 left-0 h-full w-64 bg-blue-800 text-white transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:static md:transform-none md:h-auto md:w-auto md:bg-transparent`}
        >
          <ul className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 p-6 md:p-0">
            {/* Menu Items */}
            <li>
              <Link
                to="/"
                className="flex items-center text-white hover:text-blue-300 transition-colors"
              >
                <HomeIcon className="w-5 h-5 mr-2" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/parents"
                className="flex items-center text-white hover:text-blue-300 transition-colors"
              >
                <UsersIcon className="w-5 h-5 mr-2" />
                Parents
              </Link>
            </li>
            <li>
              <Link
                to="/progress"
                className="flex items-center text-white hover:text-blue-300 transition-colors"
              >
                <ChartBarIcon className="w-5 h-5 mr-2" />
                My Progress
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="flex items-center text-white hover:text-blue-300 transition-colors"
              >
                <BookOpenIcon className="w-5 h-5 mr-2" />
                Courses
              </Link>
            </li>

            {/* Dropdown for Login */}
            <li className="relative group">
              <button
                className="flex items-center text-white hover:text-blue-300 transition-colors focus:outline-none"
                aria-haspopup="true"
              >
                Login
              </button>
              <div
                className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
              >
                <Link
                  to="https://elimu-student-frontend.onrender.com/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                >
                  Student Login
                </Link>
                <Link
                  to="https://elimu-instructor-fr.onrender.com/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                >
                  Instructor Login
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
