import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { TLink } from './ui/TLink';
import { Words } from './ui/Split';
import { cssVars } from '../utils/css';
import './LegalInfo.css';
import './Blog.css'; // общи стилове (back-link)

const LegalInfo: React.FC = () => {
  return (
    <>
      <header className="phero on-dark">
        <div className="wrap">
          <span className="kicker reveal">Официални данни за компанията и надзорни органи</span>
          <h1 className="phero__title" data-split>
            <Words>Правна *Информация*</Words>
          </h1>
        </div>
      </header>

      <section id="legal" className="sheet sheet--page legal">
        <div className="wrap">
          <div className="legal__grid">
            <div className="legal__card reveal">
              <h2 className="legal__title">Данни за фирмата</h2>
              <dl className="legal__list">
                <div>
                  <dt>Наименование:</dt>
                  <dd>"ДАВИДА БГ" ЕООД</dd>
                </div>
                <div>
                  <dt>ЕИК/ПИК:</dt>
                  <dd>204356138</dd>
                </div>
                <div>
                  <dt>Управител:</dt>
                  <dd>Дейвид Василев Димитров</dd>
                </div>
                <div>
                  <dt>Регистрация по ЗДДС:</dt>
                  <dd>Не</dd>
                </div>
              </dl>
            </div>

            <div className="legal__card reveal" style={cssVars({ '--ri': 1 })}>
              <h2 className="legal__title">Адрес и Контакти</h2>
              <dl className="legal__list">
                <div>
                  <dt>Седалище:</dt>
                  <dd>БЪЛГАРИЯ, гр. Плевен (5802), жк. "Сторгозия", ул. „Цар Самуил“ - паркинга срещу бл. 34А</dd>
                </div>
                <div>
                  <dt>Email:</dt>
                  <dd><a href="mailto:office@davidax.org">office@davidax.org</a></dd>
                </div>
                <div>
                  <dt>Телефон:</dt>
                  <dd><a href="tel:+359876141826">+359 876 141 826</a></dd>
                </div>
              </dl>
            </div>

            <div className="legal__card legal__card--wide reveal">
              <h2 className="legal__title">Надзорни органи</h2>
              <div className="legal__bodies">
                <div>
                  <h3>Комисия за защита на личните данни</h3>
                  <p>Адрес: гр. София, ул. „Проф. Цветан Лазаров” № 2</p>
                  <p>Електронна поща: kzld@cpdp.bg</p>
                  <p>Уеб сайт: <a href="https://www.cpdp.bg/" target="_blank" rel="noopener noreferrer">www.cpdp.bg</a></p>
                </div>
                <div>
                  <h3>Комисия за защита на потребителите</h3>
                  <p>Адрес: гр. София, ПК 1000, пл. „Славейков“ №4А, ет.3, 4 и 6</p>
                  <p>Гореща линия: 0700 111 22</p>
                  <p>Уеб сайт: <a href="https://www.kzp.bg/" target="_blank" rel="noopener noreferrer">www.kzp.bg</a></p>
                </div>
              </div>
            </div>
          </div>

          <div className="legal__foot reveal">
            <p>Предмет на дейност: покупка на стоки с цел продажба в първоначален, преработен и обработен вид, производство на стоки с цел продажба, комисионна, складова, лизингова дейност, търговско представителство и посредничество.</p>
            <TLink to="/" className="back-link">
              <ArrowLeft aria-hidden="true" />
              Обратно към началната страница
            </TLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default LegalInfo;
