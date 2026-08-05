import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-border p-5">
        Admin Sidebar
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;