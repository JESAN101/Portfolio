import Container from "@/components/ui/Container";
import { usePortfolio } from "@/context/PortfolioContext";
import { formatDuration } from "@/utils/format";
import Skeleton from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";

function Experience() {
  const { experience, loading, error, retry } = usePortfolio();

  return (
    <section className="bg-black py-28 text-white">
      <Container>
        <div className="mb-20 text-center">
          <span className="rounded-full border border-blue-500 px-4 py-2 text-sm text-blue-400">
            Experience
          </span>

          <h2 className="mt-6 text-5xl font-black">
            My Journey
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
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
          <EmptyState dark title="No experience" description="Experience entries will appear here once added." />
        ) : (
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-5 top-0 h-full w-[2px] bg-zinc-800" />

            {experience?.map((item) => (
              <div key={item._id} className="relative mb-14 pl-16">
                <div className="absolute left-0 top-2 h-10 w-10 rounded-full border-4 border-blue-500 bg-black" />

                <span className="text-sm font-semibold text-blue-400">
                  {formatDuration(item.startDate, item.endDate, item.current)}
                </span>

                <div className="mt-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
                  <h3 className="text-2xl font-bold">{item.position}</h3>

                  <p className="mt-2 text-blue-400">{item.company}</p>

                  {item.current && (
                    <span className="mt-2 inline-block rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-400">
                      Current
                    </span>
                  )}

                  <p className="mt-5 leading-8 text-zinc-400">{item.description}</p>

                  {item.technologies?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-zinc-800 px-3 py-1 text-xs"
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
