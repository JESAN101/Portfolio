import Container from "@/components/ui/Container";
import { usePortfolio } from "@/context/PortfolioContext";
import { FaAward } from "react-icons/fa";
import { formatDate } from "@/utils/format";
import Skeleton from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";

function Certificates() {
  const { certificates, loading, error, retry } = usePortfolio();

  return (
    <section className="bg-background py-28 text-foreground">
      <Container>
        <div className="mb-16 text-center">
          <span className="rounded-full border border-primary px-4 py-2 text-sm text-primary">
            Certificates
          </span>

          <h2 className="mt-6 text-5xl font-black">
            Certifications
          </h2>
        </div>

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-3xl" />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : certificates?.length === 0 ? (
          <EmptyState title="No certificates" description="Certificates will appear here once added." />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {certificates?.map((certificate) => (
              <div
                key={certificate._id}
                className="rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-2 hover:border-primary"
              >
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-4xl text-white overflow-hidden">
                  {certificate.image ? (
                    <img src={certificate.image} alt={certificate.title} className="h-full w-full object-cover" />
                  ) : (
                    <FaAward />
                  )}
                </div>

                <h3 className="text-2xl font-bold">{certificate.title}</h3>

                <p className="mt-3 text-primary">{certificate.issuer}</p>

                {certificate.issuedDate && (
                  <p className="mt-5 text-muted">{formatDate(certificate.issuedDate, { year: "numeric" })}</p>
                )}

                {certificate.credentialUrl && (
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-block rounded-xl border border-primary px-5 py-3 text-primary transition hover:bg-primary hover:text-white"
                  >
                    View Credential
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default Certificates;