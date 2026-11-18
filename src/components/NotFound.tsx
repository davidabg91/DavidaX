import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TLink } from './ui/TLink';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <section className="notfound on-dark">
      <div className="notfound__glow" aria-hidden="true"></div>
      <div className="notfound__inner">
        <p className="notfound__code" aria-hidden="true">404</p>
        <h1 className="notfound__title">Изглежда сте се изгубили</h1>
        <p className="notfound__text">Страницата, която търсите, не съществува или е преместена.</p>
        <TLink to="/" className="btn btn--accent">
          Към началото
          <ArrowRight aria-hidden="true" />
        </TLink>
      </div>
    </section>
  );
};

export default NotFound;
