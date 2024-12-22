import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import ContactPage from './pages/ContactPage'
import ParentsPage from './pages/ParentsPage'
import ReadmePage from './pages/ReadmePage'
import AIAssistant from './components/AIAssistant'
import StudentProgress from './components/StudentProgress'
import './index.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/parents" element={<ParentsPage />} />
          <Route path="/readme" element={<ReadmePage />} />
          <Route path="/progress" element={<StudentProgress />} />
        </Routes>
        <AIAssistant />
        <Footer />
      </div>
    </Router>
  )
}

export default App

