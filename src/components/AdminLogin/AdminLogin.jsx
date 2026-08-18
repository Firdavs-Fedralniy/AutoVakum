import { useEffect,  useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 useEffect(() => {
  function openAdmin() {
    setError("");
    setIsOpen(true);
  }

  function handleEscape(e) {
    if (e.key === "Escape") {
      closeModal();
    }
  }

  window.addEventListener(
    "open-admin-login",
    openAdmin
  );

  window.addEventListener(
    "keydown",
    handleEscape
  );

  return () => {
    window.removeEventListener(
      "open-admin-login",
      openAdmin
    );

    window.removeEventListener(
      "keydown",
      handleEscape
    );
  };
}, [loading]);


  async function handleLogin(e) {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError("Введите email и пароль");
      return;
    }

    setLoading(true);
    setError("");

    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (loginError) {
      console.error("Login error:", loginError);

      setError("Неверный email или пароль");
      setLoading(false);

      return;
    }

    setLoading(false);

    setIsOpen(false);

    navigate("/admin");
  }

  function closeModal() {
    if (loading) return;

    setIsOpen(false);
    setError("");
    setPassword("");
  }

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [loading]);

  return (
    <>
      {/* Скрытая область-кнопка */}

      <button
        type="button"
  
        aria-label="Admin"
      />

      {/* LOGIN */}

      {isOpen && (
        <div
          className="admin-login-overlay"
          onClick={closeModal}
        >
          <div
            className="admin-login"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="admin-login-close"
              onClick={closeModal}
              disabled={loading}
            >
              ×
            </button>

            <div className="admin-login-header">
              <span>ADMIN</span>

              <h2>
                Вход в панель
              </h2>

              <p>
                Введите данные администратора
              </p>
            </div>

            <form
              className="admin-login-form"
              onSubmit={handleLogin}
            >
              <label>
                Email

                <input
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                Пароль

                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                  required
                />
              </label>

              {error && (
                <div className="admin-login-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="admin-login-submit"
                disabled={loading}
              >
                {loading
                  ? "ВХОД..."
                  : "ВОЙТИ"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}