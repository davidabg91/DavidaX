import { useEffect, useState, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { TLink } from './ui/TLink';
import './Navbar.css';

const links = [
  { to: '/#home', label: 'Начало' },
  { to: '/#about', label: 'Бранд' },
  { to: '/#services', label: 'Услуги' },
  { to: '/#projects', label: 'Проекти' },
  { to: '/blog', label: 'Блог' },
];

const Navbar: FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Затваряне с Escape и заключване на скрола, докато мобилното меню е отворено
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav on-dark${open ? ' is-open' : ''}`}>
      <div className="nav__bar">
        <TLink to="/#home" className="nav__logo" onClick={close} aria-label="Отиди на началната страница">
          <img src={`${import.meta.env.BASE_URL}assets/logo-dev.svg`} alt="DavidaX Logo" width="140" height="60" />
        </TLink>

        <nav className="nav__menu" id="nav-menu" aria-label="Основна навигация">
          <ul className="nav__links">
            {links.map((l) => (
              <li key={l.to}>
                <TLink
                  to={l.to}
                  onClick={close}
                  aria-current={l.to === '/blog' && pathname.startsWith('/blog') ? 'page' : undefined}
                >
                  {l.label}
                </TLink>
              </li>
            ))}
            <li className="nav__links-cta">
              <TLink to="/#contact" className="btn btn--accent" onClick={close}>
                Консултация
              </TLink>
            </li>
          </ul>
        </nav>

        <TLink to="/#contact" className="btn btn--accent nav__cta" aria-label="Заявете безплатна консултация">
          Консултация
        </TLink>

        <button
          type="button"
          className="nav__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Затвори менюто' : 'Отвори менюто'}
          aria-expanded={open}
          aria-controls="nav-menu"
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
