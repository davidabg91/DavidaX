import './About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about-section section fade-in">
      <h2 className="section-title">Зад бранда <span className="gradient-text">DavidaX</span></h2>
      <div className="about-grid">
        <div className="about-image">
          <div className="hologram-container">
            <div className="logo-blend-wrapper">
              <img src="/logo.jpg" alt="DavidaX Logo" className="about-logo-img-seamless" />
              <div className="scanline-overlay"></div>
            </div>
            <div className="orbit-ring"></div>
            <div className="tech-tag top-right">[VERSION_4.0]</div>
            <div className="tech-tag bottom-left">[SYS_STABLE]</div>
          </div>
        </div>
        <div className="about-text">
          <p className="about-p">
            Ние сме DavidaX - екип от висококвалифицирани специалисти, посветени на създаването на 
            иновативни дигитални продукти. Нашата мисия е да превръщаме сложни идеи във висококачествен 
            код, който носи реална стойност и мащабируемост.
          </p>
          <div className="stats-grid">
            <div className="stat-card glass">
              <h3>4+</h3>
              <p>Години Опит</p>
            </div>
            <div className="stat-card glass">
              <h3>50+</h3>
              <p>Проекта</p>
            </div>
            <div className="stat-card glass">
              <h3>100%</h3>
              <p>Качество</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
