import { type FC } from 'react';
import { Percent, Wrench, Rocket, ArrowRight } from 'lucide-react';
import { TLink } from './ui/TLink';
import { Words } from './ui/Split';
import { cssVars } from '../utils/css';
import './Campaign.css';

const offers = [
  {
    icon: Percent,
    badge: '-50%',
    title: 'Изграждане на Сайт & Система',
    text: 'Пълна разработка на вашата дигитална инфраструктура на половин цена.',
  },
  {
    icon: Wrench,
    title: '6 Месеца Безплатна Поддръжка',
    text: 'Ние се грижим за всичко технически, докато вие се фокусирате върху растежа.',
  },
  {
    icon: Rocket,
    title: 'Безплатни Обновявания',
    text: 'Актуализация на вашите продукти и услуги напълно безплатно през първото полугодие.',
  },
];

const Campaign: FC = () => {
  return (
    <section id="campaign" className="campaign">
      {/* Панелът „пораства“ при влизане (scale от fx/motion.ts) */}
      <div className="campaign__panel on-dark" data-grow>
        <div className="campaign__glow" aria-hidden="true"></div>

        <div className="wrap campaign__inner">
          <header className="campaign__head">
            <span className="campaign__badge reveal">PROMO_2026 // SUPPORT_PROGRAM</span>
            <h2 className="h2" data-split>
              <Words>Подкрепа за *Стартиращи* *Бизнеси*</Words>
            </h2>
            <p className="lead reveal" style={cssVars({ '--ri': 1 })}>
              Вярваме в силата на новите идеи. Затова DavidaX стартира ексклузивна кампания за подкрепа на бизнеси,
              основани в последните 6 месеца.
            </p>
          </header>

          <div className="campaign__grid">
            {offers.map((o, i) => {
              const Icon = o.icon;
              return (
                <article className="offer reveal" key={o.title} style={cssVars({ '--ri': i })} data-tilt="6">
                  <span className="spot" aria-hidden="true"></span>
                  <div className="offer__top">
                    <span className="offer__icon">
                      <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    {o.badge && <span className="offer__badge">{o.badge}</span>}
                  </div>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                </article>
              );
            })}
          </div>

          <footer className="campaign__foot reveal">
            <p className="campaign__note">* Офертата важи за нови бизнеси, регистрирани през последните 180 дни.</p>
            <TLink to="/#contact" className="btn btn--accent">
              Кандидатствай за подкрепа
              <ArrowRight aria-hidden="true" />
            </TLink>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default Campaign;
