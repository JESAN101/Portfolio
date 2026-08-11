import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import Logo from "./Logo";
import { usePortfolio } from "@/context/PortfolioContext";
import { getSocialLinks } from "@/utils/socials";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowUp,
  FaArrowRight,
} from "react-icons/fa";

const FOOTER_LINKS = [
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

function Footer() {
  const { profile } = usePortfolio();
  const socials = getSocialLinks(profile?.socials);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-foreground/10 bg-surface text-foreground">
      {/* ambient accent */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[300px] w-[300px] rounded-full bg-secondary/10 blur-[120px]" />

      {/* gradient top border */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <Container className="relative py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5">
            <Logo />
            <h3 className="text-xl font-black tracking-tight">
              {profile?.fullName || "Jesan Bogati"}
            </h3>
            <p className="text-sm leading-6 text-muted">
              Full-stack developer crafting clean, fast and delightful web
              experiences — from idea to production.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
              Navigate
            </h4>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {profile?.email && (
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center gap-3 transition-colors hover:text-primary"
                  >
                    <FaEnvelope className="shrink-0 text-xs text-primary" />
                    <span className="truncate">{profile.email}</span>
                  </a>
                </li>
              )}
              {profile?.phone && (
                <li>
                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-3 transition-colors hover:text-primary"
                  >
                    <FaPhoneAlt className="shrink-0 text-xs text-primary" />
                    {profile.phone}
                  </a>
                </li>
              )}
              {profile?.location && (
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt className="shrink-0 text-xs text-primary" />
                  {profile.location}
                </li>
              )}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
              Connect
            </h4>
            {socials.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-3">
                {socials.map(({ name, url, Icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-surface text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-muted">No social links yet.</p>
            )}

            <Link
              to="/contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-surface px-5 py-2.5 text-sm font-semibold text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30"
            >
              Start a Project
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>

      {/* bottom bar */}
      <div className="relative border-t border-foreground/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-center text-xs text-muted">
            &copy; {new Date().getFullYear()}{" "}
            {profile?.fullName || "Portfolio"}. Crafted with care. All rights reserved.
          </p>

          <button
            onClick={scrollTop}
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-surface px-4 py-2 text-xs font-semibold text-muted transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25"
          >
            Back to top
            <FaArrowUp className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
