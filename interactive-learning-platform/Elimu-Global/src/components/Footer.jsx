import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">EduTech</h3>
            <p>Empowering learners worldwide with cutting-edge online education.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-300 transition-colors">Home</Link></li>
              <li><Link to="/parents" className="hover:text-blue-300 transition-colors">Parents</Link></li>
              <li><Link to="/contact" className="hover:text-blue-300 transition-colors">Contact</Link></li>
              <li><Link to="/join" className="hover:text-blue-300 transition-colors">Join Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="hover:text-blue-300 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-300 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-blue-300 transition-colors"><FaFacebook /></a>
              <a href="#" className="text-2xl hover:text-blue-300 transition-colors"><FaTwitter /></a>
              <a href="#" className="text-2xl hover:text-blue-300 transition-colors"><FaInstagram /></a>
              <a href="#" className="text-2xl hover:text-blue-300 transition-colors"><FaLinkedin /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 EduTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

