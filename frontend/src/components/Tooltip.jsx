// src/Components/Tooltip.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Tooltip.css';

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-700 text-white text-sm rounded shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {text}
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default Tooltip;