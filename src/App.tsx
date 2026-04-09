import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Campaign from './components/Campaign'
import Services from './components/Services'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LegalInfo from './components/LegalInfo'
import FloatingFeatures from './components/FloatingFeatures'
import { initFaviconZoom } from './utils/favicon'
import './App.css'

function App() {
  useEffect(() => {
    initFaviconZoom(`${import.meta.env.BASE_URL}logo.jpg`);
  }, []);

  return (
    <div className="app-container">
      <FloatingFeatures />
      <header>
        <Navbar />
      </header>
      <main id="main-content">
        <Hero />
        <About />
        <Campaign />
        <Services />
        <Projects />
        <Contact />
      </main>
      <LegalInfo />
      <Footer />
    </div>
  )
}

export default App
