import { useState, useEffect, type FC } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
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
        <Link to="/" onClick={() => setIsMenuOpen(false)} aria-label="Отиди на началната страница">
          <img src={`${import.meta.env.BASE_URL}assets/logo-dev.svg`} alt="DavidaX Logo" className="navbar-logo-img" />
        </Link>
      </div>
      
      <button 
        className={`navbar-mobile-toggle ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu} 
        aria-label={isMenuOpen ? "Затвори менюто" : "Отвори менюто"}
        aria-expanded={isMenuOpen}
        aria-controls="navbar-links"
      >
        <span></span>
        <span><span></span></span>
        <span></span>
      </button>

      <ul id="navbar-links" className={`navbar-links ${isMenuOpen ? 'active' : ''}`} role="menu">
        <li role="none">
          <HashLink smooth to="/#home" role="menuitem" onClick={() => setIsMenuOpen(false)}>Начало</HashLink>
        </li>
        <li role="none">
          <HashLink smooth to="/#about" role="menuitem" onClick={() => setIsMenuOpen(false)}>Бранд</HashLink>
        </li>
        <li role="none">
          <HashLink smooth to="/#services" role="menuitem" onClick={() => setIsMenuOpen(false)}>Услуги</HashLink>
        </li>
        <li role="none">
          <HashLink smooth to="/#projects" role="menuitem" onClick={() => setIsMenuOpen(false)}>Проекти</HashLink>
        </li>
        <li role="none" className="mobile-only-cta">
          <HashLink smooth to="/#contact" role="menuitem" className="nav-btn" onClick={() => setIsMenuOpen(false)}>
            Консултация
          </HashLink>
        </li>
      </ul>

      <div className="navbar-cta">
        <HashLink smooth to="/#contact" className="nav-btn" aria-label="Заявете безплатна консултация">
          Консултация
        </HashLink>
      </div>
    </nav>
  );
};

export default Navbar;
