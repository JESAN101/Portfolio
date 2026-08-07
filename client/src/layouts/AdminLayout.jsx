import { useState } from "react";
import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, FolderKanban, BrainCircuit, Award, Briefcase,
  GraduationCap, Mail, Settings, LogOut, User, Menu, X,
} from "lucide-react";
import ThemeToggle from "../components/layout/ThemeToggle";

const navItems = [
  { path: "/admin", name: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/projects", name: "Projects", icon: FolderKanban },
  { path: "/admin/skills", name: "Skills", icon: BrainCircuit },
  { path: "/admin/experience", name: "Experience", icon: Briefcase },
  { path: "/admin/education", name: "Education", icon: GraduationCap },
  { path: "/admin/certificates", name: "Certificates", icon: Award },
  { path: "/admin/messages", name: "Messages", icon: Mail },
  { path: "/admin/profile", name: "Profile", icon: User },
  { path: "/admin/settings", name: "Settings", icon: Settings },
];

function NavList({ onNavigate }) {
  const location = useLocation();
  return (
    <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
      {navItems.map((item) => {
        const active = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              active ? "bg-primary text-white" : "text-muted hover:bg-surface hover:text-foreground"
            }`}
          >
            <item.icon size={18} />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

function AdminLayout() {
  const { admin, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) return null;
  if (!admin) return <Navigate to="/admin/login" />;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="w-64 border-r border-border p-5 hidden md:flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <span className="font-heading text-xl font-bold text-foreground">Admin CMS</span>
          <ThemeToggle />
        </div>
        <NavList />
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted hover:bg-surface hover:text-red-500 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* FIX: previously there was no way to open the admin nav on mobile
          at all (`hidden md:flex` with nothing to replace it), which made
          the admin panel unusable on small screens. This adds a top bar
          with a menu button and a slide-in drawer below md. */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between px-4 h-14 border-b border-border">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 text-foreground"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <span className="font-heading font-bold text-foreground">Admin CMS</span>
          <ThemeToggle />
        </header>

        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <div className="relative w-72 max-w-[80%] bg-background border-r border-border p-5 flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <span className="font-heading text-xl font-bold text-foreground">Admin CMS</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>
              <NavList onNavigate={() => setMobileOpen(false)} />
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-red-500 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;