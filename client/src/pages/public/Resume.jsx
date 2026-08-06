import Container from "@/components/ui/Container";
import { usePortfolio } from "@/context/PortfolioContext";
import { FaDownload } from "react-icons/fa";

function Resume() {
  const { profile } = usePortfolio();

  return (
    <section className="min-h-screen bg-black py-28 text-white">
      <Container>
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-5xl font-black">Resume</h1>

          {profile?.resume && (
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              <FaDownload /> Download Resume
            </a>
          )}
        </div>

        {profile?.resume ? (
          <iframe
            src={profile.resume}
            title="Resume"
            className="h-[75vh] w-full rounded-3xl border border-zinc-800"
          />
        ) : (
          <div className="flex h-[50vh] items-center justify-center rounded-3xl border border-zinc-800 text-zinc-500">
            No resume uploaded yet.
          </div>
        )}
      </Container>
    </section>
  );
}

export default Resume;