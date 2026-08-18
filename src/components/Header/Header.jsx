import { useLanguage } from "../../context/languageContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Header.css";

function Header() {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <header className="header">
      <div className="header__inner">

        <a href="/" className="header__logo">
          AVTO<span>VAKUUM</span>
        </a>

        <nav className="header__nav">
          <a href="#services">
            {t.header.services}
          </a>

          <a href="#ishlarimiz">
            {t.header.beforeAfter}
          </a>

          <a href="#gallery">
            {t.header.gallery}
          </a>

          <a href="#reviews">
            {t.header.reviews}
          </a>

          <a href="#contacts">
            {t.header.contacts}
          </a>
        </nav>

        <div className="header__actions">

          <div className="language-switcher">
            <button
              type="button"
              className={
                language === "uz"
                  ? "language-button language-button--active"
                  : "language-button"
              }
              onClick={() => changeLanguage("uz")}
            >
              UZ
            </button>

            <span className="language-divider">
              /
            </span>

            <button
              type="button"
              className={
                language === "ru"
                  ? "language-button language-button--active"
                  : "language-button"
              }
              onClick={() => changeLanguage("ru")}
            >
              RU
            </button>
          </div>

          <a
            href="https://www.instagram.com/akbarr_vakumm/"
            target="_blank"
            rel="noopener noreferrer"
            className="header__instagram"
          >
            <svg viewBox="0 0 24 24">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
              />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                className="instagram-dot"
              />
            </svg>
          </a>

          <ThemeToggle />

          <a
            href="tel:+998901234567"
            className="header__phone"
          >
            +998 90 123 45 67
          </a>

          <a
            href="#contacts"
            className="header__button"
          >
            {t.header.order}
          </a>

        </div>
      </div>
    </header>
  );
}

export default Header;