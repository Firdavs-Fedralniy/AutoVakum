import { useLanguage } from "../../context/languageContext";
import "./Footer.css";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">

      <div className="footer__inner">

        <div className="footer__brand">
          <a
            href="/"
            className="footer__logo"
          >
            AVTO <span>VAKUUM</span>
          </a>

          <p>
            {t.footer.description}
          </p>
        </div>

        <div className="footer__links">

          <span className="footer__title">
            {t.footer.navigation}
          </span>

          <a href="#ishlarimiz">
            {t.footer.beforeAfter}
          </a>

          <a href="#gallery">
            {t.footer.gallery}
          </a>

          <a href="#reviews">
            {t.footer.reviews}
          </a>

          <a href="#contacts">
            {t.footer.contacts}
          </a>
        </div>

        <div className="footer__contact">

          <span className="footer__title">
            {t.footer.contact}
          </span>

          <a href="tel:+998901234567">
            +998 90 123 45 67
          </a>

          <span>
            {t.footer.city}
          </span>

          <a
            href="https://www.instagram.com/akbarr_vakumm/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>

      </div>

      <div className="footer__bottom">

        <span>
          © 2026 AVTO VAKUUM
        </span>

        <span>
          {t.footer.rights}
        </span>

      </div>
    </footer>
  );
}