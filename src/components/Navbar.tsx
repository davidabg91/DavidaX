import { useState, useEffect, type FC } from 'react';
import './Navbar.css';

const Navbar: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-logo">
        <a href="#home" onClick={() => setIsMenuOpen(false)}>
          <img src={`${import.meta.env.BASE_URL}assets/logo-dev.svg`} alt="DavidaX Logo" className="navbar-logo-img" />
        </a>
      </div>
      
      <div className={`navbar-mobile-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Начало</a></li>
        <li><a href="#about" onClick={() => setIsMenuOpen(false)}>Бранд</a></li>
        <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Услуги</a></li>
        <li><a href="#projects" onClick={() => setIsMenuOpen(false)}>Проекти</a></li>
        <li className="mobile-only-cta">
          <a href="#contact" className="nav-btn" onClick={() => setIsMenuOpen(false)}>
            Консултация
          </a>
        </li>
      </ul>

      <div className="navbar-cta">
        <a href="#contact" className="nav-btn">
          Консултация
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
