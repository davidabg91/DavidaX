import { useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
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
    <Router>
      <div className="app-container">
        <FloatingFeatures />
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/legal" element={<LegalInfo />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
