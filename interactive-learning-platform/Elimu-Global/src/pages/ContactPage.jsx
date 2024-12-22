import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ParallaxSection, AnimatedSection } from '../components/ParallaxAndAnimations'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <ParallaxSection bgImage="/images/contact-bg.jpg" height="auto">
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h1 className="text-4xl font-bold text-center mb-8 text-white">Contact Us</h1>
          </AnimatedSection>
          <AnimatedSection>
            <form
              className="max-w-lg mx-auto bg-white bg-opacity-10 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-white">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-700 bg-white bg-opacity-75 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-white">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-700 bg-white bg-opacity-75 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2 text-white">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-700 bg-white bg-opacity-75 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
              >
                Send Message
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </ParallaxSection>
  )
}

export default ContactPage
