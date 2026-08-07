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

  const inputClass =
    "w-full rounded-xl border border-border bg-surface px-5 py-4 text-foreground placeholder:text-muted outline-none focus:border-primary";

  return (
    <section className="bg-background py-28 text-foreground">
      <Container>
        <div className="mb-16 text-center">
          <span className="rounded-full border border-primary px-4 py-2 text-sm text-primary">
            Contact
          </span>

          <h2 className="mt-6 text-5xl font-black">
            Let's Work Together
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Have a project in mind? Let's build something amazing together.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6">
              <FaEnvelope className="text-3xl text-primary" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted">{profile?.email || "your@email.com"}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6">
              <FaPhoneAlt className="text-3xl text-primary" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted">{profile?.phone || "Not available"}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6">
              <FaMapMarkerAlt className="text-3xl text-primary" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-muted">{profile?.location || "Nepal"}</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-border bg-card p-8"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <textarea
              rows="6"
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-4 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
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