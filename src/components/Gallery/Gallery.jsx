import {  useEffect, useState } from "react";
import { getGallery } from "../../services/galleryApi";
import "./Gallery.css";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [gallery, setGallery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const refSection = useScrollAnimation()

  useEffect(() => {
    async function loadGallery() {
      setLoading(true);

      const data = await getGallery();
      

      console.log("Gallery:", data);

      setItems(data);
      setLoading(false);
    }

    loadGallery();
  }, []);

  function openGallery(index) {
    const images = items
      .map((item) => item.media_url)
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
      <section ref={refSection} className="gallery-section" id="gallery">

        <div className="gallery-header">
          <span className="gallery-eyebrow">
            GALEREYA
          </span>

          <h2 className="gallery-title">
            Ishlarimizdan lavhalar
          </h2>

          <p className="gallery-description">
            Avtomobillarga qilgan ishlarimizdan eng yaxshi
            lavhalarni ko‘ring.
          </p>
        </div>

        {loading && (
          <div className="gallery-status">
            Yuklanmoqda...
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="gallery-status">
            Hozircha galereya bo‘sh.
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="gallery-table">

            <div className="gallery-table-surface">

              {items.slice(0,4).map((item, index) => (
                <div
                  key={item.id}
                  className="gallery-item"
                  onClick={() => openGallery(index)}
                >
                  <img
                    src={item.image_url}
                    alt="Avto vakuum"
                    loading="lazy"
                  />
                </div>
              ))}

            </div>

          </div>
        )}

      </section>


      {/* FULLSCREEN */}

      {gallery.length > 0 && (
        <div
          className="gallery-modal"
          onClick={closeGallery}
        >

          <button
            className="gallery-close"
            onClick={closeGallery}
            type="button"
          >
            ×
          </button>

          <button
            className="gallery-arrow gallery-arrow-left"
            onClick={prevImage}
            type="button"
          >
            ←
          </button>

          <div
            className="gallery-modal-media"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[currentIndex]}
              alt="Galereya"
            />
          </div>

          <button
            className="gallery-arrow gallery-arrow-right"
            onClick={nextImage}
            type="button"
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