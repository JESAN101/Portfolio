import Container from "@/components/ui/Container";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import resumePdf from "@/assets/resume/resume.pdf";

function Resume() {
  return (
    <section className="min-h-screen bg-background pt-28 pb-20 text-foreground">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted transition hover:text-foreground"
          >
            <FaArrowLeft /> Back to Home
          </Link>

          <a
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-white transition hover:opacity-90"
          >
            <FaDownload /> Download PDF
          </a>
        </div>

        <div className="mt-8">
          <iframe
            src={resumePdf}
            title="Resume"
            className="h-[85vh] w-full rounded-2xl border border-border bg-card"
          />
        </div>
      </Container>
    </section>
  );
}

export default Resume;
