import { type FC } from 'react';
import './Projects.css';

const projects = [
  {
    title: 'Fortnite Status',
    category: 'Мониторинг & API',
    image: `${import.meta.env.BASE_URL}assets/projects/isfortnite.png`,
    link: 'https://isfortnite.online/'
  },
  {
    title: 'The Corner Bar & Grill',
    category: 'Ресторантски Бизнес',
    image: `${import.meta.env.BASE_URL}assets/projects/thecornerbar.png`,
    link: 'https://www.thecornerbar.online/'
  },
  {
    title: 'Fabcrush Marketplace',
    category: 'E-commerce & Мода',
    image: `${import.meta.env.BASE_URL}assets/projects/fabcrush.png`,
    link: 'https://fabcrush.com/'
  },
  {
    title: 'Odd One Out',
    category: 'Социална Игра',
    image: `${import.meta.env.BASE_URL}assets/projects/oddoneout.png`,
    link: 'https://oddoneout.site/'
  }
];

const Projects: FC = () => {
  return (
    <section id="projects" className="projects-section section fade-in">
      <h2 className="section-title">Част от <span className="gradient-text">Проекти</span></h2>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <div key={i} className="project-card fade-in">
            <div className="project-image-container">
              <img src={p.image} alt={p.title} className="project-image-img" />
            </div>
            <div className="project-info">
              <span className="project-category">{p.category}</span>
              <h2 className="project-name">{p.title}</h2>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">
                Виж сайта →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
