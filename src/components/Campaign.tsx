import { type FC } from 'react';
import './Campaign.css';

const Campaign: FC = () => {
  return (
    <section id="campaign" className="campaign-section section fade-in">
      <div className="campaign-container">
        <div className="campaign-header">
          <div className="tech-badge">PROMO_2024 // SUPPORT_PROGRAM</div>
          <h2 className="campaign-title">Подкрепа за <span className="gradient-text">Стартиращи Бизнеси</span></h2>
          <p className="campaign-intro">
            Вярваме в силата на новите идеи. Затова DavidaX стартира ексклузивна кампания за подкрепа на бизнеси, 
            основани в последните 6 месеца.
          </p>
        </div>

        <div className="campaign-grid">
          <div className="offer-card glass">
            <div className="campaign-offer-tag">-50%</div>
            <h3>Изграждане на Сайт & Система</h3>
            <p>Пълна разработка на вашата дигитална инфраструктура на половин цена.</p>
          </div>
          
          <div className="offer-card glass">
            <div className="offer-icon">🛠️</div>
            <h3>6 Месеца Безплатна Поддръжка</h3>
            <p>Ние се грижим за всичко технически, докато вие се фокусирате върху растежа.</p>
          </div>

          <div className="offer-card glass">
            <div className="offer-icon">🚀</div>
            <h3>Безплатни Обновявания</h3>
            <p>Актуализация на вашите продукти и услуги напълно безплатно през първото полугодие.</p>
          </div>
        </div>

        <div className="campaign-footer">
          <p className="eligibility-text">
            * Офертата важи за нови бизнеси, регистрирани през последните 180 дни.
          </p>
          <a href="#contact" className="campaign-btn">
            КАНДИДАТСТВАЙ ЗА ПОДКРЕПА
          </a>
        </div>
      </div>
    </section>
  );
};

export default Campaign;
