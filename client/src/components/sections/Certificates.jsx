import Container from "@/components/ui/Container";
import certificates from "@/data/certificates";
import { FaAward } from "react-icons/fa";

function Certificates() {
  return (
    <section className="bg-zinc-950 py-28 text-white">
      <Container>
        <div className="mb-16 text-center">
          <span className="rounded-full border border-blue-500 px-4 py-2 text-sm text-blue-400">
            Certificates
          </span>

          <h2 className="mt-6 text-5xl font-black">
            Certifications
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:-translate-y-2 hover:border-blue-500"
            >
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-4xl">
                <FaAward />
              </div>

              <h3 className="text-2xl font-bold">
                {certificate.title}
              </h3>

              <p className="mt-3 text-blue-400">
                {certificate.issuer}
              </p>

              <p className="mt-5 text-zinc-400">
                {certificate.year}
              </p>

              <button className="mt-8 rounded-xl border border-blue-500 px-5 py-3 text-blue-400 transition hover:bg-blue-600 hover:text-white">
                View Credential
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Certificates;