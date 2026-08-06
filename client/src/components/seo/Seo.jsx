import { useEffect } from "react";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, DEFAULT_OG_IMAGE } from "@/config";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function renderStructuredData(data) {
  let el = document.getElementById("structured-data");
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "structured-data";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Builds a Person structured-data payload from profile data.
 */
export function buildPersonStructuredData(profile = {}) {
  const sameAs = Object.values(profile.socials || {}).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: profile.title,
    description: profile.shortBio || profile.about,
    email: profile.email,
    telephone: profile.phone,
    address: profile.location
      ? { "@type": "PostalAddress", addressLocality: profile.location }
      : undefined,
    image: profile.profileImage || undefined,
    url: SITE_URL,
    sameAs,
  };
}

function Seo({
  title,
  description = SITE_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  url,
  type = "website",
  structuredData,
  robots,
}) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

    const canonical = url || window.location.origin + window.location.pathname;

    upsertMeta("name", "description", description);
    upsertLink("canonical", canonical);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", title || SITE_NAME);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title || SITE_NAME);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    if (robots) upsertMeta("name", "robots", robots);

    if (structuredData) renderStructuredData(structuredData);
  }, [title, description, image, url, type, structuredData, robots]);

  return null;
}

export default Seo;
