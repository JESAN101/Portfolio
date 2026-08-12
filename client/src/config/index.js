export const SITE_URL =
  import.meta.env.VITE_SITE_URL || "https://portfolio-jesan102.vercel.app";

export const SITE_NAME = "Jesan Bogati";
export const SITE_DESCRIPTION =
  "Full Stack Developer portfolio showcasing projects, skills and experience.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Experience", path: "/experience" },
  { name: "Certificates", path: "/certificates" },
  { name: "Contact", path: "/contact" },
];

export const PROJECT_CATEGORIES = [
  "Web",
  "Mobile",
  "Desktop",
  "UI/UX",
  "Other",
];

export const PROJECTS_PER_PAGE = 6;

export const MAX_CONTACT_MESSAGE_LENGTH = 5000;
