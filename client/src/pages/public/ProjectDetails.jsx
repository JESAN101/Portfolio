import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import { usePortfolio } from "@/context/PortfolioContext";
import Seo from "@/components/seo/Seo";
import Image from "@/components/ui/Image";
import {
  FaArrowLeft,
  FaArrowRight,
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaFolderOpen,
  FaLayerGroup,
  FaStar,
  FaImages,
} from "react-icons/fa";
import NotFound from "./NotFound";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function ProjectDetails() {
  const { slug } = useParams();
  const { projects, loading } = usePortfolio();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const project = projects?.find((p) => p.slug === slug);
  const gallery = project?.galleryImages || [];
  const related = (projects || [])
    .filter((p) => p.slug !== slug && p.category === project?.category)
    .slice(0, 3);
  const fallbackRelated = (projects || [])
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  // Keyboard navigation for the lightbox: Esc closes, arrows step through.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i + 1) % gallery.length);
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, gallery.length]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
          <p className="text-sm tracking-wide text-muted">Loading project…</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return <NotFound />;
  }

  const metaItems = [
    {
      icon: <FaFolderOpen size={15} />,
      label: "Category",
      value: project.category,
    },
    {
      icon: <FaLayerGroup size={15} />,
      label: "Tech Stack",
      value: `${project.technologies?.length || 0} technologies`,
    },
    {
      icon: <FaImages size={15} />,
      label: "Gallery",
      value: gallery.length > 0 ? `${gallery.length} images` : "Not provided",
    },
  ];

  const relatedProjects = related.length > 0 ? related : fallbackRelated;

  return (
    <section className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Seo
        title={project.title}
        description={project.shortDescription}
        image={project.coverImage}
        type="article"
      />
      {/* ---------- Cinematic Hero ---------- */}
      <div className="relative">
        <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden md:h-[68vh]">
          {project.coverImage && (
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          )}

          {/* gradient overlays for guaranteed contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

          <Container className="relative flex h-full flex-col justify-between py-10">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/projects"
                className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
              >
                <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Projects
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={0.15}
              initial="hidden"
              animate="show"
            >
              <div className="flex flex-wrap items-center gap-3">
                {project.featured && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-amber-500/30">
                    <FaStar className="text-[10px]" /> Featured
                  </span>
                )}
                {project.category && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                    {project.category}
                  </span>
                )}
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white drop-shadow-sm md:text-6xl">
                {project.title}
              </h1>

              {project.shortDescription && (
                <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 md:text-lg md:leading-8">
                  {project.shortDescription}
                </p>
              )}
            </motion.div>
          </Container>
        </div>

        {/* ambient glow — same treatment as About/Skills */}
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[170px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full bg-secondary/20 blur-[160px]" />
      </div>

      {/* ---------- Body ---------- */}
      <Container className="relative pb-20 pt-16 md:pb-24 md:pt-20">
        <div className="grid gap-14 lg:grid-cols-3 lg:gap-16">
          {/* Main column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-2"
          >
            {/* Overview */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-primary/60" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Overview
                </span>
              </div>

              <h2 className="mt-6 text-3xl font-black leading-[1.15] tracking-tight md:text-4xl">
                About
                <br />
                <span className="relative inline-block text-primary">
                  this project
                  <div className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-primary/60 to-secondary/60" />
                </span>
              </h2>

              <p className="mt-8 text-lg leading-8 text-foreground/85 [text-align:justify] [text-justify:inter-word] md:text-xl md:leading-9">
                {project.description}
              </p>
            </motion.div>

            {/* Meta strip */}
            <motion.div
              variants={fadeUp}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {metaItems.map((item) => (
                <div
                  key={item.label}
                  className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-card p-5 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/10 bg-gradient-to-br from-primary/10 to-secondary/10 text-primary shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-bold text-foreground">
                    {item.value}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Built with */}
            {project.technologies?.length > 0 && (
              <motion.div variants={fadeUp} className="mt-12">
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-secondary/60" />
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
                    Built with
                  </h3>
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="cursor-default rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-md shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:shadow-lg hover:shadow-primary/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 rounded-[30px] border border-foreground/15 bg-white/30 p-7 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              {/* corner accents — same as About card */}
              <div className="pointer-events-none absolute -right-[3px] -top-[3px] h-[55%] w-[55%] rounded-tr-[30px] border-r-[3px] border-t-[3px] border-primary" />
              <div className="pointer-events-none absolute -bottom-[3px] -left-[3px] h-[55%] w-[55%] rounded-bl-[30px] border-b-[3px] border-l-[3px] border-primary" />

              <h3 className="text-sm font-bold uppercase tracking-wide">
                Project Links
              </h3>

              <div className="mt-6 space-y-3.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex w-full items-center justify-center gap-3 rounded-full border border-primary/40 bg-surface px-6 py-4 text-sm font-semibold text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
                  >
                    <FaExternalLinkAlt className="transition-transform duration-300 group-hover:rotate-12" />
                    View Live Demo
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex w-full items-center justify-center gap-3 rounded-full border border-foreground/15 bg-surface px-6 py-4 text-sm font-semibold text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30"
                  >
                    <FaExternalLinkAlt className="text-xs opacity-70 transition-transform duration-300 group-hover:rotate-12" />
                    View Source
                    <FaGithub className="text-lg" />
                  </a>
                )}

                {!project.githubUrl && !project.liveUrl && (
                  <p className="text-sm leading-6 text-muted">
                    No links added for this project yet.
                  </p>
                )}
              </div>

              <div className="mt-8 space-y-4 border-t border-foreground/10 pt-6">
                {metaItems.slice(0, 2).map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted">{item.label}</span>
                    <span className="font-semibold text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        {/* ---------- Gallery ---------- */}
        {gallery.length > 0 && (
          <div className="mt-20 md:mt-24">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-primary/60" />
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Screenshots
                  </span>
                </div>
                <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
                  Project
                  <br />
                  <span className="relative inline-block text-primary">
                    Gallery
                    <div className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-primary/60 to-secondary/60" />
                  </span>
                </h2>
              </div>
              <span className="hidden text-sm font-medium text-muted sm:block">
                {gallery.length} {gallery.length === 1 ? "image" : "images"}
              </span>
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {gallery.map((img, i) => (
                <motion.button
                  key={img._id || i}
                  variants={fadeUp}
                  onClick={() => setLightboxIndex(i)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-foreground/15 bg-gradient-to-br from-surface to-card shadow-xl shadow-black/10 backdrop-blur-xl dark:border-white/10"
                >
                  <img
                    src={img.url}
                    alt={`${project.title} gallery ${i + 1}`}
                    className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <FaExpand />
                    </span>
                  </div>
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        )}

        {/* ---------- More Projects ---------- */}
        {relatedProjects.length > 0 && (
          <div className="mt-20 md:mt-24">
            <div className="flex items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-secondary/60" />
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
                    Keep exploring
                  </span>
                </div>
                <h2 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
                  More
                  <br />
                  <span className="relative inline-block text-primary">
                    Projects
                    <div className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-primary/60 to-secondary/60" />
                  </span>
                </h2>
              </div>
              <Link
                to="/projects"
                className="group hidden shrink-0 items-center gap-2.5 rounded-full border border-foreground/15 bg-surface px-6 py-3 text-sm font-semibold text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30 sm:inline-flex"
              >
                View All
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((p) => (
                <Link
                  key={p._id}
                  to={`/projects/${p.slug}`}
                  className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-card shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-surface to-card">
                    {p.coverImage ? (
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-card text-muted">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                        {p.category}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-white">
                        {p.title}
                      </h3>
                    </div>
                  </div>

                  <div className="absolute inset-x-6 bottom-0 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-500 group-hover:w-[calc(100%-3rem)]" />
                </Link>
              ))}
            </div>

            <div className="mt-10 flex justify-end sm:hidden">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2.5 rounded-full border border-foreground/15 bg-surface px-6 py-3 text-sm font-semibold text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30"
              >
                View All
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        )}
      </Container>

      {/* ---------- Lightbox ---------- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute right-6 top-6 text-white/80 transition hover:text-white"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
            >
              <FaTimes size={26} />
            </button>

            {gallery.length > 1 && (
              <>
                <button
                  className="absolute left-4 text-white/70 transition hover:text-white md:left-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (i) => (i - 1 + gallery.length) % gallery.length,
                    );
                  }}
                  aria-label="Previous image"
                >
                  <FaChevronLeft size={28} />
                </button>
                <button
                  className="absolute right-4 text-white/70 transition hover:text-white md:right-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i + 1) % gallery.length);
                  }}
                  aria-label="Next image"
                >
                  <FaChevronRight size={28} />
                </button>
              </>
            )}

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={gallery[lightboxIndex].url}
              alt="Gallery preview"
              className="max-h-[85vh] max-w-full rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {gallery.length > 1 && (
              <span className="absolute bottom-6 text-sm text-white/60">
                {lightboxIndex + 1} / {gallery.length}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectDetails;
