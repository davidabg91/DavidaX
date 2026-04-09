import { type FC } from 'react';
import './Projects.css';

const projects = [
  {
    title: 'TransitFlow',
    category: 'Fleet Management & NFC',
    image: `${import.meta.env.BASE_URL}assets/projects/transitflow.png`,
    link: 'http://transitflow.org/',
    description: 'Дигитализация на транспортния сектор чрез NFC валидиране, динамични графици и детайлна финансова отчетност.'
  },
  {
    title: 'NFC Bulgaria',
    category: 'NFC & Digital IDs',
    image: `${import.meta.env.BASE_URL}assets/projects/nfcbulgaria.png`,
    link: 'https://nfcbulgaria.com/',
    description: 'Смарт решения за дигитални визитки, NFC табели и автоматизация на бизнеса.'
  },
  {
    title: 'Dary Commerce',
    category: 'SaaS & Fintech',
    image: `${import.meta.env.BASE_URL}assets/projects/darycommerce.png`,
    link: 'https://darycommerce.com/',
    description: 'Иновативна платформа за управление на абонаменти и дигитални разплащания.'
  },
  {
    title: 'ДИ ЦЕНТЪР',
    category: 'Хотелиерски Софтуер',
    image: `${import.meta.env.BASE_URL}assets/projects/dicenter.png`,
    link: 'https://davidabg91.github.io/AIRBNB/',
    description: 'Премиум уеб сайт за управление на резервации и луксозно настаняване.'
  },
  {
    title: 'The Corner Bar & Grill',
    category: 'Digital Menu & Business',
    image: `${import.meta.env.BASE_URL}assets/projects/thecornerbar.png`,
    link: 'https://www.thecornerbar.online/',
    description: 'Цялостна дигитална екосистема за ресторантски бизнес и онлайн поръчки.'
  },
  {
    title: 'Fabcrush Marketplace',
    category: 'E-commerce Platform',
    image: `${import.meta.env.BASE_URL}assets/projects/fabcrush.png`,
    link: 'https://fabcrush.com/',
    description: 'Мащабируем онлайн маркетплейс с фокус върху потребителското преживяване.'
  },
  {
    title: 'Fortnite Status',
    category: 'Real-time API Monitor',
    image: `${import.meta.env.BASE_URL}assets/projects/isfortnite.png`,
    link: 'https://isfortnite.online/',
    description: 'Система за мониторинг на гейминг сървъри в реално време.'
  },
  {
    title: 'Odd One Out',
    category: 'Interactive Social Game',
    image: `${import.meta.env.BASE_URL}assets/projects/oddoneout.png`,
    link: 'https://oddoneout.site/',
    description: 'Уеб-базирана социална игра с фокус върху интерактивността.'
  }
];

const Projects: FC = () => {
  return (
    <section id="projects" className="projects-section section fade-in">
      <h2 className="section-title">Избрани <span className="gradient-text">Проекти</span></h2>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <article key={i} className="project-card fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="project-image-container">
              <img src={p.image} alt={`Проект: ${p.title} - ${p.category}`} className="project-image-img" loading="lazy" />
            </div>
            <div className="project-info">
              <span className="project-category">{p.category}</span>
              <h3 className="project-name">{p.title}</h3>
              <p className="project-description">{p.description}</p>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={`Прегледай проекта ${p.title}`}>
                Виж сайта →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
