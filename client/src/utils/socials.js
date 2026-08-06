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

export function getSocialLinks(socials = {}) {
  if (!socials) return [];

  return Object.entries(socials)
    .filter(([, url]) => url && typeof url === "string" && url.trim() !== "")
    .map(([name, url]) => {
      const Icon = SOCIAL_ICONS[name] || FaGithub;
      return { name, url, Icon };
    });
}
