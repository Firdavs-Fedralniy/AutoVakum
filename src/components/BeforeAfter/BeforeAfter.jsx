import { useEffect,  useState } from "react";
import { getBeforeAfter } from "../../services/beforeAfterApi";
import "./BeforeAfter.css";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

function WorkCard({ item, onOpen }) {
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
            alt="Oldin"
          />

          <span className="wc-badge wc-badge-before">
            OLDIN
          </span>
        </div>

        <div
          className="wc-half"
          onClick={() => onOpen(item.after_url)}
        >
          <img
            className="wc-img"
            src={item.after_url}
            alt="Keyin"
          />

          <span className="wc-badge wc-badge-after">
            KEYIN
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
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [gallery, setGallery] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const refSection = useScrollAnimation()

  useEffect(() => {
    async function loadItems() {
      setLoading(true);

      const data = await getBeforeAfter();

      setItems(data || []);
      setLoading(false);
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
      <section ref={refSection} className="wc-section" id="before-after">
        <div className="wc-eyebrow">
          ISHLARIMIZ
        </div>

        <h2 className="wc-heading">
          Oldin va keyin
        </h2>

        {loading && (
          <div className="wc-status">
            Yuklanmoqda...
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="wc-status">
            Hozircha ishlar qo'shilmagan.
          </div>
        )}

        <div className="wc-grid">
          {items.slice(0,3).map((item) => (
            <WorkCard
              key={item.id}
              item={item}
              onOpen={openGallery}
            />
          ))}
        </div>
      </section>

      {/* GALLERY */}

      {gallery.length > 0 && (
        <div
          className="wc-modal"
          onClick={closeGallery}
        >
          <button
            className="wc-modal-close"
            onClick={closeGallery}
          >
            ×
          </button>

          <button
            className="wc-modal-arrow wc-modal-arrow-left"
            onClick={prevImage}
          >
            ←
          </button>

          <img
            src={gallery[currentImage]}
            alt="Ish"
            className="wc-modal-img"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="wc-modal-arrow wc-modal-arrow-right"
            onClick={nextImage}
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