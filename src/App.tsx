import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Campaign from './components/Campaign'
import Services from './components/Services'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingFeatures from './components/FloatingFeatures'
import { initFaviconZoom } from './utils/favicon'
import './App.css'

function App() {
  useEffect(() => {
    initFaviconZoom('/logo.jpg');
  }, []);

  return (
    <div className="app-container">
      <FloatingFeatures />
      <Navbar />
      <Hero />
      <About />
      <Campaign />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
