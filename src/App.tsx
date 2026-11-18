import { useEffect, useLayoutEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import LegalInfo from './components/LegalInfo'
import Blog from './components/Blog'
import Article from './components/Article'
import NotFound from './components/NotFound'
import { initFaviconZoom } from './utils/favicon'
import { scan } from './fx/motion'
import { routeCommitted, scrollToHash } from './fx/nav'
import { applyHead, headFor } from './seo'

declare global {
  interface Window {
    /** Дефинира се в index.html: отваря входната завеса през точката на „i“. */
    __dxReveal?: () => void;
  }
}

/** Скрол и движение при смяна на страница + сигнал към завесата, че сайтът е готов. */
function RouteEffects() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();
  const first = useRef(true);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      if (hash) scrollToHash(hash.slice(1), true);
    } else if (navType !== 'POP') {
      if (hash) scrollToHash(hash.slice(1), true);
      else window.scrollTo({ top: 0, behavior: 'instant' });
    }
    applyHead(headFor(pathname));
    routeCommitted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    scan();
  }, [pathname]);

  useEffect(() => {
    initFaviconZoom(`${import.meta.env.BASE_URL}logo.jpg`);

    // Завесата се отваря, когато съдържанието е изрисувано и шрифтовете са готови.
    const minShow = new Promise<void>((r) => setTimeout(r, 650));
    const fonts = document.fonts
      ? Promise.all([
          document.fonts.load('700 1em "Unbounded Variable"', 'DavidaX Идеи'),
          document.fonts.load('400 1em "Onest Variable"', 'Aa Яя'),
        ])
      : Promise.resolve();
    let cancelled = false;
    Promise.all([minShow, fonts])
      .catch(() => {})
      .then(() => {
        if (cancelled) return;
        requestAnimationFrame(() => {
          scan();
          window.__dxReveal?.();
        });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

/** Цялото приложение без рутера (ползва се и за статичния HTML при build). */
export function AppShell() {
  return (
    <>
      <RouteEffects />
      <a className="skip" href="#main">Към съдържанието</a>
      <div className="progress" aria-hidden="true"></div>
      <div className="grain" aria-hidden="true"></div>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/legal" element={<LegalInfo />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  )
}

export default App
