import { DecipherText } from './DecipherText';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content fade-in">
        <div className="hero-badge-container">
          <h4 className="hero-subtitle">Премиум Студио за Софтуерни Иновации</h4>
        </div>
        <h1 className="hero-title">
          <DecipherText text="Изграждаме" /> <span className="highlight"><DecipherText text="Бъдещето" delay={800} /></span> <br />
          <DecipherText text="чрез" delay={1300} /> <span className="gradient-text glow-text"><DecipherText text="Чист Код" delay={1600} /></span>.
        </h1>
        
        {/* New Offer Panel */}
        <div className="offer-panel glass fade-in" style={{ animationDelay: '2s' }}>
          <div className="offer-content">
            <span className="offer-tag">Ексклузивно</span>
            <h2 className="offer-text">ВЗЕМИ БЕЗПЛАТНА ОФЕРТА ДНЕС!</h2>
            <p className="offer-description">Консултирайте се с нашите експерти и получете план за вашия дигитален растеж.</p>
          </div>
          <a href="https://wa.me/359877011033" target="_blank" rel="noopener noreferrer" className="offer-btn">
            Вземи Сега
          </a>
        </div>

        <p className="hero-description">
          DavidaX — Екосистема за иновации. Превръщаме сложни концепции в мащабируеми, 
          високопроизводителни и естетически съвършени дигитални решения.
        </p>
        <div className="hero-btns">
          <a href="#projects" className="btn-hero primary">Виж Проектите</a>
          <a href="#services" className="btn-hero secondary">Нашите Услуги</a>
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
