import { type FC } from 'react';
import { BrainCircuit, Code2, CreditCard, Gamepad2, Smartphone, Shield } from 'lucide-react';
import { Words } from './ui/Split';
import { cssVars } from '../utils/css';
import './Services.css';

const services = [
  {
    title: 'ИИ Интеграция & Автоматизация',
    description: 'Внедряване на изкуствен интелект (LLM), AI агенти и автоматизирани системи за оптимизация на бизнеса.',
    icon: BrainCircuit,
  },
  {
    title: 'Изработка на Сайтове',
    description: 'Високотехнологични уеб сайтове и сложни системи, проектирани за бързина, сигурност и максимална конверсия.',
    icon: Code2,
  },
  {
    title: 'Абонаментни Системи & SaaS',
    description: 'Разработка на цялостни платформи за абонаменти, разплащания и управление на потребители за вашия дигитален продукт.',
    icon: CreditCard,
  },
  {
    title: 'Разработка на Игри (Game Dev)',
    description: 'Създаване на интерактивни 2D/3D игри и социални преживявания за уеб и мобилни платформи.',
    icon: Gamepad2,
  },
  {
    title: 'Мобилни Приложения',
    description: 'Нативни и крос-платформени приложения с фокус върху UX/UI дизайна и безупречната функционалност на всяко устройство.',
    icon: Smartphone,
  },
  {
    title: 'Cloud & Киберсигурност',
    description: 'Мащабируема облачна инфраструктура, DevOps автоматизация и защита на данните от корпоративен клас.',
    icon: Shield,
  },
];

const Services: FC = () => {
  return (
    <section id="services" className="services section">
      <div className="wrap">
        <header className="services__head">
          <span className="kicker reveal">Услуги</span>
          <h2 className="h2" data-split>
            <Words>Какво *Предлагаме*</Words>
          </h2>
        </header>

        <div className="services__grid">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <article key={s.title} className="service reveal" style={cssVars({ '--ri': i % 3 })} data-tilt="6">
                <span className="spot" aria-hidden="true"></span>
                <div className="service__top">
                  <span className="service__icon">
                    <Icon size={28} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span className="service__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="service__title">{s.title}</h3>
                <p className="service__desc">{s.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
