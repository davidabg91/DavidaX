import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
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
                <a href="tel:0877011033" className="contact-link">0877 011 033</a>
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

        <form className="contact-form tech-card">
          <div className="form-group">
            <label className="input-label">USER_NAME:</label>
            <input type="text" placeholder="въведете име..." required className="tech-input" />
          </div>
          <div className="form-group">
            <label className="input-label">USER_EMAIL:</label>
            <input type="email" placeholder="въведете имейл..." required className="tech-input" />
          </div>
          <div className="form-group">
            <label className="input-label">USER_PHONE:</label>
            <input type="tel" placeholder="въведете телефон..." className="tech-input" />
          </div>
          <div className="form-group">
            <label className="input-label">PROJECT_DESC:</label>
            <textarea placeholder="описание на вашия проект..." rows={4} required className="tech-input"></textarea>
          </div>
          <button type="submit" className="tech-submit-btn">
            ИЗПРАТИ ЗАЯВКА()
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
