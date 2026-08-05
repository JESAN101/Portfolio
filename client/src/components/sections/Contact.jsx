import Container from "@/components/ui/Container";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Contact() {
  return (
    <section className="bg-black py-28 text-white">
      <Container>
        <div className="mb-16 text-center">
          <span className="rounded-full border border-blue-500 px-4 py-2 text-sm text-blue-400">
            Contact
          </span>

          <h2 className="mt-6 text-5xl font-black">
            Let's Work Together
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Have a project in mind? Let's build something amazing together.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left */}
          <div className="space-y-6">
            <div className="flex items-center gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <FaEnvelope className="text-3xl text-blue-500" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-zinc-400">
                  your@email.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <FaPhoneAlt className="text-3xl text-blue-500" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-zinc-400">
                  +977-98XXXXXXXX
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <FaMapMarkerAlt className="text-3xl text-blue-500" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-zinc-400">
                  Nepal
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <form className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 outline-none focus:border-blue-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 outline-none focus:border-blue-500"
            />

            <textarea
              rows="6"
              placeholder="Message"
              className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}

export default Contact;