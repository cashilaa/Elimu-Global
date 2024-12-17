import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  const containerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const dotVariants = {
    animate: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <motion.div
        className="relative w-16 h-16"
        animate="animate"
        variants={containerVariants}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-indigo-600 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 60}deg) translate(20px, 0)`,
              transformOrigin: '0 0'
            }}
            variants={dotVariants}
            animate="animate"
            custom={i}
          />
        ))}
      </motion.div>
    </div>
  );
};
