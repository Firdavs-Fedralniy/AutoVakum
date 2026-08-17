
import { useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Contacts.css";

export default function Contacts() {
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
      {/* TOP */}

      <div className="contacts-container">

        <div className="contacts-header">
          <span className="contacts-eyebrow">
            BOG‘LANISH
          </span>

          <h2 className="contacts-title">
            Biz bilan bog‘laning
          </h2>

          <p className="contacts-description">
            Avtomobilingiz uchun professional xizmat kerakmi?
            Biz bilan bog‘laning va barcha savollaringizga javob oling.
          </p>
        </div>


        <div className="contacts-content">

          {/* CONTACTS */}

          <div className="contacts-info">

            <div className="contact-item">
              <div className="contact-icon">
                ☎
              </div>

              <div>
                <span>Telefon</span>
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
                <span>Manzil</span>
                <strong>
                  Toshkent shahri
                </strong>
              </div>
            </div>


            <div className="contact-item">
              <div className="contact-icon">
                ✈
              </div>

              <div>
                <span>Instagram</span>
                <a href="https://www.instagram.com/akbarr_vakumm?igsh=MWY1dmFqZDI3bnJ5bg==">
                  akbarr_vakumm
                </a>
              </div>
            </div>


            <div className="contact-item">
              <div className="contact-icon">
                ◷
              </div>

              <div>
                <span>Ish vaqti</span>
                <strong>
                  Har kuni 09:00 — 21:00
                </strong>
              </div>
            </div>

          </div>


          {/* FORM */}

          <div className="contacts-form-wrapper">

            <div className="contacts-form-header">
              <span>
                BUYURTMA
              </span>

              <h3>
                Raqamingizni qoldiring
              </h3>

              <p>
                Biz siz bilan bog‘lanamiz va xizmat haqida
                batafsil ma’lumot beramiz.
              </p>
            </div>


            <form
              className="contacts-form"
              onSubmit={handleSubmit}
            >
              <input
                type="tel"
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <button type="submit">
                {sent
                  ? "Yuborildi ✓"
                  : "Menga qo‘ng‘iroq qiling"}
              </button>
            </form>

            {sent && (
              <p className="contacts-success">
                Rahmat! Tez orada siz bilan bog‘lanamiz.
              </p>
            )}

          </div>

        </div>

      </div>


      {/* MAP */}

      <div className="contacts-map">

        <iframe
          title="Bizning manzil"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2999.6098416208993!2d69.2926487!3d41.252055899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae5f003747260b%3A0xa533b202c34aa293!2sArsen%20Servis!5e0!3m2!1sen!2s!4v1786997417721!5m2!1sen!2s"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

      </div>

    </section>
  );
}



