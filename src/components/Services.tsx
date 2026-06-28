import { type FC } from 'react';
import { BrainCircuit, Code2, CreditCard, Gamepad2, Smartphone, Shield } from 'lucide-react';
import './Services.css';

const services = [
  {
    title: 'ИИ Интеграция & Автоматизация',
    description: 'Внедряване на изкуствен интелект (LLM), AI агенти и автоматизирани системи за оптимизация на бизнеса.',
    meta: 'AI решения и автоматизация на процеси.',
    icon: BrainCircuit
  },
  {
    title: 'Изработка на Сайтове',
    description: 'Високотехнологични уеб сайтове и сложни системи, проектирани за бързина, сигурност и максимална конверсия.',
    meta: 'Уеб дизайн и разработка на сайтове.',
    icon: Code2
  },
  {
    title: 'Абонаментни Системи & SaaS',
    description: 'Разработка на цялостни платформи за абонаменти, разплащания и управление на потребители за вашия дигитален продукт.',
    meta: 'SaaS платформи и абонаментно управление.',
    icon: CreditCard
  },
  {
    title: 'Разработка на Игри (Game Dev)',
    description: 'Създаване на интерактивни 2D/3D игри и социални преживявания за уеб и мобилни платформи.',
    meta: 'Game development и интерактивен софтуер.',
    icon: Gamepad2
  },
  {
    title: 'Мобилни Приложения',
    description: 'Нативни и крос-платформени приложения с фокус върху UX/UI дизайна и безупречната функционалност на всяко устройство.',
    meta: 'iOS и Android разработка.',
    icon: Smartphone
  },
  {
    title: 'Cloud & Киберсигурност',
    description: 'Мащабируема облачна инфраструктура, DevOps автоматизация и защита на данните от корпоративен клас.',
    meta: 'Облачни услуги и кибер защита.',
    icon: Shield
  }
];

const Services: FC = () => {
  return (
    <section id="services" className="services-section section fade-in">
      <h2 className="section-title">Какво <span className="gradient-text">Предлагаме</span></h2>
      <div className="services-grid">
        {services.map((s, i) => {
          const IconComponent = s.icon;
          return (
            <article key={i} className="service-card fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="service-icon-wrapper">
                <IconComponent className="service-icon" size={48} />
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
