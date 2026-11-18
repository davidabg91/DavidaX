import { type FC } from 'react';
import { Words } from './ui/Split';
import { cssVars } from '../utils/css';
import './About.css';

const stats = [
  { value: 4, suffix: '+', label: 'Години Опит' },
  { value: 50, suffix: '+', label: 'Проекта' },
  { value: 100, suffix: '%', label: 'Качество' },
];

const About: FC = () => {
  return (
    <section id="about" className="about section">
      <div className="wrap about__grid">
        <div className="about__media reveal reveal--zoom">
          <div className="about__frame">
            <img
              src={`${import.meta.env.BASE_URL}logo.jpg`}
              alt="DavidaX Logo"
              width="1024"
              height="578"
              loading="lazy"
              decoding="async"
              draggable={false}
              data-parallax="34"
            />
          </div>
          <div className="about__badge" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="about-badge-path" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
              </defs>
              <text>
                <textPath href="#about-badge-path">EST. 2022 · INNOVATION LAB · DAVIDAX ·</textPath>
              </text>
            </svg>
            <span>DX</span>
          </div>
        </div>

        <div className="about__body">
          <span className="kicker reveal">За нас</span>
          <h2 className="h2" data-split>
            <Words>Зад бранда *DavidaX*</Words>
          </h2>
          <p className="lead about__p reveal" style={cssVars({ '--ri': 1 })}>
            Ние сме DavidaX — екип от висококвалифицирани специалисти, посветени на създаването на
            иновативни дигитални продукти. Нашата мисия е да превръщаме сложни идеи във
            висококачествен код, който носи реална стойност и мащабируемост.
          </p>

          <dl className="about__stats">
            {stats.map((s, i) => (
              <div className="about__stat reveal" key={s.label} style={cssVars({ '--ri': i + 1 })}>
                <dt>{s.label}</dt>
                <dd data-count={s.value} data-suffix={s.suffix}>{`${s.value}${s.suffix}`}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
