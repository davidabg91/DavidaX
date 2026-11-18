import { useCallback, useEffect, useRef, useState, type FC } from 'react';
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
  const raf = useRef(0);
  const timer = useRef(0);
  const waitRoute = useRef(false);

  const closeNow = useCallback(() => {
    cancelAnimationFrame(raf.current);
    window.clearTimeout(timer.current);
    waitRoute.current = false;
    setOpen(false);
  }, []);

  /** Затваря няколко кадъра по-късно: целта вече е под менюто и лентата си е сменила фона. */
  const closeAfterFrames = useCallback(() => {
    cancelAnimationFrame(raf.current);
    let n = 0;
    const tick = () => {
      if (++n >= 3) closeNow();
      else raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [closeNow]);

  /**
   * Клик върху линк при отворено меню: страницата се сменя / скача до секцията,
   * докато менюто още я покрива, и чак тогава то избледнява. Иначе менюто се
   * разтваря върху старото място и съдържанието подскача пред очите.
   */
  const onLink = (to: string) => () => {
    if (!open) return;
    const path = to.split('#')[0] || '/';
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(closeNow, 900); // предпазител
    if (path === pathname) closeAfterFrames();
    else waitRoute.current = true; // изчаква новата страница (ефектът долу)
  };

  useEffect(() => {
    if (!waitRoute.current) return;
    waitRoute.current = false;
    closeAfterFrames();
  }, [pathname, closeAfterFrames]);

  useEffect(
    () => () => {
      cancelAnimationFrame(raf.current);
      window.clearTimeout(timer.current);
    },
    [],
  );

  // Затваряне с Escape и спиране на скрола, докато мобилното меню е отворено.
  // Скролът се спира с отказ на жеста, а НЕ с overflow: hidden върху body:
  // това прави body скрол контейнер, „залепеният“ hero се откача и подскача.
  useEffect(() => {
    if (!open) return;
    const menu = document.getElementById('nav-menu');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeNow();
    };
    const block = (e: Event) => {
      // ако самото меню не се побира (нисък екран), то трябва да може да се скролва
      const inMenu = menu && e.target instanceof Node && menu.contains(e.target);
      if (inMenu && menu.scrollHeight > menu.clientHeight) return;
      if (e.cancelable) e.preventDefault();
    };
    const desktop = window.matchMedia('(min-width: 901px)');
    const onDesktop = () => {
      if (desktop.matches) closeNow();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('touchmove', block, { passive: false });
    document.addEventListener('wheel', block, { passive: false });
    desktop.addEventListener('change', onDesktop);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('touchmove', block);
      document.removeEventListener('wheel', block);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [open, closeNow]);

  return (
    <header className={`nav on-dark${open ? ' is-open' : ''}`}>
      <div className="nav__bar">
        <TLink to="/#home" className="nav__logo" onClick={onLink('/#home')} instant={open} aria-label="Отиди на началната страница">
          <img src={`${import.meta.env.BASE_URL}assets/logo-dev.svg`} alt="DavidaX Logo" width="140" height="60" />
        </TLink>

        <nav className="nav__menu" id="nav-menu" aria-label="Основна навигация">
          <ul className="nav__links">
            {links.map((l) => (
              <li key={l.to}>
                <TLink
                  to={l.to}
                  onClick={onLink(l.to)}
                  instant={open}
                  aria-current={l.to === '/blog' && pathname.startsWith('/blog') ? 'page' : undefined}
                >
                  {l.label}
                </TLink>
              </li>
            ))}
            <li className="nav__links-cta">
              <TLink to="/#contact" className="btn btn--accent" onClick={onLink('/#contact')} instant={open}>
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
