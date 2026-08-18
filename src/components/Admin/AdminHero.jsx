import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const BUCKET = "hero";

export default function AdminHero() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadHero();
  }, []);

  async function loadHero() {
    setLoading(true);

    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .order("position", { ascending: true });

    if (error) {
      console.error(error);
      alert(error.message);
      setLoading(false);
      return;
    }

    setItems(data || []);
    setLoading(false);
  }

  async function uploadMedia(file) {
    if (!file) return;

    const allowed =
      file.type.startsWith("image/") ||
      file.type.startsWith("video/");

    if (!allowed) {
      alert("Можно загружать только фото и видео.");
      return;
    }

    setUploading(true);

    try {
      const type = file.type.startsWith("video/")
        ? "video"
        : "image";

      const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName =
        `${crypto.randomUUID()}.${extension}`;

      const storagePath = `hero/${fileName}`;

      const { error: uploadError } =
        await supabase.storage
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

      const position = items.length
        ? Math.max(
            ...items.map(
              (item) => Number(item.position) || 0
            )
          ) + 1
        : 0;

      const { error: dbError } = await supabase
        .from("hero_slides")
        .insert({
          type,
          media_url: publicUrl,
          position,
        });

      if (dbError) {
        await supabase.storage
          .from(BUCKET)
          .remove([storagePath]);

        throw dbError;
      }

      await loadHero();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  function getStoragePath(url) {
    if (!url) return null;

    const marker =
      "/storage/v1/object/public/hero/";

    const index = url.indexOf(marker);

    if (index === -1) return null;

    return decodeURIComponent(
      url.slice(index + marker.length)
    );
  }

  async function deleteMedia(item) {
    if (!window.confirm("Удалить этот media?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("hero_slides")
        .delete()
        .eq("id", item.id);

      if (error) {
        throw error;
      }

      const path = getStoragePath(item.media_url);

      if (path) {
        await supabase.storage
          .from(BUCKET)
          .remove([path]);
      }

      await loadHero();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function moveItem(index, direction) {
    const target =
      direction === "up"
        ? index - 1
        : index + 1;

    if (
      target < 0 ||
      target >= items.length
    ) {
      return;
    }

    const current = items[index];
    const other = items[target];

    const { error: firstError } =
      await supabase
        .from("hero_slides")
        .update({
          position: other.position,
        })
        .eq("id", current.id);

    if (firstError) {
      alert(firstError.message);
      return;
    }

    const { error: secondError } =
      await supabase
        .from("hero_slides")
        .update({
          position: current.position,
        })
        .eq("id", other.id);

    if (secondError) {
      alert(secondError.message);
      return;
    }

    await loadHero();
  }

  if (loading) {
    return (
      <div className="admin-status">
        Загрузка Hero...
      </div>
    );
  }

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2>Hero</h2>
          <p>
            Фото и видео первого экрана.
          </p>
        </div>

        <label className="admin-upload-button">
          {uploading
            ? "Загрузка..."
            : "+ Добавить media"}

          <input
            type="file"
            accept="image/*,video/*"
            hidden
            disabled={uploading}
            onChange={(e) => {
              uploadMedia(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </label>
      </div>

      <div className="admin-list">
        {items.map((item, index) => (
          <div
            className="admin-media-row"
            key={item.id}
          >
            <div className="admin-media-preview">
              {item.type === "video" ? (
                <video
                  src={item.media_url}
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={item.media_url}
                  alt=""
                />
              )}
            </div>

            <div className="admin-media-info">
              <strong>
                {item.type}
              </strong>

              <span>
                Позиция: {item.position}
              </span>
            </div>

            <div className="admin-row-actions">
              <button
                type="button"
                disabled={index === 0}
                onClick={() =>
                  moveItem(index, "up")
                }
              >
                ↑
              </button>

              <button
                type="button"
                disabled={
                  index === items.length - 1
                }
                onClick={() =>
                  moveItem(index, "down")
                }
              >
                ↓
              </button>

              <button
                type="button"
                className="danger"
                onClick={() =>
                  deleteMedia(item)
                }
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}