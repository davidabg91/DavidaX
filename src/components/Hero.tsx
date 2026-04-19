import { DecipherText } from './DecipherText';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content fade-in">
        <h1 className="hero-branding-title">DavidaX</h1>
        <h2 className="hero-title" aria-label="DavidaX - Професионална Изработка на Сайтове и Софтуерни Решения Плевен">
          <span className="sr-only">DavidaX — Професионална Изработка на Сайтове Плевен, Уеб Дизайн и Софтуерни Решения. </span>
          <DecipherText text="Изграждаме" /> <span className="highlight"><DecipherText text="Бъдещето" delay={800} /></span> <br />
          <DecipherText text="чрез" delay={1300} /> <span className="gradient-text glow-text"><DecipherText text="Чист Код" delay={1600} /></span>.
        </h2>
        <p className="hero-tagline">Премиум Студио за Софтуерни Иновации</p>
        
        {/* New Offer Panel */}
        <div className="offer-panel glass fade-in" style={{ animationDelay: '2s' }}>
          <div className="offer-content">
            <span className="hero-offer-tag">Ексклузивно</span>
            <h2 className="offer-text">ВЗЕМИ БЕЗПЛАТНА ОФЕРТА ДНЕС!</h2>
            <p className="offer-description">Консултирайте се с нашите експерти и получете план за вашия дигитален растеж.</p>
          </div>
          <a href="#contact" className="offer-btn" aria-label="Вземи своята безплатна оферта">
            Вземи Сега
          </a>
        </div>

        <p className="hero-description">
          DavidaX — Екосистема за иновации. Превръщаме сложни концепции в мащабируеми, 
          високопроизводителни и естетически съвършени дигитални решения.
        </p>
        <div className="hero-btns">
          <a href="#projects" className="btn-hero primary" aria-label="Разгледай нашите проекти">Виж Проектите</a>
          <a href="#services" className="btn-hero secondary" aria-label="Научи повече за нашите услуги">Нашите Услуги</a>
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
