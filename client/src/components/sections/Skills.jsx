import Container from "@/components/ui/Container";
import skills from "@/data/skills";

function Skills() {
  return (
    <section className="bg-black py-28 text-white">
      <Container>
        <div className="mb-16 text-center">
          <span className="rounded-full border border-blue-500 px-4 py-2 text-sm text-blue-400">
            Skills
          </span>

          <h2 className="mt-6 text-5xl font-black">
            Technologies I Use
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            My primary tech stack for building modern web applications.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <div
                key={skill.name}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-blue-500"
              >
                <div className={`mb-5 flex justify-center ${skill.color}`}>
                  <Icon size={42} />
                </div>

                <h3 className="text-lg font-semibold">
                  {skill.name}
                </h3>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Skills;