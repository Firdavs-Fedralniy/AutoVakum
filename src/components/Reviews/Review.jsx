import { useEffect, useState } from "react";
import {
  getReviews,
  createReview,
} from "../../services/reviewsApi";
import { useLanguage } from "../../context/languageContext";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Reviews.css";

function ReviewCard({ review, active = false }) {
  const { t } = useLanguage();

  return (
    <article
      className={
        active
          ? "review-card review-card--active"
          : "review-card"
      }
    >
      <p className="review-text">
        “{review.text}”
      </p>

      <div className="review-author">
        <strong>{review.name}</strong>

        <span>
          {t.reviews.client}
        </span>
      </div>
    </article>
  );
}

export default function Reviews() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    async function loadReviews() {
      try {
        setLoading(true);

        const data = await getReviews();

        console.log("Reviews:", data);

        setReviews(data || []);
      } catch (error) {
        console.error("Reviews error:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, []);

  function nextReview() {
    if (!reviews.length) return;

    setCurrentIndex((prev) =>
      prev >= reviews.length - 1 ? 0 : prev + 1
    );
  }

  function prevReview() {
    if (!reviews.length) return;

    setCurrentIndex((prev) =>
      prev <= 0 ? reviews.length - 1 : prev - 1
    );
  }

  function getReview(offset) {
    if (!reviews.length) return null;

    const index =
      (currentIndex + offset + reviews.length) %
      reviews.length;

    return reviews[index];
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanText = text.trim();

    if (!cleanName || !cleanText) return;

    setSending(true);

    const newReview = await createReview(
      cleanName,
      cleanText
    );

    if (newReview) {
      setReviews((prev) => [newReview, ...prev]);
      setCurrentIndex(0);
      setName("");
      setText("");
    }

    setSending(false);
  }

  return (
    <section
      ref={sectionRef}
      className="reviews-section"
      id="reviews"
    >
      <div className="reviews-header">
        <span className="reviews-eyebrow">
          {t.reviews.eyebrow}
        </span>

        <h2 className="reviews-title">
          {t.reviews.title}
        </h2>

        <p className="reviews-description">
          {t.reviews.description}
        </p>
      </div>

      {loading && (
        <div className="reviews-status">
          {t.reviews.loading}
        </div>
      )}

      {!loading && reviews.length === 0 && (
        <div className="reviews-status">
          {t.reviews.empty}
        </div>
      )}

      {!loading && reviews.length > 0 && (
        <>
          <div className="reviews-carousel">

            {reviews.length > 1 && (
              <div
                className="review-side review-side--left"
                onClick={prevReview}
              >
                <ReviewCard
                  review={getReview(-1)}
                />
              </div>
            )}

            <div className="review-center">
              <ReviewCard
                review={reviews[currentIndex]}
                active
              />
            </div>

            {reviews.length > 1 && (
              <div
                className="review-side review-side--right"
                onClick={nextReview}
              >
                <ReviewCard
                  review={getReview(1)}
                />
              </div>
            )}

            {reviews.length > 1 && (
              <>
                <button
                  type="button"
                  className="reviews-arrow reviews-arrow--left"
                  onClick={prevReview}
                  aria-label="Previous"
                >
                  ←
                </button>

                <button
                  type="button"
                  className="reviews-arrow reviews-arrow--right"
                  onClick={nextReview}
                  aria-label="Next"
                >
                  →
                </button>
              </>
            )}
          </div>

          {reviews.length > 1 && (
            <div className="reviews-dots">
              {reviews.map((review, index) => (
                <button
                  key={review.id}
                  type="button"
                  className={`reviews-dot ${
                    index === currentIndex
                      ? "reviews-dot--active"
                      : ""
                  }`}
                  onClick={() =>
                    setCurrentIndex(index)
                  }
                  aria-label={`${index + 1}`}
                />
              ))}
            </div>
          )}
        </>
      )}

      <div className="review-form-wrapper">

        <div className="review-form-header">
          <span>
            {t.reviews.formLabel}
          </span>

          <h3>
            {t.reviews.formTitle}
          </h3>

          <p>
            {t.reviews.formDescription}
          </p>
        </div>

        <form
          className="review-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder={t.reviews.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            required
          />

          <textarea
            placeholder={t.reviews.textPlaceholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={1000}
            rows={5}
            required
          />

          <button
            type="submit"
            disabled={sending}
          >
            {sending
              ? t.reviews.sending
              : t.reviews.submit}
          </button>
        </form>
      </div>
    </section>
  );
}