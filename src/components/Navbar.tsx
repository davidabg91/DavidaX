import { useState, useEffect, type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getLinkProps = (id: string) => {
    if (isHomePage) {
      return { href: `#${id}` };
    }
    return { href: `/#${id}` };
  };

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
          {isHomePage ? (
            <a href="#home" role="menuitem" onClick={() => setIsMenuOpen(false)}>Начало</a>
          ) : (
            <Link to="/" role="menuitem" onClick={() => setIsMenuOpen(false)}>Начало</Link>
          )}
        </li>
        <li role="none"><a {...getLinkProps('about')} role="menuitem" onClick={() => setIsMenuOpen(false)}>Бранд</a></li>
        <li role="none"><a {...getLinkProps('services')} role="menuitem" onClick={() => setIsMenuOpen(false)}>Услуги</a></li>
        <li role="none"><a {...getLinkProps('projects')} role="menuitem" onClick={() => setIsMenuOpen(false)}>Проекти</a></li>
        <li role="none" className="mobile-only-cta">
          <a {...getLinkProps('contact')} role="menuitem" className="nav-btn" onClick={() => setIsMenuOpen(false)}>
            Консултация
          </a>
        </li>
      </ul>

      <div className="navbar-cta">
        <a {...getLinkProps('contact')} className="nav-btn" aria-label="Заявете безплатна консултация">
          Консултация
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
