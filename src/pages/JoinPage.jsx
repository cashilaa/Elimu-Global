import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const JoinPage = () => {
  const [role, setRole] = useState('student')
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const roleParam = params.get('role')
    if (roleParam === 'student' || roleParam === 'instructor') {
      setRole(roleParam)
    }
  }, [location])

  return (
    <div className="min-h-screen bg-blue-custom text-white py-20">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Join EduTech as a {role === 'student' ? 'Student' : 'Instructor'}
        </motion.h1>
        <motion.div
          className="max-w-lg mx-auto bg-blue-700 p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 text-blue-900 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 text-blue-900 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 text-blue-900 rounded"
                required
              />
            </div>
            {role === 'instructor' && (
              <div className="mb-4">
                <label htmlFor="expertise" className="block mb-2">Area of Expertise</label>
                <input
                  type="text"
                  id="expertise"
                  name="expertise"
                  className="w-full px-3 py-2 text-blue-900 rounded"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Join as {role === 'student' ? 'Student' : 'Instructor'}
            </button>
          </form>
          <p className="mt-4 text-center">
            Want to join as a {role === 'student' ? 'instructor' : 'student'}?{' '}
            <button
              onClick={() => setRole(role === 'student' ? 'instructor' : 'student')}
              className="text-blue-300 hover:underline"
            >
              Click here
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default JoinPage
