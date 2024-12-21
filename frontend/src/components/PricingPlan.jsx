import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from 'prop-types';
import { CheckCircle, Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const PricingPlan = ({ 
  title = "Choose Your Plan", 
  subtitle = "Find the perfect plan for your needs",
  plans = [
    {
      title: "PARENT/STUDENT",
      price: 0,
      frequency: "account",
      features: [
        "Estore Access",
        "Digital Content Player",
        "Digital Wallet",
        "School Fees Payments/Financing",
      ],
      icon: "🧑‍🎓",
      gradient: "from-blue-100 to-blue-200",
      color: "blue"
    },
    {
      title: "TEACHER",
      price: 0,
      frequency: "user",
      features: [
        "E-store Access",
        "Digital Content Player",
        "Digital Wallet",
        "Salary Advance Loans",
        "AI-powered Lesson Planner",
      ],
      icon: "👩‍🏫",
      gradient: "from-green-100 to-green-200",
      color: "green"
    },
    {
      title: "SCHOOL",
      price: 150,
      frequency: "student",
      features: [
        "E-store Access",
        "Digital Wallet",
        "Invoicing & Payment Reconciliation",
        "Working Capital Financing",
        "School Bus Financing",
      ],
      icon: "🏫",
      best: true,
      gradient: "from-yellow-100 to-yellow-200",
      color: "yellow"
    },
    {
      title: "SCHOOL PLUS",
      price: 500,
      frequency: "student",
      features: [
        "E-store Access",
        "Digital Wallet",
        "Invoicing & Payment Reconciliation",
        "Working Capital Financing",
        "Attendance",
        "Bus Tracker",
        "Communication Suite",
        "School Bus Financing",
        "AI-powered Gradebook",
      ],
      icon: "✨",
      gradient: "from-purple-100 to-purple-200",
      color: "purple"
    },
  ]
}) => {
  const navigate = useNavigate();

  const [isYearly, setIsYearly] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  // Calculate discounted price
  const calculatePrice = (price) => {
    return isYearly ? Math.round(price * 12 * 0.75) : price;
  };

  // Filter plans if a filter is active
  const filteredPlans = activeFilter 
    ? plans.filter(plan => plan.title.toLowerCase().includes(activeFilter.toLowerCase()))
    : plans;

  // Handle navigation to the payment page
  const handleNavigateToPayment = (plan) => {
    navigate("/payment", { state: { plan } }); // Pass the selected plan to the payment page
  };

  return (
    <section className="py-16 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-8">{subtitle}</p>
        
        {/* Filtering and Toggle Section */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
          {/* Search/Filter Input */}
          <input 
            type="text" 
            placeholder="Filter plans..." 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={activeFilter || ''}
            onChange={(e) => setActiveFilter(e.target.value)}
          />

          {/* Toggle for Termly/Yearly */}
          <div className="inline-flex items-center">
            <button
              className={`px-6 py-2 rounded-l-full ${
                !isYearly ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setIsYearly(false)}
            >
              Termly
            </button>
            <button
              className={`px-6 py-2 rounded-r-full ${
                isYearly ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setIsYearly(true)}
            >
              Yearly <span className="ml-2 text-yellow-500 font-semibold">Save 25%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-offwhite">
          <AnimatePresence>
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={index}
                className={`relative p-6 rounded-lg shadow-lg transform
                  bg-offwhite
                  ${plan.best ? "border-2  scale-105" : ""}
                  hover:bg-${plan.color}-100 hover:shadow-2xl transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Best Plan Ribbon */}
                {plan.best && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-white text-sm px-2 py-1 rounded-bl-lg flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Best
                  </div>
                )}
                
                {/* Plan Icon */}
                <div className="text-4xl mb-4">{plan.icon}</div>
                
                <h3 className="text-lg font-bold text-gray-800">{plan.title}</h3>
                
                <p className="mt-4 text-3xl font-extrabold text-gray-800">
                  Ksh {calculatePrice(plan.price)}/{plan.frequency}
                </p>
                
                {isYearly && plan.price > 0 && (
                  <p className="text-sm text-gray-600 line-through">
                    Ksh {plan.price * 12}/{plan.frequency}
                  </p>
                )}
                
                <ul className="mt-4 space-y-2 text-gray-600 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <CheckCircle className={`text-${plan.color}-500 w-5 h-5`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg
                    hover:bg-blue-700 transition-colors duration-300`}
                  onClick={() => handleNavigateToPayment(plan)} // Navigate to the Payment page with the selected plan
                >
                  Try It Now
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No plans match your search. Try a different filter.
          </div>
        )}
      </div>
    </section>
  );
};

PricingPlan.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      frequency: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(PropTypes.string).isRequired,
      icon: PropTypes.string.isRequired,
      gradient: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      best: PropTypes.bool,
    })
  ),
};

export default PricingPlan;
