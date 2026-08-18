import { useState } from "react";
import { useLanguage } from "../../context/languageContext";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Contacts.css";

export default function Contacts() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!phone.trim()) return;

    setSent(true);
    setPhone("");
  }

  return (
    <section
      ref={sectionRef}
      className="contacts-section"
      id="contacts"
    >
      <div className="contacts-container">

        <div className="contacts-header">
          <span className="contacts-eyebrow">
            {t.contacts.eyebrow}
          </span>

          <h2 className="contacts-title">
            {t.contacts.title}
          </h2>

          <p className="contacts-description">
            {t.contacts.description}
          </p>
        </div>

        <div className="contacts-content">

          <div className="contacts-info">

            <div className="contact-item">
              <div className="contact-icon">
                ☎
              </div>

              <div>
                <span>{t.contacts.phone}</span>

                <a href="tel:+998901234567">
                  +998 90 123 45 67
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                📍
              </div>

              <div>
                <span>{t.contacts.address}</span>

                <strong>
                  {t.contacts.city}
                </strong>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                ✈
              </div>

              <div>
                <span>{t.contacts.telegram}</span>

                <a href="#">
                  @avtovakuum
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                ◷
              </div>

              <div>
                <span>
                  {t.contacts.workingHours}
                </span>

                <strong>
                  {t.contacts.hours}
                </strong>
              </div>
            </div>

          </div>

          <div className="contacts-form-wrapper">

            <div className="contacts-form-header">
              <span>
                {t.contacts.formLabel}
              </span>

              <h3>
                {t.contacts.formTitle}
              </h3>

              <p>
                {t.contacts.formDescription}
              </p>
            </div>

            <form
              className="contacts-form"
              onSubmit={handleSubmit}
            >
              <input
                type="tel"
                placeholder={t.contacts.phonePlaceholder}
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                required
              />

              <button type="submit">
                {sent
                  ? t.contacts.sent
                  : t.contacts.submit}
              </button>
            </form>

            {sent && (
              <p className="contacts-success">
                {t.contacts.success}
              </p>
            )}

          </div>
        </div>
      </div>

      <div className="contacts-map">
        <iframe
          title={t.contacts.map}
          src="https://www.google.com/maps?q=Tashkent,Uzbekistan&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}