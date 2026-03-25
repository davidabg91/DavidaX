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
    <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
      <div className="navbar-logo">
        <div className="logo-wrapper-dev">
          <img src={`${import.meta.env.BASE_URL}assets/logo-dev.svg`} alt="DavidaX IT Logo" className="logo-img-dev" />
        </div>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Начало</a></li>
        <li><a href="#about">Бранд</a></li>
        <li><a href="#services">Услуги</a></li>
        <li><a href="#projects">Проекти</a></li>
        <li><a href="#contact">Контакт</a></li>
        <li><a href="tel:0876141826" className="nav-phone">📞 0876 141 826</a></li>
      </ul>
      <div className="navbar-cta">
        <a href="#contact" className="btn-primary">Запитване</a>
      </div>
      <div className="nav-pulse-line"></div>
    </nav>
  );
};

export default Navbar;
