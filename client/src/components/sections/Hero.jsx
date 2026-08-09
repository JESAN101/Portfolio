import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaArrowRight,
  FaDownload,
} from "react-icons/fa";
import Container from "@/components/ui/Container";
import TechMarquee from "./TechMarquee";
import { usePortfolio } from "@/context/PortfolioContext";
import { Link } from "react-router-dom";
import Skeleton from "@/components/ui/Skeleton";
import resumePdf from "@/assets/resume/resume.pdf";
import useTypewriter from "@/hooks/useTypewriter";
import profilePlaceholder from "@/assets/images/Profile_placeholder.webp";
import Lightbox from "@/components/ui/Lightbox";

const FALLBACK_TITLES = [
  "Full-Stack Developer",
  "Web Developer",
  "Problem Solver",
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

function Hero() {
  const { profile, loading } = usePortfolio();
  const [showLightbox, setShowLightbox] = useState(false);
  const titles = useMemo(() => {
    if (profile?.titles?.length > 0) return profile.titles;
    if (profile?.title) return [profile.title];
    return FALLBACK_TITLES;
  }, [profile?.titles, profile?.title]);
  const typedTitle = useTypewriter(titles);

  if (loading) {
    return (
    <section className="relative overflow-hidden bg-background pt-24 text-foreground">
      <div className="absolute left-[-200px] top-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[170px]" />
      <div className="absolute bottom-0 right-[-150px] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[180px]" />

        <Container>
          <div className="grid min-h-[90vh] items-center gap-20 lg:grid-cols-2">
            <div className="space-y-6">
              <Skeleton className="h-10 w-48 rounded-full" />
              <Skeleton className="h-24 w-3/4 rounded-2xl" />
              <Skeleton className="h-10 w-72 rounded-2xl" />
              <Skeleton className="h-24 w-full max-w-xl rounded-2xl" />
              <div className="flex gap-5">
                <Skeleton className="h-14 w-40 rounded-xl" />
                <Skeleton className="h-14 w-44 rounded-xl" />
              </div>
            </div>
            <div className="hidden flex-col items-center gap-8 lg:flex">
              <Skeleton className="h-[420px] w-[420px] rounded-full" />
              <Skeleton className="h-20 w-full rounded-2xl" />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-background pt-24 text-foreground">
      <div className="absolute left-[-200px] top-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[170px]" />
      <div className="absolute bottom-0 right-[-150px] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[180px]" />

      <Container>
        <div className="grid min-h-[90vh] items-center gap-20 lg:grid-cols-2">
          <div>
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted"
            >
              {profile?.availableForWork ? "👋 Available for work" : "👋 Currently unavailable"}
            </motion.span>

            <motion.h1
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-10"
            >
              <span className="text-xl font-semibold uppercase tracking-[0.25em] text-muted md:text-2xl">
                Hi, I'm
              </span>
              <br />
              <span className="gold-shimmer mt-3 inline-block text-6xl font-black leading-tight md:text-7xl">
                {profile?.fullName || "Bogati"}
              </span>
              <span className="mt-7 block h-1.5 w-28 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600" />
            </motion.h1>

            <motion.h2
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 flex min-h-10 items-center text-2xl font-semibold text-muted md:text-3xl"
            >
              <span>{typedTitle}</span>
              <span
                aria-hidden="true"
                className="ml-1.5 inline-block h-8 w-[3px] animate-pulse rounded-full bg-primary md:h-9"
              />
            </motion.h2>

            <motion.p
              custom={0.6}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted [text-align:justify] [text-justify:inter-word]"
            >
              {profile?.shortBio}
            </motion.p>

            <motion.div
              custom={0.8}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-12 flex flex-wrap gap-5"
            >
              <Link
                to="/projects"
                className="group flex items-center gap-3 rounded-full border border-foreground/15 bg-surface px-8 py-4 font-semibold text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30"
              >
                View Projects
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href={resumePdf}
                download="Resume.pdf"
                className="group flex items-center gap-3 rounded-full border border-foreground/15 bg-surface px-8 py-4 font-semibold text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30"
              >
                Download Resume
                <FaDownload className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-14 flex gap-5 pb-16"
            >
              {profile?.socials?.github && (
                <a href={profile.socials.github} target="_blank" rel="noreferrer" className="rounded-full border border-foreground/15 bg-surface p-4 text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-foreground hover:text-foreground hover:shadow-xl hover:shadow-black/20">
                  <FaGithub size={22} />
                </a>
              )}
              {profile?.socials?.linkedin && (
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-foreground/15 bg-surface p-4 text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-blue-500 hover:shadow-xl hover:shadow-blue-500/30">
                  <FaLinkedin size={22} />
                </a>
              )}
              {profile?.socials?.instagram && (
                <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-foreground/15 bg-surface p-4 text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500 hover:text-pink-500 hover:shadow-xl hover:shadow-pink-500/30">
                  <FaInstagram size={22} />
                </a>
              )}
              {profile?.socials?.facebook && (
                <a href={profile.socials.facebook} target="_blank" rel="noreferrer" className="rounded-full border border-foreground/15 bg-surface p-4 text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:text-blue-600 hover:shadow-xl hover:shadow-blue-600/30">
                  <FaFacebook size={22} />
                </a>
              )}
              {profile?.socials?.twitter && (
                <a href={profile.socials.twitter} target="_blank" rel="noreferrer" className="rounded-full border border-foreground/15 bg-surface p-4 text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500 hover:text-sky-500 hover:shadow-xl hover:shadow-sky-500/30">
                  <FaTwitter size={22} />
                </a>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hidden lg:block"
          >
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                {/* Rotating conic ring + soft glow behind the portrait */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-3 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0%, rgba(59,130,246,.55) 18%, rgba(139,92,246,.45) 32%, transparent 50%)",
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />

                <div 
                  className="relative h-[420px] w-[420px] cursor-zoom-in overflow-hidden rounded-full border-4 border-border shadow-[0_0_80px_rgba(59,130,246,.25)]"
                  onClick={() => setShowLightbox(true)}
                >
                  {profile?.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={profile?.fullName || "Profile"}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <img
                      src={profilePlaceholder}
                      alt="Profile placeholder"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  )}
                </div>
              </div>

              <TechMarquee />
            </div>
          </motion.div>
        </div>
      </Container>

      {showLightbox && (
        <Lightbox
          images={[{ url: profile?.profileImage || profilePlaceholder, alt: profile?.fullName || "Profile" }]}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </section>
  );
}

export default Hero;