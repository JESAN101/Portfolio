import { useState } from "react";
import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, FolderKanban, BrainCircuit, Briefcase,
  Mail, Settings, LogOut, User, Menu, X,
} from "lucide-react";
import ThemeToggle from "../components/layout/ThemeToggle";
import Logo from "../components/layout/Logo";

const navItems = [
  { path: "/admin", name: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/projects", name: "Projects", icon: FolderKanban },
  { path: "/admin/skills", name: "Skills", icon: BrainCircuit },
  { path: "/admin/experience", name: "Experience", icon: Briefcase },
  { path: "/admin/messages", name: "Messages", icon: Mail },
  { path: "/admin/profile", name: "Profile", icon: User },
  { path: "/admin/settings", name: "Settings", icon: Settings },
];

function Brand() {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Logo />
        <div>
          <p className="font-heading text-lg font-black leading-none text-foreground">Admin</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
            Control Panel
          </p>
        </div>
      </div>
    </div>
  );
}

function NavList({ onNavigate }) {
  const location = useLocation();
  return (
    <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto">
      {navItems.map((item) => {
        const active = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={`relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
              active
                ? "text-white shadow-lg shadow-primary/25"
                : "text-muted hover:bg-surface hover:text-foreground"
            }`}
          >
            {active && (
              <motion.span
                layoutId="admin-nav-pill"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary"
              />
            )}
            <span className="relative z-10 flex items-center gap-3">
              <item.icon size={18} />
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function LogoutButton({ onLogout, className = "" }) {
  return (
    <button
      onClick={onLogout}
      className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-muted transition-all duration-300 hover:bg-red-500/10 hover:text-red-500 ${className}`}
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}

function AdminLayout() {
  const { admin, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) return null;
  if (!admin) return <Navigate to="/admin/login" />;

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background">
      {/* ambient glows */}
      <div className="pointer-events-none fixed left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-primary/15 blur-[170px]" />
      <div className="pointer-events-none fixed bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-secondary/15 blur-[170px]" />

      {/* Desktop sidebar */}
      <aside className="relative z-10 hidden w-64 flex-col gap-6 border-r border-foreground/10 bg-surface/60 p-5 backdrop-blur-xl md:flex">
        <Brand />
        <NavList />
        <div className="flex flex-col gap-2 border-t border-foreground/10 pt-4">
          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-black text-white shadow-md shadow-primary/25">
              {admin?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{admin?.name}</p>
              <p className="truncate text-xs text-muted">{admin?.email}</p>
            </div>
          </div>
          <LogoutButton onLogout={logout} />
        </div>
      </aside>

      {/* Main area */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        {/* gradient top accent */}
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary via-secondary to-transparent" />

        {/* Mobile header */}
        <header className="flex h-16 items-center justify-between border-b border-foreground/10 px-4 backdrop-blur-xl md:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-xl p-2 text-foreground transition-colors hover:bg-surface"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <span className="font-heading text-lg font-bold text-foreground">Admin CMS</span>
          <ThemeToggle />
        </header>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
                className="relative flex w-72 max-w-[80%] flex-col gap-6 border-r border-foreground/10 bg-surface p-5 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <Brand />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl p-2 text-muted transition-colors hover:bg-surface hover:text-foreground"
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </button>
                </div>
                <NavList onNavigate={() => setMobileOpen(false)} />
                <div className="flex flex-col gap-2 border-t border-foreground/10 pt-4">
                  <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-black text-white shadow-md shadow-primary/25">
                      {admin?.name?.[0]?.toUpperCase() || "A"}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{admin?.name}</p>
                      <p className="truncate text-xs text-muted">{admin?.email}</p>
                    </div>
                  </div>
                  <LogoutButton onLogout={logout} />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <main className="flex-1 p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
