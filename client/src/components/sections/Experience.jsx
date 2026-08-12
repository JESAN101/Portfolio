import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import { usePortfolio } from "@/context/PortfolioContext";
import { formatDuration } from "@/utils/format";
import Skeleton from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

function Experience({ compact = false }) {
  const { experience, loading, error, retry } = usePortfolio();

  return (
    <section className="relative overflow-hidden bg-background py-28 text-foreground md:py-36">
      {/* ambient accents — same treatment as About/Skills */}
      <div className="pointer-events-none absolute left-[-200px] top-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[170px]" />
      <div className="pointer-events-none absolute bottom-0 right-[-150px] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[180px]" />

      <Container className="relative">
        {/* ---------- Header ---------- */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-primary/60" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Experience
            </span>
            <span className="h-px w-10 bg-primary/60" />
          </div>

          <h2 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl">
            My Professional
            <br />
            <span className="relative inline-block text-primary">
              Journey
              <div className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-primary/60 to-secondary/60" />
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted">
            A timeline of the roles, projects, and growth that shaped me as a developer.
          </p>
        </div>

        {/* ---------- Content ---------- */}
        {loading ? (
          <div className="mt-20 space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-44 w-full rounded-3xl" />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : experience?.length === 0 ? (
          <EmptyState title="No experience yet" description="Experience entries will appear here once added." />
        ) : (
          <div className="relative mx-auto mt-20 max-w-4xl">
            {/* gradient timeline rail */}
            <div className="absolute bottom-6 left-[21px] top-2 w-[3px] rounded-full bg-gradient-to-b from-primary via-primary/40 to-secondary/60 md:left-1/2 md:-translate-x-1/2" />
            <div className="absolute left-[15px] top-0 h-4 w-4 rounded-full bg-primary shadow-[0_0_18px_rgba(59,130,246,0.8)] md:left-1/2 md:-translate-x-1/2" />
            <div className="absolute bottom-0 left-[15px] h-4 w-4 rounded-full bg-secondary shadow-[0_0_18px_rgba(168,85,247,0.8)] md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-12">
              {experience?.map((item, index) => (
                <ExperienceCard key={item._id} item={item} index={index} compact={compact} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

function ExperienceCard({ item, index, compact = false }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      custom={index * 0.06}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="relative md:grid md:grid-cols-2 md:items-start md:gap-16"
    >
      {/* node */}
      <div className="absolute left-[21px] top-8 z-10 -translate-x-1/2 md:left-1/2">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary/50 bg-card shadow-lg shadow-primary/20">
          <FaBriefcase className="text-sm text-primary" />
          {item.current && (
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-ping rounded-full bg-emerald-500/80" />
          )}
        </div>
      </div>

      {/* content card */}
      <div
        className={`ml-16 md:ml-0 ${
          isEven ? "md:col-start-1 md:pr-4" : "md:col-start-2 md:pl-4"
        }`}
      >
        <div className="group relative overflow-hidden rounded-[26px] border border-white/60 bg-white/30 p-7 shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 dark:border-white/10 dark:bg-white/5 md:p-8">
          {/* corner accents */}
          <div className="pointer-events-none absolute -right-[3px] -top-[3px] h-[45%] w-[45%] rounded-tr-[26px] border-r-[3px] border-t-[3px] border-primary/70" />
          <div className="pointer-events-none absolute -bottom-[3px] -left-[3px] h-[45%] w-[45%] rounded-bl-[26px] border-b-[3px] border-l-[3px] border-secondary/70" />

          {/* hover glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative">
            {/* top row */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-muted shadow-sm">
                  <FaCalendarAlt className="text-[10px] text-primary" />
                  {formatDuration(item.startDate, item.endDate, item.current)}
                </span>

                {item.current && (
                  <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    Current
                  </span>
                )}
              </div>

              <h3 className="order-3 w-full text-2xl font-black leading-tight tracking-tight md:order-none md:w-auto">
                {item.position}
              </h3>
            </div>

            {/* company + location */}
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span className="flex items-center gap-2 font-semibold text-primary">
                <FaBriefcase className="text-xs" />
                {item.company}
              </span>
              {item.location && (
                <span className="flex items-center gap-1.5 text-sm text-muted">
                  <FaMapMarkerAlt className="text-xs" />
                  {item.location}
                </span>
              )}
            </div>

            {/* description */}
            {!compact && item.description && (
              <p className="mt-5 leading-8 text-muted [text-align:justify] [text-justify:inter-word]">
                {item.description}
              </p>
            )}

            {/* technologies */}
            {item.technologies?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:shadow-md hover:shadow-primary/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {compact && (
              <Link
                to="/experience"
                className="group mt-6 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-surface px-6 py-3 text-sm font-semibold text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30"
              >
                See Details
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Experience;
