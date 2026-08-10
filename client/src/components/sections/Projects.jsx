import { useLocation, Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import { usePortfolio } from "@/context/PortfolioContext";
import { FaArrowRight } from "react-icons/fa";
import Skeleton from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import heroBg from "@/assets/images/HeroBackground.jpg";

const HOME_LIMIT = 4;

function Projects() {
  const { projects, loading, error, retry } = usePortfolio();
  const location = useLocation();
  const isAllProjectsPage = location.pathname === "/projects";

  const visible = isAllProjectsPage ? projects : (projects || []).slice(0, HOME_LIMIT);

  return (
    <section className="relative overflow-hidden bg-background py-28 text-foreground md:py-36">
      {/* ambient accents — same treatment as About/Skills */}
      <div className="pointer-events-none absolute left-[-200px] top-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[170px]" />
      <div className="pointer-events-none absolute bottom-0 right-[-150px] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[180px]" />

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          {/* Left column — heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:-mt-3 space-y-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-primary/60" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Projects
              </span>
            </div>

            <h2 className="text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl">
              Featured{" "}
              <span className="relative inline-block text-primary">
                Work
                <div className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-primary/60 to-secondary/60" />
              </span>
            </h2>

            <p className="text-lg leading-8 text-muted max-w-md">
              A selection of projects I've built — from idea to production.
            </p>

            {/* Image — same treatment as Skills/About section */}
            <div className="relative mt-8">
              <div className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full bg-gradient-to-br from-primary/30 to-secondary/25 blur-3xl" />

              <div className="absolute -top-[3px] -right-[3px] h-[55%] w-[55%] rounded-tr-[30px] border-r-[3px] border-t-[3px] border-primary" />
              <div className="absolute -bottom-[3px] -left-[3px] h-[55%] w-[55%] rounded-bl-[30px] border-b-[3px] border-l-[3px] border-primary" />

              <div className="relative rounded-[30px] border border-white/60 bg-white/30 p-2 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                <div className="relative overflow-hidden rounded-[24px]">
                  <img
                    src={heroBg}
                    alt="Projects visual representation"
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/5 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Right column — project grid */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-[440px] rounded-3xl" />
                ))}
              </div>
            ) : error ? (
              <ErrorState message={error} onRetry={retry} />
            ) : !projects?.length ? (
              <EmptyState
                title="No projects yet"
                description="Add projects from the admin panel and they'll appear here automatically."
              />
            ) : (
              <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
                {visible.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        {!isAllProjectsPage && !loading && projects?.length > HOME_LIMIT && (
          <div className="mt-16 flex justify-end">
            <Link
              to="/projects"
              className="group flex items-center gap-3 rounded-full border border-foreground/15 bg-surface px-8 py-4 font-semibold text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30"
            >
              Show All Projects
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}

function ProjectCard({ project }) {
  const techs = project.technologies || [];
  const extraTechCount = Math.max(techs.length - 5, 0);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-card shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
      {/* whole-card link for navigation */}
      <Link
        to={`/projects/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={project.title}
      />

      {/* hover glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 z-20 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 to-secondary/25 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-card text-muted">
            No Image
          </div>
        )}

        {/* base gradient for title legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {/* title — always visible */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-xl font-bold text-white drop-shadow-md">
            {project.title}
          </h3>
        </div>

        {/* hover overlay — slides up with description + technologies */}
        <div className="absolute inset-0 z-20 flex translate-y-full flex-col justify-between bg-gradient-to-t from-black/80 via-black/50 to-black/30 p-6 backdrop-blur-md transition-transform duration-500 ease-out group-hover:translate-y-0">
          <span className="self-start rounded-full border border-white/40 bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
            {project.category}
          </span>

          <div className="space-y-4">
            <p className="text-sm leading-6 text-white [text-align:justify] [text-justify:inter-word] line-clamp-4">
              {project.shortDescription || project.description}
            </p>

            {techs.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {techs.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md"
                  >
                    {tech}
                  </span>
                ))}
                {extraTechCount > 0 && (
                  <span className="rounded-full border border-primary/40 bg-primary/20 px-2.5 py-1 text-[11px] font-semibold text-white">
                    +{extraTechCount}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <Link
              to={`/projects/${project.slug}`}
              className="flex items-center gap-2 font-semibold text-white"
            >
              View Project
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-black"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
