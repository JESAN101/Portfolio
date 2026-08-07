import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Experience", path: "/experience" },
  { name: "Certificates", path: "/certificates" },
  { name: "Contact", path: "/contact" },
];

function NavLinks() {
  const location = useLocation();

  return (
    <nav className="flex items-center gap-1 rounded-full border border-border bg-surface/60 p-1.5">
      {links.map((link) => {
        // "/" must match exactly, everything else can match sub-routes
        // (e.g. /projects/:slug still highlights "Projects")
        const isActive =
          link.path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(link.path);

        return (
          <NavLink
            key={link.path}
            to={link.path}
            className="relative px-4 py-2 text-sm font-medium"
          >
            {isActive && (
              <motion.span
                layoutId="nav-pill"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-full bg-primary shadow-sm"
              />
            )}
            <span className={`relative z-10 transition-colors ${isActive ? "text-white" : "text-muted hover:text-foreground"}`}>
              {link.name}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default NavLinks;