import { type FC } from 'react';
import { cssVars } from '../utils/css';
import './Reel.css';

const services = [
  'Уеб сайтове',
  'Онлайн магазини',
  'SaaS платформи',
  'ИИ автоматизации',
  'Мобилни приложения',
  'Разработка на игри',
  'Cloud & сигурност',
];

const extras = [
  'Интерактивни графики в реално време',
  'Модерно управление на акаунти',
  'Интелигентни чат ботове и агенти',
  'Сигурни транзакции и абонаменти',
  'Сложни йерархични системи',
];

const two = (n: number) => String(n).padStart(2, '0');

/**
 * „Барабан“ с услугите: надписите са наредени по 3D цилиндър, който се върти
 * стъпка по стъпка и се търкаля заедно със скрола (fx/motion.ts).
 * Без движение е обикновен списък.
 */
const Reel: FC = () => (
  <section className="reel" aria-label="Какво изграждаме">
    <div className="wrap reel__grid">
      <div className="reel__side">
        <p className="kicker reveal">Какво изграждаме</p>
        <p className="reel__count" aria-hidden="true">
          <b data-reel-count>01</b>
          <span>/ {two(services.length)}</span>
        </p>
      </div>

      <div className="reel__stage" data-reel={services.length}>
        <div className="reel__pit">
          <ul className="reel__drum">
            {/* Второто копие допълва цилиндъра и е скрито за екранни четци */}
            {[0, 1].map((copy) =>
              services.map((s, i) => (
                <li
                  className="reel__item"
                  key={`${copy}-${s}`}
                  aria-hidden={copy === 1 ? true : undefined}
                  style={cssVars({ '--k': copy * services.length + i })}
                >
                  {s}
                </li>
              )),
            )}
          </ul>
        </div>
        <span className="reel__lens" aria-hidden="true"></span>
      </div>
    </div>

    <ul className="wrap reel__chips">
      {extras.map((t, i) => (
        <li className="reel__chip reveal" key={t} style={cssVars({ '--ri': i })}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 7.5v9M7.5 12h9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          {t}
        </li>
      ))}
    </ul>
  </section>
);

export default Reel;
