import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";

const SOCIAL_ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  twitter: FaTwitter,
  facebook: FaFacebookF,
};

export const SOCIAL_HOVER = {
  github: "hover:border-foreground hover:text-foreground hover:shadow-xl hover:shadow-black/20",
  linkedin: "hover:border-blue-500 hover:text-blue-500 hover:shadow-xl hover:shadow-blue-500/30",
  instagram: "hover:border-pink-500 hover:text-pink-500 hover:shadow-xl hover:shadow-pink-500/30",
  facebook: "hover:border-blue-600 hover:text-blue-600 hover:shadow-xl hover:shadow-blue-600/30",
  twitter: "hover:border-sky-500 hover:text-sky-500 hover:shadow-xl hover:shadow-sky-500/30",
};

export function getSocialLinks(socials = {}) {
  if (!socials) return [];

  return Object.entries(socials)
    .filter(([, url]) => url && typeof url === "string" && url.trim() !== "")
    .map(([name, url]) => {
      const Icon = SOCIAL_ICONS[name] || FaGithub;
      return { name, url, Icon };
    });
}
