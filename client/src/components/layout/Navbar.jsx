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
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/70 backdrop-blur-2xl"
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
              className="hidden rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:scale-105 lg:block"
            >
              Resume
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            >
              {open ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <div className="border-t border-zinc-800 bg-black lg:hidden">
          <nav className="flex flex-col p-6">
            {[
              "About",
              "Projects",
              "Skills",
              "Experience",
              "Certificates",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="border-b border-zinc-800 py-4 text-lg"
                onClick={() => setOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;