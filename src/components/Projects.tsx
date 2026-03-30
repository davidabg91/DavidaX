import { type FC } from 'react';
import './Projects.css';

const projects = [
  {
    title: 'Dary Commerce',
    category: 'Системи за Транспорт',
    image: `${import.meta.env.BASE_URL}assets/projects/darycommerce.png`,
    link: 'https://darycommerce.com/',
    description: 'Софтуер за абонаменти.'
  },
  {
    title: 'Fortnite Status',
    category: 'Мониторинг & API',
    image: `${import.meta.env.BASE_URL}assets/projects/isfortnite.png`,
    link: 'https://isfortnite.online/',
    description: 'Статус на сървърите в реално време.'
  },
  {
    title: 'The Corner Bar & Grill',
    category: 'Ресторантски Бизнес',
    image: `${import.meta.env.BASE_URL}assets/projects/thecornerbar.png`,
    link: 'https://www.thecornerbar.online/',
    description: 'Модерно дигитално меню и резервации.'
  },
  {
    title: 'Fabcrush Marketplace',
    category: 'E-commerce & Мода',
    image: `${import.meta.env.BASE_URL}assets/projects/fabcrush.png`,
    link: 'https://fabcrush.com/',
    description: 'Платформа за онлайн търговия.'
  },
  {
    title: 'Odd One Out',
    category: 'Социална Игра',
    image: `${import.meta.env.BASE_URL}assets/projects/oddoneout.png`,
    link: 'https://oddoneout.site/',
    description: 'Интерактивна игра за социални контакти.'
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
              <p className="project-description">{p.description}</p>
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
