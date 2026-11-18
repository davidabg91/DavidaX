import { type FC } from 'react';

/**
 * Фон на hero: „Аврора“ — бавно движещ се тъмен градиент + фина мрежа.
 * Само CSS; анимира се единствено transform.
 */
const HeroBackground: FC = () => (
  <div className="hero__media" aria-hidden="true">
    <div className="hbg hbg--aurora">
      <i className="hbg__blob hbg__blob--1"></i>
      <i className="hbg__blob hbg__blob--2"></i>
      <i className="hbg__blob hbg__blob--3"></i>
      <i className="hbg__grid"></i>
    </div>
  </div>
);

export default HeroBackground;
