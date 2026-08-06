import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import { usePortfolio } from "@/context/PortfolioContext";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import NotFound from "./NotFound";

function ProjectDetails() {
  const { slug } = useParams();
  const { projects, loading } = usePortfolio();
  const [lightbox, setLightbox] = useState(null);

  const project = projects?.find((p) => p.slug === slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 text-white">
        <Container className="py-20 text-center text-zinc-400">Loading project...</Container>
      </div>
    );
  }

  if (!project) {
    return <NotFound />;
  }

  const gallery = project.galleryImages || [];

  return (
    <section className="min-h-screen bg-black py-28 text-white">
      <Container>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
        >
          <FaArrowLeft /> Back to Projects
        </Link>

        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="mt-10 h-[420px] w-full rounded-3xl object-cover"
          />
        ) : (
          <div className="mt-10 flex h-[420px] items-center justify-center rounded-3xl bg-zinc-900 text-zinc-500">
            No image
          </div>
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className="rounded-full border border-blue-500 px-4 py-1.5 text-sm text-blue-400">
              {project.category}
            </span>

            <h1 className="mt-6 text-5xl font-black">{project.title}</h1>

            <p className="mt-8 text-lg leading-9 text-zinc-400">
              {project.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {project.technologies?.map((tech) => (
                <span key={tech} className="rounded-full bg-zinc-800 px-4 py-2 text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
              <h3 className="text-lg font-bold">Links</h3>

              <div className="mt-6 space-y-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-zinc-700 px-5 py-3 transition hover:border-white"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {gallery.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold">Gallery</h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {gallery.map((img, i) => (
                <button
                  key={img._id || i}
                  onClick={() => setLightbox(img.url)}
                  className="group overflow-hidden rounded-2xl border border-zinc-800"
                >
                  <img
                    src={img.url}
                    alt={`${project.title} gallery ${i + 1}`}
                    className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </Container>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute right-6 top-6 text-white" onClick={() => setLightbox(null)}>
            <FaTimes size={28} />
          </button>
          <img src={lightbox} alt="Gallery preview" className="max-h-[85vh] max-w-full rounded-2xl" />
        </div>
      )}
    </section>
  );
}

export default ProjectDetails;
