import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // FIX: this was `bg-black/70` unconditionally — the navbar looked
    // the same regardless of theme. Now it uses the `background` token
    // (via the `bg-background/80` opacity shorthand) so it's white in
    // light mode and near-black in dark mode automatically.
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Logo />

          <div className="hidden lg:block">
            <NavLinks />
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              to="/resume"
              className="hidden rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:scale-105 lg:block"
            >
              Resume
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="text-foreground lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="flex flex-col p-6">
            {[
              { name: "About", path: "/about" },
              { name: "Projects", path: "/projects" },
              { name: "Skills", path: "/skills" },
              { name: "Experience", path: "/experience" },
              { name: "Certificates", path: "/certificates" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="border-b border-border py-4 text-lg text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;