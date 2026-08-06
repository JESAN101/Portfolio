import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";
import Container from "@/components/ui/Container";
import TechOrbit from "./TechOrbit";
import { usePortfolio } from "@/context/PortfolioContext";
import { Link } from "react-router-dom";
import Skeleton from "@/components/ui/Skeleton";
import profileFallback from "@/assets/images/profile.jpg";

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
            <Skeleton className="hidden h-[460px] w-[460px] rounded-full lg:block" />
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
              className="mt-8 text-6xl font-black leading-none md:text-8xl"
            >
              Hi, I'm
              <br />
              <span className="bg-gradient-to-r from-foreground via-muted to-primary bg-clip-text text-transparent">
                {profile?.fullName || "Bogati"}
              </span>
            </motion.h1>

            <motion.h2
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 text-3xl font-semibold text-muted"
            >
              {profile?.title || "Full Stack Developer"}
            </motion.h2>

            <motion.p
              custom={0.6}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 max-w-xl text-lg leading-9 text-muted"
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
              <Link to="/projects" className="flex items-center gap-3 rounded-xl bg-primary px-8 py-4 font-semibold text-white transition hover:scale-105 hover:opacity-90">
                View Projects
                <FaArrowRight />
              </Link>

              {profile?.resume && (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border px-8 py-4 font-semibold text-foreground transition hover:border-primary hover:bg-primary hover:text-white"
                >
                  Download Resume
                </a>
              )}
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-14 flex gap-5"
            >
              {profile?.socials?.github && (
                <a href={profile.socials.github} target="_blank" rel="noreferrer" className="rounded-full border border-border p-4 text-foreground transition hover:border-foreground">
                  <FaGithub size={22} />
                </a>
              )}
              {profile?.socials?.linkedin && (
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-border p-4 text-foreground transition hover:border-blue-500 hover:text-blue-500">
                  <FaLinkedin size={22} />
                </a>
              )}
              {profile?.socials?.instagram && (
                <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-border p-4 text-foreground transition hover:border-pink-500 hover:text-pink-500">
                  <FaInstagram size={22} />
                </a>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hidden justify-center lg:flex"
          >
           <div className="relative hidden h-[620px] w-[620px] lg:block">
              <TechOrbit />
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />

              <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-border shadow-[0_0_80px_rgba(59,130,246,.25)]">
                <img
                  src={profile?.profileImage || profileFallback}
                  alt={profile?.fullName || "Profile"}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;