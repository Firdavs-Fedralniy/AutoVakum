import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const BUCKET = "gallery";

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    setLoading(true);

    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gallery:", error);
      alert(error.message);
      setLoading(false);
      return;
    }

    setItems(data || []);
    setLoading(false);
  }

  async function uploadImage(file) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Можно загружать только изображения.");
      return;
    }

    setUploading(true);

    try {
      const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName = `${crypto.randomUUID()}.${extension}`;
      const storagePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(storagePath);

      const { error: dbError } = await supabase
        .from("gallery")
        .insert({
          title: file.name,
          image_url: publicUrl,
        });

      if (dbError) {
        await supabase.storage
          .from(BUCKET)
          .remove([storagePath]);

        throw dbError;
      }

      await loadGallery();
    } catch (error) {
      console.error("Upload gallery:", error);
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  function getStoragePath(url) {
    if (!url) return null;

    const marker =
      "/storage/v1/object/public/gallery/";

    const index = url.indexOf(marker);

    if (index === -1) return null;

    return decodeURIComponent(
      url.slice(index + marker.length)
    );
  }

  async function deleteImage(item) {
    const confirmed = window.confirm(
      `Удалить "${item.title || "это фото"}"?`
    );

    if (!confirmed) return;

    try {
      const storagePath = getStoragePath(item.image_url);

      const { error: dbError } = await supabase
        .from("gallery")
        .delete()
        .eq("id", item.id);

      if (dbError) {
        throw dbError;
      }

      if (storagePath) {
        const { error: storageError } =
          await supabase.storage
            .from(BUCKET)
            .remove([storagePath]);

        if (storageError) {
          console.error(
            "Storage delete:",
            storageError
          );
        }
      }

      setItems((prev) =>
        prev.filter((image) => image.id !== item.id)
      );
    } catch (error) {
      console.error("Delete gallery:", error);
      alert(error.message);
    }
  }

  if (loading) {
    return (
      <div className="admin-status">
        Загрузка Gallery...
      </div>
    );
  }

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2>Gallery</h2>
          <p>
            Добавляй и удаляй фотографии галереи.
          </p>
        </div>

        <label className="admin-upload-button">
          {uploading
            ? "Загрузка..."
            : "+ Добавить фото"}

          <input
            type="file"
            accept="image/*"
            hidden
            disabled={uploading}
            onChange={(e) => {
              uploadImage(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </label>
      </div>

      {items.length === 0 ? (
        <div className="admin-status">
          Галерея пока пустая.
        </div>
      ) : (
        <div className="admin-gallery-grid">
          {items.map((item) => (
            <div
              className="admin-gallery-card"
              key={item.id}
            >
              <img
                src={item.image_url}
                alt={item.title || "Gallery"}
              />

              <button
                type="button"
                className="admin-gallery-delete"
                onClick={() => deleteImage(item)}
                title="Удалить"
              >
                ×
              </button>

              <div className="admin-gallery-title">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}