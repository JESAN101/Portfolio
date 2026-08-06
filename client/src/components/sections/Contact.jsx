import { useState } from "react";
import Container from "@/components/ui/Container";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { contactApi } from "@/services/publicApi";

function Contact() {
  const { profile } = usePortfolio();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await contactApi.send(form);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

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
          <div className="space-y-6">
            <div className="flex items-center gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <FaEnvelope className="text-3xl text-blue-500" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-zinc-400">{profile?.email || "your@email.com"}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <FaPhoneAlt className="text-3xl text-blue-500" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-zinc-400">{profile?.phone || "Not available"}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <FaMapMarkerAlt className="text-3xl text-blue-500" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-zinc-400">{profile?.location || "Nepal"}</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 outline-none focus:border-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 outline-none focus:border-blue-500"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 outline-none focus:border-blue-500"
            />
            <textarea
              rows="6"
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Message"}
              {!submitting && <FaPaperPlane />}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}

export default Contact;
