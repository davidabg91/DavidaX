import './Services.css';

const services = [
  {
    title: 'ИИ Интеграция & Автоматизация',
    description: 'Внедряване на изкуствен интелект (LLM), AI агенти и автоматизирани системи за оптимизация на бизнеса в Плевен и страната.',
    meta: 'AI решения и автоматизация на процеси.',
    icon: '🤖'
  },
  {
    title: 'Изработка на Сайтове Плевен',
    description: 'Високотехнологични уеб сайтове и сложни системи, проектирани за бързина, сигурност и максимална конверсия.',
    meta: 'Уеб дизайн и разработка на сайтове.',
    icon: '💻'
  },
  {
    title: 'Абонаментни Системи & SaaS',
    description: 'Разработка на цялостни платформи за абонаменти, разплащания и управление на потребители за вашия дигитален продукт.',
    meta: 'SaaS платформи и абонаментно управление.',
    icon: '💳'
  },
  {
    title: 'Разработка на Игри (Game Dev)',
    description: 'Създаване на интерактивни 2D/3D игри и социални преживявания за уеб и мобилни платформи.',
    meta: 'Game development и интерактивен софтуер.',
    icon: '🎮'
  },
  {
    title: 'Мобилни Приложения',
    description: 'Нативни и крос-платформени приложения с фокус върху UX/UI дизайна и безупречната функционалност на всяко устройство.',
    meta: 'iOS и Android разработка.',
    icon: '📱'
  },
  {
    title: 'Cloud & Киберсигурност',
    description: 'Мащабируема облачна инфраструктура, DevOps автоматизация и защита на данните от корпоративен клас.',
    meta: 'Облачни услуги и кибер защита.',
    icon: '🛡️'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="services-section section fade-in">
      <h2 className="section-title">Какво <span className="gradient-text">Предлагаме</span></h2>
      <div className="services-grid">
        {services.map((s, i) => (
          <article key={i} className="service-card fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="service-icon" role="img" aria-label={`Икона за ${s.title}`}>{s.icon}</div>
            <h3 className="service-title">{s.title}</h3>
            <p className="service-desc">{s.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
