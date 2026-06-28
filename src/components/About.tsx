import { ContainerScroll } from './ui/container-scroll-animation';
import { TextSplit } from './ui/text-split';
import './About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about-section section fade-in">
      <ContainerScroll
        titleComponent={
          <h2 className="section-title">
            <TextSplit>Зад бранда</TextSplit> <TextSplit className="gradient-text">DavidaX</TextSplit>
          </h2>
        }
      >
        <img
          src={`${import.meta.env.BASE_URL}logo.jpg`}
          alt="DavidaX Logo"
          draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        />
      </ContainerScroll>

      <div className="about-below-card">
        <p className="about-p">
          Ние сме DavidaX — екип от висококвалифицирани специалисти, посветени на създаването на
          иновативни дигитални продукти. Нашата мисия е да превръщаме сложни идеи във
          висококачествен код, който носи реална стойност и мащабируемост.
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
    </section>
  );
};

export default About;
