import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content fade-in">
        <h4 className="hero-subtitle">Премиум Студио за Софтуерни Иновации</h4>
        <h1 className="hero-title">
          Изграждаме <span className="highlight">Бъдещето</span> <br />
          чрез <span className="gradient-text glow-text">Чист Код</span>.
        </h1>
        <p className="hero-description">
          DavidaX — Екосистема за иновации. Превръщаме сложни концепции в мащабируеми, 
          високопроизводителни и естетически съвършени дигитални решения.
        </p>
        <div className="hero-btns">
          <a href="#projects" className="btn-hero primary">Виж Проектите</a>
          <a href="#contact" className="btn-hero secondary">Свържи се с мен</a>
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
