import { HashLink } from 'react-router-hash-link';
import { DecipherText } from './DecipherText';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content fade-in">
        <h1 className="hero-title" aria-label="DavidaX - Професионална Изработка на Сайтове Плевен, Уеб Дизайн и Софтуерни Решения">
          <DecipherText text="Изграждаме" from="DavidaX" delay={1000} revealSpeed={2} className="brand-decipher" /> <span className="highlight"><DecipherText text="Бъдещето" delay={1400} /></span> <br />
          <DecipherText text="чрез" delay={1800} /> <span className="gradient-text glow-text"><DecipherText text="Чист Код" delay={2100} /></span>.
        </h1>
        <div className="hero-tag-container fade-in" style={{ animationDelay: '1.2s' }}>
          <span className="hero-tagline-badge">Премиум Студио за Софтуерни Иновации</span>
        </div>
        
        {/* New Offer Panel */}
        <div className="offer-panel glass fade-in" style={{ animationDelay: '2s' }}>
          <div className="offer-content">
            <span className="hero-offer-tag">Ексклузивно</span>
            <h2 className="offer-text">ВЗЕМИ БЕЗПЛАТНА ОФЕРТА ДНЕС!</h2>
            <p className="offer-description">Консултирайте се с нашите експерти и получете план за вашия дигитален растеж.</p>
          </div>
          <HashLink smooth to="/#contact" className="offer-btn" aria-label="Вземи своята безплатна оферта">
            Вземи Сега
          </HashLink>
        </div>

        <p className="hero-description">
          DavidaX — Екосистема за иновации. Превръщаме сложни концепции в мащабируеми, 
          високопроизводителни и естетически съвършени дигитални решения.
        </p>
        <div className="hero-btns">
          <HashLink smooth to="/#projects" className="btn-hero primary" aria-label="Разгледай нашите проекти">Виж Проектите</HashLink>
          <HashLink smooth to="/#services" className="btn-hero secondary" aria-label="Научи повече за нашите услуги">Нашите Услуги</HashLink>
        </div>
      </div>
      <div className="hero-background">
        <div className="glow-circle top"></div>
        <div className="glow-circle bottom"></div>
      </div>
    </section>
  );
};

export default Hero;
