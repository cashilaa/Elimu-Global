import React from 'react'
import { motion } from 'framer-motion'

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl font-bold text-blue-900 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome, Student!
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard title="My Courses" content="View and manage your enrolled courses" />
          <DashboardCard title="Assignments" content="Check your pending and completed assignments" />
          <DashboardCard title="Progress" content="Track your learning progress and achievements" />
          <DashboardCard title="Messages" content="Communicate with your instructors and peers" />
          <DashboardCard title="Resources" content="Access additional learning materials and resources" />
          <DashboardCard title="Support" content="Get help and support for your learning journey" />
        </div>
      </div>
    </div>
  )
}

const DashboardCard = ({ title, content }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md overflow-hidden"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div className="p-6">
      <h2 className="text-xl font-semibold text-blue-900 mb-2">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
    <div className="px-6 py-4 bg-blue-50">
      <a href="#" className="text-blue-600 hover:underline">Learn more</a>
    </div>
  </motion.div>
)

export default StudentDashboard

