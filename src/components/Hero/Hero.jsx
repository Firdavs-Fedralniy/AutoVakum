import { useEffect, useRef, useState } from "react";
import { getHeroSlides } from "../../services/heroSlidesApi";
import { useLanguage } from "../../context/languageContext";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Hero.css";

function Hero() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const videoRefs = useRef([]);

  useEffect(() => {
    async function loadSlides() {
      try {
        const data = await getHeroSlides();

        console.log("Hero slides:", data);

        setSlides(data || []);
      } catch (error) {
        console.error("Hero error:", error);
        setSlides([]);
      } finally {
        setIsLoading(false);
      }
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
    <section
      ref={sectionRef}
      className="hero"
    >
      <div className="hero__inner">

        <div className="hero__content">

          <div className="hero__label">
            <span />
            {t.hero.label}
          </div>

          <h1 className="hero__title">
            {t.hero.title1}
            <br />

            <strong>{t.hero.title2}</strong>

            <br />

            {t.hero.title3}
          </h1>

          <p className="hero__description">
            {t.hero.description}
          </p>

          <div className="hero__buttons">

            <a
              href="#contacts"
              className="hero__button hero__button--primary"
            >
              {t.hero.order}
            </a>

            <a
              href="#gallery"
              className="hero__button hero__button--secondary"
            >
              {t.hero.works}
            </a>

          </div>

          <div className="hero__stats">

            <div className="hero__stat">
              <strong>5000+</strong>
              <span>{t.hero.cars}</span>
            </div>

            <div className="hero__stat">
              <strong>7</strong>
              <span>{t.hero.experience}</span>
            </div>

            <div className="hero__stat">
              <strong>100%</strong>
              <span>{t.hero.quality}</span>
            </div>

          </div>
        </div>

        <div className="hero__visual">

          {isLoading ? (
            <div className="hero__placeholder">
              <span>{t.hero.loading}</span>
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
                      alt={t.gallery.image}
                    />
                  )}
                </div>
              ))}

              <button
                type="button"
                className="hero__arrow hero__arrow--left"
                onClick={prevSlide}
                aria-label={t.hero.previous}
              >
                ←
              </button>

              <button
                type="button"
                className="hero__arrow hero__arrow--right"
                onClick={nextSlide}
                aria-label={t.hero.next}
              >
                →
              </button>

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
                    aria-label={`${index + 1}`}
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

          <div className="hero__card hero__card--top">
            <div className="hero__card-icon">
              ✓
            </div>

            <div className="hero__card-content">
              <strong>{t.hero.professional}</strong>

              <span>{t.hero.forCar}</span>
            </div>
          </div>

          <div className="hero__card hero__card--bottom">
            <div className="hero__card-icon">
              ★
            </div>

            <div className="hero__card-content">
              <strong>{t.hero.result}</strong>

              <span>{t.hero.attention}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__ticker">
        <div className="hero__ticker-track">
          {t.hero.ticker.map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <b>•</b>
            </span>
          ))}

          {t.hero.ticker.map((item, index) => (
            <span key={`copy-${item}-${index}`}>
              {item}
              <b>•</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;