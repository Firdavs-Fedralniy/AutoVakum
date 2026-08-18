import { useEffect, useState } from "react";
import { getGallery } from "../../services/galleryApi";
import { useLanguage } from "../../context/languageContext";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import "./Gallery.css";

export default function Gallery() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [gallery, setGallery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadGallery() {
      try {
        setLoading(true);

        const data = await getGallery();

        console.log("Gallery:", data);

        setItems(data || []);
      } catch (error) {
        console.error("Gallery error:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  function openGallery(index) {
    const images = items
      .map((item) => item.image_url)
      .filter(Boolean);

    setGallery(images);
    setCurrentIndex(index);
  }

  function closeGallery() {
    setGallery([]);
  }

  function nextImage(e) {
    e?.stopPropagation();

    setCurrentIndex((prev) =>
      prev >= gallery.length - 1 ? 0 : prev + 1
    );
  }

  function prevImage(e) {
    e?.stopPropagation();

    setCurrentIndex((prev) =>
      prev <= 0 ? gallery.length - 1 : prev - 1
    );
  }

  useEffect(() => {
    function handleKeyboard(e) {
      if (!gallery.length) return;

      if (e.key === "Escape") {
        closeGallery();
      }

      if (e.key === "ArrowRight") {
        nextImage();
      }

      if (e.key === "ArrowLeft") {
        prevImage();
      }
    }

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [gallery.length]);

  return (
    <>
      <section
        ref={sectionRef}
        className="gallery-section"
        id="gallery"
      >
        <div className="gallery-header">
          <span className="gallery-eyebrow">
            {t.gallery.eyebrow}
          </span>

          <h2 className="gallery-title">
            {t.gallery.title}
          </h2>

          <p className="gallery-description">
            {t.gallery.description}
          </p>
        </div>

        {loading && (
          <div className="gallery-status">
            {t.gallery.loading}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="gallery-status">
            {t.gallery.empty}
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="gallery-table">
            <div className="gallery-table-surface">

              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="gallery-item"
                  onClick={() => openGallery(index)}
                >
                  <img
                    src={item.image_url}
                    alt={t.gallery.image}
                    loading="lazy"
                  />
                </div>
              ))}

            </div>
          </div>
        )}
      </section>

      {gallery.length > 0 && (
        <div
          className="gallery-modal"
          onClick={closeGallery}
        >
          <button
            className="gallery-close"
            onClick={closeGallery}
            type="button"
            aria-label={t.gallery.close}
          >
            ×
          </button>

          <button
            className="gallery-arrow gallery-arrow-left"
            onClick={prevImage}
            type="button"
            aria-label={t.gallery.previous}
          >
            ←
          </button>

          <div
            className="gallery-modal-media"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[currentIndex]}
              alt={t.gallery.image}
            />
          </div>

          <button
            className="gallery-arrow gallery-arrow-right"
            onClick={nextImage}
            type="button"
            aria-label={t.gallery.next}
          >
            →
          </button>

          <div className="gallery-counter">
            {currentIndex + 1} / {gallery.length}
          </div>
        </div>
      )}
    </>
  );
}