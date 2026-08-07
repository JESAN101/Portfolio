import Container from "@/components/ui/Container";
import { usePortfolio } from "@/context/PortfolioContext";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import Skeleton from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";

function Projects() {
  const { projects, loading, error, retry } = usePortfolio();

  return (
    <section className="bg-background py-28 text-foreground">
      <Container>
        <div className="mb-16 text-center">
          <span className="rounded-full border border-primary px-4 py-2 text-sm text-primary">
            Projects
          </span>

          <h2 className="mt-6 text-5xl font-black">
            Featured Projects
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Some of my recent work.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-8 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-[480px] rounded-3xl" />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : projects?.length === 0 ? (
          <EmptyState title="No projects" description="Projects will appear here once published." />
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {projects?.map((project) => (
              <div
                key={project._id}
                className="overflow-hidden rounded-3xl border border-border bg-card transition duration-300 hover:-translate-y-2 hover:border-primary"
              >
                {project.coverImage ? (
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-gradient-to-br from-surface to-card text-muted">
                    No Image
                  </div>
                )}

                <div className="p-8">
                  <p className="text-sm text-primary">
                    {project.category}
                  </p>

                  <h3 className="mt-3 text-3xl font-bold">
                    {project.title}
                  </h3>

                  <p className="mt-5 leading-8 text-muted">
                    {project.shortDescription || project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-surface px-3 py-1 text-xs text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-6">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="flex items-center gap-2 text-primary hover:gap-4 transition-all"
                    >
                      View Project
                      <FaArrowRight />
                    </Link>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} GitHub repository`}
                        className="flex items-center gap-2 text-muted hover:text-foreground transition-all"
                      >
                        <FaGithub />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-primary px-4 py-1.5 text-sm text-primary hover:bg-primary hover:text-white transition-all"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default Projects;