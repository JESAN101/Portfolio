import Container from "@/components/ui/Container";
import { usePortfolio } from "@/context/PortfolioContext";
import { getSkillIcon, getSkillColor } from "@/utils/skillIcons";
import Skeleton from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";

function Skills() {
  const { skills, loading, error, retry } = usePortfolio();

  return (
    <section className="bg-background py-28 text-foreground">
      <Container>
        <div className="mb-16 text-center">
          <span className="rounded-full border border-primary px-4 py-2 text-sm text-primary">
            Skills
          </span>

          <h2 className="mt-6 text-5xl font-black">
            Technologies I Use
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            My primary tech stack for building modern web applications.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-44 rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : skills?.length === 0 ? (
          <EmptyState title="No skills" description="Skills will appear here once added." />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {skills?.map((skill, index) => {
              const SkillIcon = getSkillIcon(skill.name);
              const color = skill.icon ? "" : getSkillColor(index);

              return (
                <div
                  key={skill._id}
                  className="rounded-2xl border border-border bg-card p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-primary"
                >
                  <div className={`mb-5 flex justify-center ${color}`}>
                    {skill.icon ? (
                      <img src={skill.icon} alt={skill.name} className="w-12 h-12 object-contain" />
                    ) : (
                      <SkillIcon size={42} />
                    )}
                  </div>

                  <h3 className="text-lg font-semibold">
                    {skill.name}
                  </h3>

                  {skill.proficiency > 0 && (
                    <div className="mt-4">
                      <div className="h-1.5 w-full rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-muted">{skill.proficiency}%</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}

export default Skills;