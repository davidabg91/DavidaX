import { type FC } from 'react';
import { ArrowRight } from 'lucide-react';
import { TLink } from './ui/TLink';
import { Chars } from './ui/Split';
import { cssVars } from '../utils/css';
import HeroBackground from './HeroBackground';
import './Hero.css';

const lines = [
  { text: 'Превръщаме сложните', size: 'sm' },
  { text: 'идеи', size: 'xl' },
  { text: 'в работещ', size: 'sm' },
  { text: 'софтуер', size: 'xl', metal: true },
];

const Hero: FC = () => {
  return (
    <section id="home" className="hero on-dark">
      <HeroBackground />
      <div className="hero__shade" aria-hidden="true"></div>
      <div className="hero__dim" aria-hidden="true"></div>

      <div className="hero__inner">
        <p className="hero__pill">
          <i className="hero__pulse" aria-hidden="true"></i>
          Премиум Студио за Софтуерни Иновации
        </p>

        <h1 className="hero__title" aria-label="DavidaX - Професионална Изработка на Сайтове, Уеб Дизайн и Софтуерни Решения">
          <span aria-hidden="true">
            {lines.map((l, li) => (
              <span
                key={li}
                className={`hero__line hero__line--${l.size}${l.metal ? ' hero__line--metal' : ''}`}
                style={cssVars({ '--li': li })}
              >
                <Chars text={l.text} />{li < lines.length - 1 ? ' ' : ''}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero__sub">
          DavidaX — Екосистема за иновации. Превръщаме сложни концепции в мащабируеми,
          високопроизводителни и естетически съвършени дигитални решения.
        </p>

        <div className="hero__cta">
          <TLink to="/#contact" className="btn btn--accent" aria-label="Вземи своята безплатна оферта">
            Вземи безплатна оферта
            <ArrowRight aria-hidden="true" />
          </TLink>
          <TLink to="/#projects" className="btn btn--ghost" aria-label="Разгледай нашите проекти">
            Виж Проектите
          </TLink>
        </div>
      </div>

      <TLink to="/#about" className="hero__scroll" aria-label="Скролирай към съдържанието">
        <span className="hero__scroll-line" aria-hidden="true"></span>
        Скрол
      </TLink>
    </section>
  );
};

export default Hero;
