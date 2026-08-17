
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        <div className="footer__brand">
          <a href="#" className="footer__logo">
            AVTO <span>VAKUM</span>
          </a>

          <p>
            Professional avtomobil tozalash va detailing xizmatlari.
          </p>
        </div>


        <div className="footer__links">
          <span className="footer__title">
            NAVIGATSIYA
          </span>

          <a href="#ishlarimiz">
            Oldin va keyin
          </a>

          <a href="#gallery">
            Galereya
          </a>

          <a href="#reviews">
            Sharhlar
          </a>

          <a href="#contacts">
            Kontaktlar
          </a>
        </div>


        <div className="footer__contact">
          <span className="footer__title">
            BOG‘LANISH
          </span>

          <a href="tel:+998901234567">
            +998 90 123 45 67
          </a>

          <span>
            Toshkent shahri
          </span>

          <a
            href="https://www.instagram.com/akbarr_vakumm/"
            target="_blank"
            rel="noreferrer"
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
          Barcha huquqlar himoyalangan
        </span>
      </div>
    </footer>
  );
}
