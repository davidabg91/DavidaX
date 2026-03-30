import React, { useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

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
    } catch (err) {
      setIsError(true);
    }
  };

  return (
    <section id="contact" className="contact-section section fade-in">
      <h2 className="section-title">Свържете се с <span className="gradient-text">Нас</span></h2>
      <div className="contact-container holographic">
        <div className="contact-info tech-card">
          <p className="contact-desc">
            Готови ли сте да трансформирате бизнеса си? Свържете се с нас за консултация и персонална оферта.
          </p>
          <div className="contact-details">
            <div className="detail-item tech-item">
              <span className="icon">📧</span>
              <div className="item-text">
                <label>EMAIL_ADDR</label>
                <a href="mailto:davida1991@gmail.com" className="contact-link">davida1991@gmail.com</a>
              </div>
            </div>
            <div className="detail-item tech-item">
              <span className="icon">📞</span>
              <div className="item-text">
                <label>PHONE_LINE</label>
                <a href="tel:0876141826" className="contact-link">0876 141 826</a>
              </div>
            </div>
            <div className="detail-item tech-item">
              <span className="icon">📍</span>
              <div className="item-text">
                <label>LOCATION_GEO</label>
                <p>България</p>
              </div>
            </div>
          </div>
        </div>

        {isSubmitted ? (
          <div className="success-message tech-card fade-in">
            <div className="success-icon">✅</div>
            <h3 className="success-title">Заявката е изпратена Успешно!</h3>
            <p className="success-text">
              Благодарим ви за доверието. Наш експерт ще прегледа информацията и ще се свърже с вас в рамките на 24 часа.
            </p>
            <button onClick={() => setIsSubmitted(false)} className="tech-reset-btn">
              ИЗПРАТИ НОВА ЗАЯВКА
            </button>
          </div>
        ) : (
          <form className="contact-form tech-card" onSubmit={handleSubmit}>
            {isError && <p style={{ color: '#ff4d4d', marginBottom: '15px' }}>Грешка при изпращането. Моля опитайте отново.</p>}
            <div className="form-group">
              <label className="input-label">USER_NAME:</label>
              <input type="text" name="name" placeholder="въведете име..." required className="tech-input" />
            </div>
            <div className="form-group">
              <label className="input-label">USER_EMAIL:</label>
              <input type="email" name="email" placeholder="въведете имейл..." required className="tech-input" />
            </div>
            <div className="form-group">
              <label className="input-label">USER_PHONE:</label>
              <input type="tel" name="phone" placeholder="въведете телефон..." className="tech-input" />
            </div>
            <div className="form-group">
              <label className="input-label">PROJECT_DESC:</label>
              <textarea name="description" placeholder="описание на вашия проект..." rows={4} required className="tech-input"></textarea>
            </div>
            <button type="submit" className="tech-submit-btn">
              ИЗПРАТИ ЗАЯВКА()
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
