import { useEffect, useState } from "react";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

export default function AdminUsers() {
  const [items, setItems] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAdmins();
  }, []);

  async function loadAdmins() {
    setLoading(true);

    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      console.error("LOAD ADMINS ERROR:", error);
      alert(error.message);
      setLoading(false);
      return;
    }

    setItems(data || []);
    setLoading(false);
  }

  async function addAdmin(e) {
    e.preventDefault();

  const cleanEmail = email.trim();

  if (!cleanEmail) {
    alert("Введите email.");
    return;
  }

  if (password.length < 6) {
    alert("Пароль должен содержать минимум 6 символов.");
    return;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("SESSION:", session);
  console.log("ACCESS TOKEN:", session?.access_token);

  setSaving(true);

    try {
      const { data, error } =
        await supabase.functions.invoke(
          "bright-handler",
          {
            body: {
              email: cleanEmail,
              password,
            },
          }
        );

      if (error) {
        if (error instanceof FunctionsHttpError) {
          const responseBody =
            await error.context.json();

          console.error(
            "FUNCTION STATUS:",
            error.context.status
          );

          console.error(
            "FUNCTION BODY:",
            responseBody
          );

          throw new Error(
            responseBody?.error ||
              `Ошибка функции: ${error.context.status}`
          );
        }

        throw error;
      }

      console.log("FUNCTION SUCCESS:", data);

      if (!data?.ok) {
        throw new Error(
          data?.error ||
            "Администратор не был создан."
        );
      }

      setEmail("");
      setPassword("");

      await loadAdmins();

      alert("Администратор успешно создан.");
    } catch (error) {
      console.error(
        "CREATE ADMIN ERROR:",
        error
      );

      alert(
        error?.message ||
          "Не удалось создать администратора."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="admin-section">
      <div className="admin-section-head">
        <div>
          <h2>Admins</h2>

          <p>
            Добавление новых администраторов.
          </p>
        </div>
      </div>

      <form
        className="admin-form-card"
        onSubmit={addAdmin}
      >
        <input
          type="email"
          placeholder="admin@gmail.com"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Пароль минимум 6 символов"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          minLength={6}
          required
        />

        <button
          type="submit"
          className="admin-primary"
          disabled={saving}
        >
          {saving
            ? "Создание..."
            : "Добавить администратора"}
        </button>
      </form>

      {loading ? (
        <div className="admin-status">
          Загрузка администраторов...
        </div>
      ) : (
        <div className="admin-review-list">
          {items.map((item) => (
            <div
              className="admin-review-card"
              key={item.user_id}
            >
              <div>
                <strong>
                  {item.email}
                </strong>

                <p>
                  Administrator
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}