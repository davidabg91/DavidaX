import { useState, useEffect, type FC } from 'react';
import './Navbar.css';

const Navbar: FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <span className="logo-text">DAVIDAX</span>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Начало</a></li>
        <li><a href="#about">Бранд</a></li>
        <li><a href="#services">Услуги</a></li>
        <li><a href="#projects">Проекти</a></li>
      </ul>
      <div className="navbar-cta">
        <a href="https://wa.me/359877011033" target="_blank" rel="noopener noreferrer" className="nav-btn">
          Консултация
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
