import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminReviews() {
  const [items, setItems] = useState([]);

  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    setLoading(true);

    const { data, error } = await supabase
      .from("reviews")
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

  async function addReview(e) {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanText = text.trim();

    if (!cleanName || !cleanText) {
      alert("Заполни имя и текст.");
      return;
    }

    setSaving(true);

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        name: cleanName,
        text: cleanText,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      alert(error.message);
      setSaving(false);
      return;
    }

    setItems((prev) => [data, ...prev]);

    setName("");
    setText("");
    setSaving(false);
  }

  async function deleteReview(id) {
    if (!window.confirm("Удалить этот отзыв?")) {
      return;
    }

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  if (loading) {
    return (
      <div className="admin-status">
        Загрузка отзывов...
      </div>
    );
  }

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2>Reviews</h2>
          <p>
            Добавление и удаление отзывов.
          </p>
        </div>
      </div>

      <form
        className="admin-form-card"
        onSubmit={addReview}
      >
        <input
          type="text"
          placeholder="Имя клиента"
          value={name}
          maxLength={50}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Текст отзыва"
          value={text}
          maxLength={1000}
          rows={5}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          type="submit"
          className="admin-primary"
          disabled={saving}
        >
          {saving
            ? "Добавление..."
            : "Добавить отзыв"}
        </button>
      </form>

      <div className="admin-review-list">
        {items.map((item) => (
          <div
            className="admin-review-card"
            key={item.id}
          >
            <div>
              <strong>
                {item.name}
              </strong>

              <p>
                {item.text}
              </p>
            </div>

            <button
              type="button"
              className="danger"
              onClick={() =>
                deleteReview(item.id)
              }
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}