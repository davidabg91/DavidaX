import { type FC } from 'react';
import { Words } from './ui/Split';
import { cssVars } from '../utils/css';
import './About.css';

const stats = [
  { value: 4, suffix: '+', label: 'Години Опит' },
  { value: 50, suffix: '+', label: 'Проекта' },
  { value: 100, suffix: '%', label: 'Качество' },
];

/** Отместване на задните слоеве при пълно разтваряне: x%, y% (от собствения размер) и градуси. */
const fan = (x: number, y: number, r: number) => ({
  'data-fan': `${x},${y},${r}`,
  style: cssVars({ '--fx': `${x}%`, '--fy': `${y}%`, '--fr': `${r}deg` }),
});

const About: FC = () => {
  return (
    <section id="about" className="about section">
      <div className="wrap about__grid">
        {/* „Зад бранда“: снимката е най-горният слой, а при скрол иззад нея излизат останалите */}
        <div className="about__media" data-fan-host data-in>
          <div className="layers">
            <div className="layers__card layers__card--plan" aria-hidden="true" {...fan(-9, -44, -7)}>
              <span className="layers__tag"><b>03</b>Архитектура</span>
              <span className="layers__nodes"><i></i><i></i><i></i></span>
            </div>

            <div className="layers__card layers__card--code" aria-hidden="true" {...fan(8, -23, 4.5)}>
              <span className="layers__tag"><b>02</b>Код</span>
              <span className="layers__dots"><i></i><i></i><i></i></span>
              <pre className="layers__src">
                <span>const</span> studio = <em>'DavidaX'</em>{'\n'}
                build(idea).test().<span>ship</span>()
              </pre>
            </div>

            <div className="layers__card layers__card--brand">
              <img
                src={`${import.meta.env.BASE_URL}logo.jpg`}
                alt="DavidaX Logo"
                width="1024"
                height="578"
                loading="lazy"
                decoding="async"
                draggable={false}
                data-parallax="16"
              />
              <span className="layers__shutters" aria-hidden="true">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <i key={i} style={cssVars({ '--i': i })}></i>
                ))}
              </span>
              <span className="layers__tag" aria-hidden="true"><b>01</b>Бранд</span>
              <span className="layers__est" aria-hidden="true">Est. 2022</span>
            </div>
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
