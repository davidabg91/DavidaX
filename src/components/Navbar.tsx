import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
      <div className="navbar-logo">
        <div className="logo-wrapper-dev">
          <img src="/assets/logo-dev.svg" alt="DavidaX IT Logo" className="logo-img-dev" />
        </div>
      </div>
      <ul className="navbar-links">
        <li><a href="#hero">Начало</a></li>
        <li><a href="#about">Бранд</a></li>
        <li><a href="#services">Услуги</a></li>
        <li><a href="#projects">Проекти</a></li>
        <li><a href="#contact">Контакт</a></li>
      </ul>
      <div className="navbar-cta">
        <a href="#contact" className="btn-primary">Запитване</a>
      </div>
    </nav>
  );
};

export default Navbar;
