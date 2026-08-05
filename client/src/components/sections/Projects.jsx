import Container from "@/components/ui/Container";
import projects from "@/data/projects";
import { FaArrowRight } from "react-icons/fa";

function Projects() {
  return (
    <section className="bg-zinc-950 py-28 text-white">
      <Container>
        <div className="mb-16 text-center">
          <span className="rounded-full border border-blue-500 px-4 py-2 text-sm text-blue-400">
            Projects
          </span>

          <h2 className="mt-6 text-5xl font-black">
            Featured Projects
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Some of my recent work.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-2 hover:border-blue-500"
            >
              <div className="flex h-56 items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-500">
                Project Image
              </div>

              <div className="p-8">
                <p className="text-sm text-blue-400">
                  {project.category}
                </p>

                <h3 className="mt-3 text-3xl font-bold">
                  {project.title}
                </h3>

                <p className="mt-5 leading-8 text-zinc-400">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-zinc-800 px-3 py-1 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button className="mt-8 flex items-center gap-2 text-blue-400 hover:gap-4 transition-all">
                  View Project
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Projects;