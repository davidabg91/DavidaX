import { useState, useEffect, lazy, Suspense } from 'react';
import { HashLink } from 'react-router-hash-link';
import './Hero.css';

const SplineScene = lazy(() => import('./ui/SplineScene').then(module => ({ default: module.SplineScene })));

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [loadSpline, setLoadSpline] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    // Delay 3D Spline load by 2.5 seconds on desktop to prevent TBT page lock
    const timer = setTimeout(() => {
      setLoadSpline(true);
    }, 2500);

    return () => {
      window.removeEventListener('resize', checkViewport);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const heroElement = document.getElementById('home');
    if (!heroElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroElement.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    heroElement.addEventListener('mousemove', handleMouseMove);
    heroElement.addEventListener('mouseenter', handleMouseEnter);
    heroElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      heroElement.removeEventListener('mousemove', handleMouseMove);
      heroElement.removeEventListener('mouseenter', handleMouseEnter);
      heroElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        <div className="hero-content fade-in">
          <div className="hero-tag-container fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="hero-tagline-badge">Премиум Студио за Софтуерни Иновации</span>
          </div>

          <div className="hero-mobile-brand hero-robot-brand">
            <span className="brand-bracket">&lt;</span>
            <span className="brand-name">Davida</span>
            <span className="brand-accent">X</span>
            <span className="brand-bracket">/&gt;</span>
          </div>

          <h1 className="hero-title" aria-label="DavidaX - Професионална Изработка на Сайтове, Уеб Дизайн и Софтуерни Решения">
            <span className="brand-decipher">Превръщаме</span> сложните <span className="highlight">идеи</span> <br />
            в <span className="gradient-text glow-text">работещ софтуер</span>
          </h1>
          
          {/* New Offer Panel */}
          <div className="offer-panel glass fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="offer-content">
              <span className="hero-offer-tag">Ексклузивно</span>
              <h2 className="offer-text">ВЗЕМИ БЕЗПЛАТНА ОФЕРТА ДНЕС!</h2>
              <p className="offer-description">Консултирайте се с нашите експерти и получете план за вашия дигитален растеж.</p>
            </div>
            <HashLink 
              to="/#contact" 
              className="offer-btn" 
              aria-label="Вземи своята безплатна оферта"
              scroll={(el) => window.lenisInstance?.scrollTo(el)}
            >
              Вземи Сега
            </HashLink>
          </div>

          <p className="hero-description">
            DavidaX — Екосистема за иновации. Превръщаме сложни концепции в мащабируеми, 
            високопроизводителни и естетически съвършени дигитални решения.
          </p>
          <div className="hero-btns">
            <HashLink to="/#projects" className="btn-hero primary" aria-label="Разгледай нашите проекти" scroll={(el) => window.lenisInstance?.scrollTo(el)}>Виж Проектите</HashLink>
            <HashLink to="/#services" className="btn-hero secondary" aria-label="Научи повече за нашите услуги" scroll={(el) => window.lenisInstance?.scrollTo(el)}>Нашите Услуги</HashLink>
          </div>
        </div>

        <div className="hero-robot-container fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="hero-desktop-brand hero-robot-brand">
            <span className="brand-bracket">&lt;</span>
            <span className="brand-name">Davida</span>
            <span className="brand-accent">X</span>
            <span className="brand-bracket">/&gt;</span>
          </div>
          {!isDesktop ? (
            <div className="hero-robot-fallback-image">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="DavidaX Logo" className="mobile-robot-fallback" />
            </div>
          ) : isDesktop && loadSpline ? (
            <Suspense fallback={<div className="hero-robot-fallback"><span className="loader"></span></div>}>
              <SplineScene 
                scene={`${import.meta.env.BASE_URL}assets/scene.splinecode`} 
                className="hero-robot-canvas"
              />
            </Suspense>
          ) : (
            <div className="hero-robot-fallback">
              <span className="loader"></span>
            </div>
          )}
        </div>
      </div>
      
      <div className="hero-background">
        <div 
          className="hero-spotlight"
          style={{
            background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 242, 254, 0.12), transparent 80%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
        <div className="glow-circle top"></div>
        <div className="glow-circle bottom"></div>
      </div>
    </section>
  );
};

export default Hero;

