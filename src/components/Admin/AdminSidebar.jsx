export default function AdminSidebar({
  activeTab,
  setActiveTab,
  onLogout,
}) {
  const items = [
    {
      id: "hero",
      label: "Hero",
    },
    {
      id: "before-after",
      label: "Before / After",
    },
    {
      id: "gallery",
      label: "Gallery",
    },
    {
      id: "reviews",
      label: "Reviews",
    },
    {
      id: "users",
      label: "Admins",
    },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        AVTO<span>VAKUUM</span>
      </div>

      <div className="admin-sidebar-label">
        ADMIN PANEL
      </div>

      <nav className="admin-nav">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={
              activeTab === item.id
                ? "active"
                : ""
            }
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button
        type="button"
        className="admin-logout"
        onClick={onLogout}
      >
        Выйти
      </button>
    </aside>
  );
}