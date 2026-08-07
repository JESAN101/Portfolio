import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";

const mobileLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Experience", path: "/experience" },
  { name: "Certificates", path: "/certificates" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile drawer automatically if the viewport grows back to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      {/*
        Premium touch: the whole bar floats down as a rounded, bordered
        "pill" once you scroll, instead of a full-width strip pinned to
        the top edge. Feels lighter and more like a native app chrome.
      */}
      <div className={`transition-all duration-300 ${scrolled ? "pt-3" : "pt-0"}`}>
        <Container>
          <div
            className={`flex h-16 items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:h-[70px] sm:px-6 ${
              scrolled
                ? "border border-border bg-background/80 shadow-lg shadow-black/5 backdrop-blur-2xl"
                : "border border-transparent bg-transparent"
            }`}
          >
            <Logo />

            <div className="hidden lg:block">
              <NavLinks />
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />

              <Link
                to="/resume"
                className="hidden rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105 hover:opacity-90 lg:block"
              >
                Resume
              </Link>

              <button
                onClick={() => setOpen((v) => !v)}
                className="rounded-lg p-1.5 text-foreground transition hover:bg-surface lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden"
          >
            <Container>
              <nav className="mt-2 flex flex-col overflow-hidden rounded-2xl border border-border bg-background/95 shadow-lg backdrop-blur-2xl">
                {mobileLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="border-b border-border px-6 py-4 text-base font-medium text-foreground last:border-b-0 hover:bg-surface"
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/resume"
                  className="px-6 py-4 text-center text-base font-semibold text-primary hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  Resume
                </Link>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;