import { useEffect, useState } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    // Если тема уже сохранена — используем её
    if (savedTheme) {
      return savedTheme === "dark";
    }

    // По умолчанию DARK
    return true;
  });

  useEffect(() => {
    document.body.classList.toggle("dark", dark);

    localStorage.setItem(
      "theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setDark((prev) => !prev)}
      aria-label="O‘zgartirish mavzusi"
    >
      {dark ? "☀" : "☾"}
    </button>
  );
}

export default ThemeToggle;