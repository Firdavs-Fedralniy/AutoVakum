import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminHero from "../../components/Admin/AdminHero";
import AdminBeforeAfter from "../../components/Admin/AdminBeforeAfter";
import AdminGallery from "../../components/Admin/AdminGallery";
import AdminReviews from "../../components/Admin/AdminReviews";
import AdminUsers from "../../components/Admin/AdminUsers";

import "./Admin.css";

export default function Admin() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/", { replace: true });
      return;
    }

    const { data, error } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

 if (error || !data) {
  console.error("Admin check failed:", error);

  navigate("/", { replace: true });
  return;
}

    setAuthorized(true);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  }

  if (loading) {
    return (
      <div className="admin-loading">
        Проверка доступа...
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="admin">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={logout}
      />

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-top-label">
              AVTO VAKUUM
            </span>

            <h1>
              {activeTab === "hero" && "Hero"}
              {activeTab === "before-after" && "Before / After"}
              {activeTab === "gallery" && "Gallery"}
              {activeTab === "reviews" && "Reviews"}
              {activeTab === "users" && "Admins"}
            </h1>
          </div>

          <button
            type="button"
            className="admin-site-button"
            onClick={() => navigate("/")}
          >
            Открыть сайт
          </button>
        </header>

        <div className="admin-content">
          {activeTab === "hero" && <AdminHero />}

          {activeTab === "before-after" && (
            <AdminBeforeAfter />
          )}

          {activeTab === "gallery" && <AdminGallery />}

          {activeTab === "reviews" && <AdminReviews />}

          {activeTab === "users" && <AdminUsers />}
        </div>
      </main>
    </div>
  );
}