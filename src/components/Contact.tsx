import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Words } from './ui/Split';
import { cssVars } from '../utils/css';
import './Contact.css';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setIsSending(true);

    try {
      const response = await fetch('https://formspree.io/f/xnjodpza', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        setIsError(false);
        form.reset();
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="wrap contact__grid">
        <div className="contact__info">
          <span className="kicker reveal">Контакт</span>
          <h2 className="h2" data-split>
            <Words>Свържете се с *Нас*</Words>
          </h2>
          <p className="lead reveal" style={cssVars({ '--ri': 1 })}>
            Готови ли сте да трансформирате бизнеса си? Свържете се с нас за консултация и персонална оферта.
          </p>

          <div className="contact__offer reveal" style={cssVars({ '--ri': 2 })}>
            <span className="contact__offer-tag">Ексклузивно</span>
            <p className="contact__offer-title">Вземи безплатна оферта днес!</p>
            <p>Консултирайте се с нашите експерти и получете план за вашия дигитален растеж.</p>
          </div>

          <ul className="contact__details">
            <li className="reveal" style={cssVars({ '--ri': 1 })}>
              <span className="contact__ico"><Mail size={22} strokeWidth={1.8} aria-hidden="true" /></span>
              <div>
                <span className="contact__label">Имейл</span>
                <a href="mailto:davida1991@gmail.com" className="contact__link">davida1991@gmail.com</a>
              </div>
            </li>
            <li className="reveal" style={cssVars({ '--ri': 2 })}>
              <span className="contact__ico"><Phone size={22} strokeWidth={1.8} aria-hidden="true" /></span>
              <div>
                <span className="contact__label">Телефон</span>
                <a href="tel:0876141826" className="contact__link">0876 141 826</a>
              </div>
            </li>
            <li className="reveal" style={cssVars({ '--ri': 3 })}>
              <span className="contact__ico"><MapPin size={22} strokeWidth={1.8} aria-hidden="true" /></span>
              <div>
                <span className="contact__label">Локация</span>
                <p className="contact__link">България / Global</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="contact__card reveal reveal--right">
          {isSubmitted ? (
            <div className="contact__success" role="status">
              <CheckCircle2 size={56} strokeWidth={1.5} aria-hidden="true" />
              <h3>Заявката е изпратена успешно!</h3>
              <p>
                Благодарим ви за доверието. Наш експерт ще прегледа информацията и ще се свърже с вас в рамките на 24 часа.
              </p>
              <button type="button" onClick={() => setIsSubmitted(false)} className="btn btn--line">
                Изпрати нова заявка
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              {isError && (
                <p className="contact__error" role="alert">Грешка при изпращането. Моля опитайте отново.</p>
              )}
              <div className="field">
                <label htmlFor="cf-name">Име</label>
                <input id="cf-name" type="text" name="name" placeholder="Вашето име" autoComplete="name" required />
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="cf-email">Имейл</label>
                  <input id="cf-email" type="email" name="email" placeholder="name@example.com" autoComplete="email" required />
                </div>
                <div className="field">
                  <label htmlFor="cf-phone">Телефон</label>
                  <input id="cf-phone" type="tel" name="phone" placeholder="08xx xxx xxx" autoComplete="tel" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="cf-desc">Описание на проекта</label>
                <textarea id="cf-desc" name="description" placeholder="Разкажете ни накратко за вашия проект…" rows={5} required></textarea>
              </div>
              <button type="submit" className="btn btn--ink contact__submit" disabled={isSending}>
                {isSending ? 'Изпращане…' : 'Изпрати заявка'}
                <ArrowRight aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
