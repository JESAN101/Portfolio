export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const SITE_URL =
  import.meta.env.VITE_SITE_URL || "https://portfolio.example.com";

export const SITE_NAME = "Portfolio";
export const SITE_DESCRIPTION =
  "Full Stack Developer portfolio showcasing projects, skills, experience and certifications.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/icons.svg`;

export const NAV_LINKS = [
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Experience", path: "/experience" },
  { name: "Certificates", path: "/certificates" },
  { name: "Contact", path: "/contact" },
];

export const PROJECT_CATEGORIES = ["Web", "Mobile", "Desktop", "UI/UX", "Other"];

export const PROJECTS_PER_PAGE = 6;

export const MAX_CONTACT_MESSAGE_LENGTH = 5000;
