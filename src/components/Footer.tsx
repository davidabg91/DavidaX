import { TLink } from './ui/TLink';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer on-dark">
      <div className="footer__glow" aria-hidden="true"></div>
      <div className="wrap footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <img
              src={`${import.meta.env.BASE_URL}assets/logo-dev.svg`}
              alt="DavidaX - Изработка на Сайтове"
              className="footer__logo"
              width="140"
              height="60"
              loading="lazy"
            />
            <span className="footer__sig">EST. 2022 // INNOVATION LAB</span>
          </div>

          <nav className="footer__nav" aria-label="Footer Navigation">
            <ul>
              <li><TLink to="/#services">Услуги</TLink></li>
              <li><TLink to="/#projects">Проекти</TLink></li>
              <li><TLink to="/#about">За Нас</TLink></li>
              <li><TLink to="/blog">Блог</TLink></li>
              <li><TLink to="/legal">Правна Информация</TLink></li>
              <li><TLink to="/#contact">Контакт</TLink></li>
            </ul>
          </nav>

          <address className="footer__address">
            <p><strong>DavidaX — Софтуерни Решения</strong></p>
            <p>гр. Плевен, Център, 5800</p>
            <p>Email: <a href="mailto:office@davidax.org">office@davidax.org</a></p>
            <p>Тел: <a href="tel:+359876141826">+359 876 141 826</a></p>
          </address>

          <a
            href="https://www.facebook.com/p/DavidaX-61578418701694/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social"
            aria-label="Последвайте ни във Facebook"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 16.9913 5.65681 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79688C10.4375 7.29063 11.9305 5.90625 14.2148 5.90625C15.3086 5.90625 16.4531 6.10156 16.4531 6.10156V8.5625H15.1922C13.95 8.5625 13.5625 9.33333 13.5625 10.125V12H16.3359L15.8926 14.8906H13.5625V21.8785C18.3432 21.1283 22 16.9913 22 12Z" />
            </svg>
            <span>Facebook</span>
          </a>
        </div>

        <p className="footer__word" aria-hidden="true">DavidaX</p>

        <p className="footer__copy">
          © {new Date().getFullYear()} DavidaX. Професионална Изработка на Сайтове и Софтуер. Всички права запазени.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
