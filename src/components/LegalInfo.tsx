import React from 'react';
import './LegalInfo.css';

const LegalInfo: React.FC = () => {
  return (
    <section id="legal" className="legal-section section fade-in">
      <div className="legal-container glass">
        <div className="legal-header">
          <h2 className="legal-title">Правна <span className="gradient-text">Информация</span></h2>
          <p className="legal-subtitle">Официални данни за компанията и надзорни органи</p>
        </div>
        
        <div className="legal-grid">
          <div className="legal-card">
            <h3 className="card-title">Данни за фирмата</h3>
            <div className="legal-details">
              <div className="detail-item">
                <span className="detail-label">Наименование:</span>
                <span className="detail-value">"ДАВИДА БГ" ЕООД</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">ЕИК/ПИК:</span>
                <span className="detail-value">204356138</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Управител:</span>
                <span className="detail-value">Дейвид Василев Димитров</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Регистрация по ЗДДС:</span>
                <span className="detail-value">Не</span>
              </div>
            </div>
          </div>

          <div className="legal-card">
            <h3 className="card-title">Адрес и Контакти</h3>
            <div className="legal-details">
              <div className="detail-item">
                <span className="detail-label">Седалище:</span>
                <span className="detail-value">БЪЛГАРИЯ, гр. Плевен (5802), жк. "Сторгозия", ул. „Цар Самуил“ - паркинга срещу бл. 34А</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value"><a href="mailto:office@davidax.org">office@davidax.org</a></span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Телефон:</span>
                <span className="detail-value"><a href="tel:+359876141826">+359 876 141 826</a></span>
              </div>
            </div>
          </div>

          <div className="legal-card full-width">
            <h3 className="card-title">Надзорни органи</h3>
            <div className="supervisory-grid">
              <div className="supervisory-item">
                <h4>Комисия за защита на личните данни</h4>
                <p>Адрес: гр. София, ул. „Проф. Цветан Лазаров” № 2</p>
                <p>Електронна поща: kzld@cpdp.bg</p>
                <p>Уеб сайт: <a href="https://www.cpdp.bg/" target="_blank" rel="noopener noreferrer">www.cpdp.bg</a></p>
              </div>
              <div className="supervisory-item">
                <h4>Комисия за защита на потребителите</h4>
                <p>Адрес: гр. София, ПК 1000, пл. „Славейков“ №4А, ет.3, 4 и 6</p>
                <p>Гореща линия: 0700 111 22</p>
                <p>Уеб сайт: <a href="https://www.kzp.bg/" target="_blank" rel="noopener noreferrer">www.kzp.bg</a></p>
              </div>
            </div>
          </div>
        </div>

        <div className="legal-footer">
          <p>Предмет на дейност: покупка на стоки с цел продажба в първоначален, преработен и обработен вид, производство на стоки с цел продажба, комисионна, складова, лизингова дейност, търговско представителство и посредничество.</p>
        </div>
      </div>
    </section>
  );
};

export default LegalInfo;
