import './Services.css';

const services = [
  {
    title: 'ИИ Интеграция & Автоматизация',
    description: 'Внедряване на изкуствен интелект (LLM), AI агенти и автоматизирани системи за оптимизация на бизнеса.',
    icon: '🤖'
  },
  {
    title: 'Custom Web Solutions',
    description: 'Високотехнологични уеб сайтове и сложни системи, изградени с най-модерните технологии за бързина и сигурност.',
    icon: '💻'
  },
  {
    title: 'Абонаментни Системи & SaaS',
    description: 'Разработка на цялостни платформи за абонаменти, разплащания и управление на потребители за вашия бизнес.',
    icon: '💳'
  },
  {
    title: 'Разработка на Игри (Game Dev)',
    description: 'Създаване на интерактивни 2D/3D игри и социални преживявания за уеб и мобилни платформи.',
    icon: '🎮'
  },
  {
    title: 'Мобилни Приложения',
    description: 'Нативни и крос-платформени приложения с фокус върху UX/UI дизайна и безупречната функционалност.',
    icon: '📱'
  },
  {
    title: 'Cloud & Киберсигурност',
    description: 'Мащабируема облачна инфраструктура, DevOps автоматизация и защита на данните от най-висок клас.',
    icon: '🛡️'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="services-section section fade-in">
      <h2 className="section-title">Какво <span className="gradient-text">Предлагаме</span></h2>
      <div className="services-grid">
        {services.map((s, i) => (
          <div key={i} className="service-card floating-style-card">
            <div className="panel-glow"></div>
            <div className="service-content">
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.description}</p>
            </div>
            <div className="tech-line"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
