import { useEffect, useState } from "react";
import { getBeforeAfter } from "../../services/beforeAfterApi";
import { useLanguage } from "../../context/languageContext";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./BeforeAfter.css";

function WorkCard({ item, onOpen }) {
  const { t } = useLanguage();

  return (
    <div className="wc-card">
      <div className="wc-images">

        <div
          className="wc-half"
          onClick={() => onOpen(item.before_url)}
        >
          <img
            className="wc-img"
            src={item.before_url}
            alt={t.beforeAfter.before}
          />

          <span className="wc-badge wc-badge-before">
            {t.beforeAfter.before}
          </span>
        </div>

        <div
          className="wc-half"
          onClick={() => onOpen(item.after_url)}
        >
          <img
            className="wc-img"
            src={item.after_url}
            alt={t.beforeAfter.after}
          />

          <span className="wc-badge wc-badge-after">
            {t.beforeAfter.after}
          </span>
        </div>
      </div>

      <div className="wc-footer">
        <span className="wc-title">
          {item.title}
        </span>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [gallery, setGallery] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    async function loadItems() {
      try {
        setLoading(true);

        const data = await getBeforeAfter();

        console.log("Before After:", data);

        setItems(data || []);
      } catch (error) {
        console.error("Before After error:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, []);

  function openGallery(url) {
    const images = [];

    items.forEach((item) => {
      if (item.before_url) {
        images.push(item.before_url);
      }

      if (item.after_url) {
        images.push(item.after_url);
      }
    });

    const index = images.indexOf(url);

    setGallery(images);
    setCurrentImage(index >= 0 ? index : 0);
  }

  function closeGallery() {
    setGallery([]);
  }

  function nextImage(e) {
    e?.stopPropagation();

    setCurrentImage((prev) =>
      prev >= gallery.length - 1 ? 0 : prev + 1
    );
  }

  function prevImage(e) {
    e?.stopPropagation();

    setCurrentImage((prev) =>
      prev <= 0 ? gallery.length - 1 : prev - 1
    );
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="wc-section"
        id="ishlarimiz"
      >
        <div className="wc-eyebrow">
          {t.beforeAfter.eyebrow}
        </div>

        <h2 className="wc-heading">
          {t.beforeAfter.title}
        </h2>

        {loading && (
          <div className="wc-status">
            {t.beforeAfter.loading}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="wc-status">
            {t.beforeAfter.empty}
          </div>
        )}

        <div className="wc-grid">
          {items.map((item) => (
            <WorkCard
              key={item.id}
              item={item}
              onOpen={openGallery}
            />
          ))}
        </div>
      </section>

      {gallery.length > 0 && (
        <div
          className="wc-modal"
          onClick={closeGallery}
        >
          <button
            className="wc-modal-close"
            onClick={closeGallery}
            type="button"
            aria-label={t.beforeAfter.close}
          >
            ×
          </button>

          <button
            className="wc-modal-arrow wc-modal-arrow-left"
            onClick={prevImage}
            type="button"
            aria-label={t.beforeAfter.previous}
          >
            ←
          </button>

          <img
            src={gallery[currentImage]}
            alt={t.beforeAfter.image}
            className="wc-modal-img"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="wc-modal-arrow wc-modal-arrow-right"
            onClick={nextImage}
            type="button"
            aria-label={t.beforeAfter.next}
          >
            →
          </button>

          <div className="wc-modal-counter">
            {currentImage + 1} / {gallery.length}
          </div>
        </div>
      )}
    </>
  );
}