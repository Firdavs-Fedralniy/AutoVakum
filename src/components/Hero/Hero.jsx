import { useEffect, useRef, useState } from "react";
import { getHeroSlides } from "../../services/heroSlidesApi";
import "./Hero.css";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

function Hero() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const videoRefs = useRef([]);
  const sectionRef = useScrollAnimation();

useEffect(() => {
  async function loadSlides() {
    const data = await getHeroSlides();



    setSlides(data);
    setIsLoading(false);
  }

  loadSlides();
}, []);

  useEffect(() => {
    if (!slides.length) return;

    const current = slides[currentSlide];

    const duration =
      current?.type === "video" ? 8000 : 5000;

    const timer = setTimeout(() => {
      setCurrentSlide((prev) =>
        prev >= slides.length - 1 ? 0 : prev + 1
      );
    }, duration);

    return () => clearTimeout(timer);
  }, [currentSlide, slides]);

  // Запуск текущего видео
  useEffect(() => {
    if (!slides.length) return;

    const current = slides[currentSlide];

    if (current?.type !== "video") return;

    const video = videoRefs.current[currentSlide];

    if (video) {
      video.currentTime = 0;

      video.play().catch(() => {});
    }
  }, [currentSlide, slides]);

  function nextSlide() {
    if (!slides.length) return;

    setCurrentSlide((prev) =>
      prev >= slides.length - 1 ? 0 : prev + 1
    );
  }

  function prevSlide() {
    if (!slides.length) return;

    setCurrentSlide((prev) =>
      prev <= 0 ? slides.length - 1 : prev - 1
    );
  }

  return (
    <section ref={sectionRef} id="services" className="hero">
      <div className="hero__inner">

        {/* LEFT */}

        <div className="hero__content">

          <div className="hero__label">
            <span />
            PROFESSIONAL AVTO XIZMAT
          </div>

          <h1 className="hero__title">
            Avtomobilingizga
            <br />

            <strong>yangidek ko‘rinish</strong>

            <br />

            qaytaramiz
          </h1>

          <p className="hero__description">
            Avto vakuum, kimyoviy tozalash, polirovka,
            detailing va avtomobilingiz uchun boshqa
            professional xizmatlar.
          </p>

          <div className="hero__buttons">

            <a
              href="#contacts"
              className="hero__button hero__button--primary"
            >
              Buyurtma berish
            </a>

            <a
              href="https://www.instagram.com/akbarr_vakumm?igsh=MWY1dmFqZDI3bnJ5bg=="
              className="hero__button hero__button--secondary"
            >
              Ishlarimizni ko‘rish
            </a>

          </div>

          <div className="hero__stats">

            <div className="hero__stat">
              <strong>5000+</strong>
              <span>avtomobil</span>
            </div>

            <div className="hero__stat">
              <strong>7 yil</strong>
              <span>ish tajribasi</span>
            </div>

            <div className="hero__stat">
              <strong>100%</strong>
              <span>sifatli xizmat</span>
            </div>

          </div>

        </div>


        {/* RIGHT */}

        <div className="hero__visual">

          {isLoading ? (

            <div className="hero__placeholder">
              <span>YUKLANMOQDA...</span>
            </div>

          ) : slides.length > 0 ? (

            <div className="hero__slider">

              {slides.map((slide, index) => (

                <div
                  key={slide.id}
                  className={`hero__slide ${
                    index === currentSlide
                      ? "hero__slide--active"
                      : ""
                  }`}
                >

                  {slide.type === "video" ? (

                    <video
                      ref={(element) => {
                        videoRefs.current[index] = element;
                      }}
                      src={slide.media_url}
                      muted
                      playsInline
                      preload="metadata"
                    />

                  ) : (

                    <img
                      src={slide.media_url}
                      alt="Avtomobil"
                    />

                  )}

                </div>

              ))}


              {/* ARROWS */}

              <button
                type="button"
                className="hero__arrow hero__arrow--left"
                onClick={prevSlide}
                aria-label="Oldingi slayd"
              >
                ←
              </button>

              <button
                type="button"
                className="hero__arrow hero__arrow--right"
                onClick={nextSlide}
                aria-label="Keyingi slayd"
              >
                →
              </button>


              {/* DOTS */}

              <div className="hero__dots">

                {slides.map((slide, index) => (

                  <button
                    key={slide.id}
                    type="button"
                    className={`hero__dot ${
                      index === currentSlide
                        ? "hero__dot--active"
                        : ""
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Slayd ${index + 1}`}
                  />

                ))}

              </div>

            </div>

          ) : (

            <div className="hero__placeholder">
              <span>AVTO</span>
              <strong>VAKUUM</strong>
            </div>

          )}


          {/* TOP CARD */}

          <div className="hero__card hero__card--top">

            <div className="hero__card-icon">
              ✓
            </div>

            <div className="hero__card-content">

              <strong>
                Professional xizmat
              </strong>

              <span>
                Avtomobilingiz uchun
              </span>

            </div>

          </div>


          {/* BOTTOM CARD */}

          <div className="hero__card hero__card--bottom">

            <div className="hero__card-icon">
              ★
            </div>

            <div className="hero__card-content">

              <strong>
                Sifatli natija
              </strong>

              <span>
                Har bir detalga e'tibor
              </span>

            </div>

          </div>

        </div>

      </div>


  
    </section>
  );
}

export default Hero;