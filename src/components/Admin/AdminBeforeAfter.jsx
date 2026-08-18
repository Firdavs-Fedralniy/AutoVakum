import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const BUCKET = "beforeafter";

export default function AdminBeforeAfter() {
  const [items, setItems] = useState([]);

  const [title, setTitle] = useState("");
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);

    const { data, error } = await supabase
      .from("before_after")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert(error.message);
      setLoading(false);
      return;
    }

    setItems(data || []);
    setLoading(false);
  }

  async function uploadImage(file, folder) {
    const extension =
      file.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName =
      `${crypto.randomUUID()}.${extension}`;

    const storagePath =
      `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath);

    return {
      publicUrl,
      storagePath,
    };
  }

  async function addWork(e) {
    e.preventDefault();

    if (
      !title.trim() ||
      !beforeFile ||
      !afterFile
    ) {
      alert(
        "Заполни название и выбери две фотографии."
      );
      return;
    }

    setSaving(true);

    let before = null;
    let after = null;

    try {
      before = await uploadImage(
        beforeFile,
        "before"
      );

      after = await uploadImage(
        afterFile,
        "after"
      );

      const { error } = await supabase
        .from("before_after")
        .insert({
          title: title.trim(),
          before_url: before.publicUrl,
          after_url: after.publicUrl,
        });

      if (error) {
        throw error;
      }

      setTitle("");
      setBeforeFile(null);
      setAfterFile(null);

      await loadItems();
    } catch (error) {
      console.error(error);

      if (before?.storagePath) {
        await supabase.storage
          .from(BUCKET)
          .remove([before.storagePath]);
      }

      if (after?.storagePath) {
        await supabase.storage
          .from(BUCKET)
          .remove([after.storagePath]);
      }

      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  function getStoragePath(url) {
    if (!url) return null;

    const marker =
      "/storage/v1/object/public/beforeafter/";

    const index = url.indexOf(marker);

    if (index === -1) return null;

    return decodeURIComponent(
      url.slice(index + marker.length)
    );
  }

  async function deleteWork(item) {
    if (!window.confirm("Удалить эту работу?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("before_after")
        .delete()
        .eq("id", item.id);

      if (error) {
        throw error;
      }

      const paths = [
        getStoragePath(item.before_url),
        getStoragePath(item.after_url),
      ].filter(Boolean);

      if (paths.length) {
        await supabase.storage
          .from(BUCKET)
          .remove(paths);
      }

      setItems((prev) =>
        prev.filter((work) => work.id !== item.id)
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  if (loading) {
    return (
      <div className="admin-status">
        Загрузка Before / After...
      </div>
    );
  }

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2>Before / After</h2>
          <p>
            Добавляй пару фотографий с названием работы.
          </p>
        </div>
      </div>

      <form
        className="admin-form-card"
        onSubmit={addWork}
      >
        <input
          type="text"
          placeholder="Название работы"
          value={title}
          maxLength={100}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <label className="file-input">
          <span>
            {beforeFile
              ? beforeFile.name
              : "Выбрать BEFORE"}
          </span>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setBeforeFile(
                e.target.files?.[0] || null
              )
            }
          />
        </label>

        <label className="file-input">
          <span>
            {afterFile
              ? afterFile.name
              : "Выбрать AFTER"}
          </span>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setAfterFile(
                e.target.files?.[0] || null
              )
            }
          />
        </label>

        <button
          type="submit"
          className="admin-primary"
          disabled={saving}
        >
          {saving
            ? "Добавление..."
            : "Добавить работу"}
        </button>
      </form>

      <div className="admin-before-grid">
        {items.map((item) => (
          <div
            className="admin-before-card"
            key={item.id}
          >
            <div className="admin-before-images">
              <div>
                <img
                  src={item.before_url}
                  alt="Before"
                />

                <span>BEFORE</span>
              </div>

              <div>
                <img
                  src={item.after_url}
                  alt="After"
                />

                <span>AFTER</span>
              </div>
            </div>

            <div className="admin-card-footer">
              <strong>
                {item.title}
              </strong>

              <button
                type="button"
                className="danger"
                onClick={() =>
                  deleteWork(item)
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