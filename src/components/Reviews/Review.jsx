
import { useEffect, useRef, useState } from "react";
import {
  getReviews,
  createReview,
} from "../../services/reviewsApi";
import "./Reviews.css";

function ReviewCard({ review, active = false }) {
  return (
    <article
      className={`review-card ${
        active ? "review-card--active" : ""
      }`}
    >
      <p className="review-text">
        “{review.text}”
      </p>

      <div className="review-author">
        <strong>{review.name}</strong>
        <span>Mamnun mijoz</span>
      </div>
    </article>
  );
}

export default function Reviews() {
    const sectionRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    async function loadReviews() {
      const data = await getReviews();

      console.log("Reviews:", data);

      setReviews(data);
      setLoading(false);
    }

    loadReviews();
  }, []);

  function nextReview() {
    setCurrentIndex((prev) =>
      prev >= reviews.length - 1 ? 0 : prev + 1
    );
  }

  function prevReview() {
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

    if (!name.trim() || !text.trim()) return;

    setSending(true);

    const newReview = await createReview(
      name.trim(),
      text.trim()
    );

    if (newReview) {
      setReviews((prev) => [newReview, ...prev]);

      setCurrentIndex(0);

      setName("");
      setText("");
    }

    setSending(false);

  }



  useEffect(() => {
  const section = sectionRef.current;

  if (!section) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add("reviews-visible");
      } else {
        section.classList.remove("reviews-visible");
      }
    },
    {
      threshold: 0.15,
    }
  );

  observer.observe(section);

  return () => observer.disconnect();
}, []);

  return (
    <section ref={sectionRef} className="reviews-section" id="reviews">

      <div className="reviews-header">
        <span className="reviews-eyebrow">
          MIJOZLAR FIKRI
        </span>

        <h2 className="reviews-title">
          Mijozlarimiz nima deydi?
        </h2>

        <p className="reviews-description">
          Bizning xizmatimizdan foydalangan mijozlarning
          fikrlari.
        </p>
      </div>


      {loading && (
        <div className="reviews-status">
          Yuklanmoqda...
        </div>
      )}


      {!loading && reviews.length === 0 && (
        <div className="reviews-status">
          Hozircha sharhlar yo‘q.
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
                <ReviewCard review={getReview(-1)} />
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
                <ReviewCard review={getReview(1)} />
              </div>
            )}


            {reviews.length > 1 && (
              <>
                <button
                  type="button"
                  className="reviews-arrow reviews-arrow--left"
                  onClick={prevReview}
                >
                  ←
                </button>

                <button
                  type="button"
                  className="reviews-arrow reviews-arrow--right"
                  onClick={nextReview}
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
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}
        </>
      )}


      {/* ФОРМА */}

      <div className="review-form-wrapper">

        <div className="review-form-header">
          <span>FIKRINGIZNI BILDIRING</span>

          <h3>
            Xizmatimiz sizga yoqdimi?
          </h3>

          <p>
            O‘z fikringizni biz bilan baham ko‘ring.
          </p>
        </div>


        <form
          className="review-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Ismingiz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            required
          />

          <textarea
            placeholder="Fikringizni yozing..."
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
              ? "YUBORILMOQDA..."
              : "FIKR QOLDIRISH"}
          </button>

        </form>

      </div>

    </section>
  );
}