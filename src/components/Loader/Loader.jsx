import { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);

      const removeTimer = setTimeout(() => {
        setVisible(false);
      }, 700);

      return () => clearTimeout(removeTimer);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={`loader ${hide ? "loader--hide" : ""}`}>
      <div className="loader__content">
        <div className="loader__logo">
          AVTO<span>VAKUM</span>
        </div>

        <div className="loader__line">
          <div className="loader__progress"></div>
        </div>

        <div className="loader__text">
          YUKLANMOQDA...
        </div>
      </div>
    </div>
  );
}