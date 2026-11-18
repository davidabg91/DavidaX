import { Fragment, type FC } from 'react';
import './Strip.css';

const rowA = ['Уеб сайтове', 'Онлайн магазини', 'SaaS платформи', 'ИИ автоматизации', 'Мобилни приложения', 'Разработка на игри', 'Cloud & сигурност'];
const rowB = [
  'Интерактивни графики в реално време',
  'Модерно управление на акаунти',
  'Интелигентни чат ботове и агенти',
  'Сигурни транзакции и абонаменти',
  'Сложни йерархични системи',
];

const Star = () => (
  <svg className="strip__ico" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0c.9 6.6 4.4 11.1 12 12-7.6.9-11.1 5.4-12 12-.9-6.6-4.4-11.1-12-12C7.6 11.1 11.1 6.6 12 0Z" />
  </svg>
);

const Row: FC<{ items: string[]; alt?: boolean }> = ({ items, alt }) => (
  <div className={`strip__row${alt ? ' strip__row--alt' : ''}`}>
    <div className="strip__track" data-dir={alt ? '-1' : '1'} data-speed={alt ? '38' : '52'}>
      {/* Втората група е копие за безкрайната лента и е скрита за екранни четци */}
      {[0, 1].map((copy) => (
        <div className="strip__group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
          {items.map((t) => (
            <Fragment key={t}>
              <span>{t}</span>
              <Star />
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  </div>
);

/** Двойна бягаща лента в противоположни посоки; скоростта се ускорява от скрола (fx/motion.ts). */
const Strip: FC = () => (
  <div className="strip" aria-label="Какво изграждаме">
    <Row items={rowA} />
    <Row items={rowB} alt />
  </div>
);

export default Strip;
