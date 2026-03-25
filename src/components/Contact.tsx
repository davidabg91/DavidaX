import './Contact.css';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact-section section fade-in">
      <h2 className="section-title">Свържете се с <span className="gradient-text">Нас</span></h2>
      <div className="contact-container holographic">
        <div className="contact-info tech-card">
          <div className="card-header">
            <span className="status-dot"></span>
            <span className="header-text">[SYSTEM::INFO]_</span>
          </div>
          <p className="contact-desc">
            Готови ли сте да трансформирате бизнеса си? Свържете се с мен за консултация.
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
                <p>София, България</p>
              </div>
            </div>
          </div>
        </div>
        <form className="contact-form tech-card">
          <div className="card-header">
            <span className="status-dot green"></span>
            <span className="header-text">[INPUT::SESSION]_</span>
          </div>
          <div className="scanline"></div>
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
            <label className="input-label">USER_MESSAGE:</label>
            <textarea placeholder="напишете съобщение..." rows={4} required className="tech-input"></textarea>
          </div>
          <button type="submit" className="tech-submit-btn">
            ИЗПРАТИ_СЪОБЩЕНИЕ()
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
