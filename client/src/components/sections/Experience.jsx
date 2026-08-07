import Container from "@/components/ui/Container";
import { usePortfolio } from "@/context/PortfolioContext";
import { formatDuration } from "@/utils/format";
import Skeleton from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";

function Experience() {
  const { experience, loading, error, retry } = usePortfolio();

  return (
    <section className="bg-background py-28 text-foreground">
      <Container>
        <div className="mb-20 text-center">
          <span className="rounded-full border border-primary px-4 py-2 text-sm text-primary">
            Experience
          </span>

          <h2 className="mt-6 text-5xl font-black">
            My Journey
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            My learning and development journey.
          </p>
        </div>

        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : experience?.length === 0 ? (
          <EmptyState title="No experience" description="Experience entries will appear here once added." />
        ) : (
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-5 top-0 h-full w-[2px] bg-border" />

            {experience?.map((item) => (
              <div key={item._id} className="relative mb-14 pl-16">
                <div className="absolute left-0 top-2 h-10 w-10 rounded-full border-4 border-primary bg-background" />

                <span className="text-sm font-semibold text-primary">
                  {formatDuration(item.startDate, item.endDate, item.current)}
                </span>

                <div className="mt-3 rounded-2xl border border-border bg-card p-8">
                  <h3 className="text-2xl font-bold">{item.position}</h3>

                  <p className="mt-2 text-primary">{item.company}</p>

                  {item.current && (
                    <span className="mt-2 inline-block rounded-full bg-primary/15 px-3 py-1 text-xs text-primary">
                      Current
                    </span>
                  )}

                  <p className="mt-5 leading-8 text-muted">{item.description}</p>

                  {item.technologies?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-surface px-3 py-1 text-xs text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default Experience;