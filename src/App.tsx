import { useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import LegalInfo from './components/LegalInfo'
import FloatingFeatures from './components/FloatingFeatures'
import { initFaviconZoom } from './utils/favicon'
import './App.css'

declare global {
  interface Window {
    lenisInstance: Lenis | undefined;
  }
}

function App() {
  useEffect(() => {
    initFaviconZoom(`${import.meta.env.BASE_URL}logo.jpg`);

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    window.lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenisInstance = undefined;
    };
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
