import { DecipherText } from './DecipherText';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content fade-in">
        <h4 className="hero-subtitle">Премиум Студио за Софтуерни Иновации</h4>
        <h1 className="hero-title">
          <DecipherText text="Изграждаме" /> <span className="highlight"><DecipherText text="Бъдещето" delay={800} /></span> <br />
          чрез <span className="gradient-text glow-text"><DecipherText text="Чист Код" delay={1600} /></span>.
        </h1>
        <p className="hero-description">
          DavidaX — Екосистема за иновации. Превръщаме сложни концепции в мащабируеми, 
          високопроизводителни и естетически съвършени дигитални решения.
        </p>
        <div className="hero-btns">
          <a href="#projects" className="btn-hero primary">Виж Проектите</a>
          <a href="#contact" className="btn-hero secondary">Свържи се с нас</a>
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
