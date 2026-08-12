import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { usePortfolio } from "@/context/PortfolioContext";
import { getSocialLinks, SOCIAL_HOVER } from "@/utils/socials";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { contactApi } from "@/services/publicApi";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function Contact() {
  const { profile } = usePortfolio();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const socials = getSocialLinks(profile?.socials);

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

  const infoItems = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: profile?.email || "your@email.com",
      href: profile?.email ? `mailto:${profile.email}` : null,
      hover: "hover:border-primary/50 hover:shadow-primary/10",
      iconClass: "text-primary",
      iconHover: "group-hover:bg-primary/10 group-hover:text-primary",
    },
    {
      icon: <FaPhoneAlt />,
      label: "Phone",
      value: profile?.phone || "Not available",
      href: profile?.phone ? `tel:${profile.phone}` : null,
      hover: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
      iconClass: "text-emerald-600 dark:text-emerald-400",
      iconHover: "group-hover:bg-emerald-500/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: profile?.location || "Nepal",
      href: null,
      hover: "hover:border-pink-500/50 hover:shadow-pink-500/10",
      iconClass: "text-pink-600 dark:text-pink-400",
      iconHover: "group-hover:bg-pink-500/10 group-hover:text-pink-600 dark:group-hover:text-pink-400",
    },
  ];

  const inputClass =
    "w-full rounded-xl border border-border bg-surface px-5 py-4 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <section className="relative overflow-hidden bg-background py-28 text-foreground md:py-36">
      {/* ambient accents — same treatment as About/Skills */}
      <div className="pointer-events-none absolute left-[-200px] top-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[170px]" />
      <div className="pointer-events-none absolute bottom-0 right-[-150px] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[180px]" />

      <Container className="relative">
        {/* ---------- Header ---------- */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-primary/60" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Contact
            </span>
            <span className="h-px w-10 bg-primary/60" />
          </div>

          <h2 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl">
            Let's
            <br />
            <span className="relative inline-block text-primary">
              Work Together
              <div className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-primary/60 to-secondary/60" />
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted">
            Have a project in mind or just want to say hi? My inbox is always open —
            I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------- Left column: info + socials ---------- */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5"
          >
            {infoItems.map((item) => {
              const inner = (
                <>
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-foreground/10 bg-gradient-to-br from-primary/10 to-secondary/10 text-xl shadow-md shadow-black/5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${item.iconClass} ${item.iconHover}`}
                  >
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                      {item.label}
                    </h3>
                    <p className="mt-1.5 truncate font-semibold text-foreground">
                      {item.value}
                    </p>
                  </div>
                  {item.href && (
                    <FaArrowRight className="ml-auto hidden text-xs text-muted opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:block" />
                  )}
                </>
              );

              return item.href ? (
                <motion.a
                  key={item.label}
                  variants={fadeUp}
                  href={item.href}
                  className={`group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.hover}`}
                >
                  {inner}
                </motion.a>
              ) : (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className={`group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.hover}`}
                >
                  {inner}
                </motion.div>
              );
            })}

            {/* response time */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-5 rounded-2xl border border-dashed border-border bg-surface/50 p-6"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-foreground/10 bg-gradient-to-br from-amber-400/15 to-orange-500/15 text-xl text-amber-600 dark:text-amber-400">
                <FaClock />
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Response Time
                </h3>
                <p className="mt-1.5 font-semibold text-foreground">
                  Usually within 24 hours
                </p>
              </div>
            </motion.div>

            {/* socials */}
            {socials.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                {socials.map(({ name, url, Icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border border-foreground/15 bg-surface text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 ${
                      SOCIAL_HOVER[name] || "hover:border-primary hover:text-primary hover:shadow-xl hover:shadow-primary/30"
                    }`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* ---------- Right column: form ---------- */}
          <motion.form
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            onSubmit={handleSubmit}
            className="relative rounded-[30px] border border-white/60 bg-white/30 p-8 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 md:p-10"
          >
            {/* corner accents */}
            <div className="pointer-events-none absolute -right-[3px] -top-[3px] h-[40%] w-[40%] rounded-tr-[30px] border-r-[3px] border-t-[3px] border-primary" />
            <div className="pointer-events-none absolute -bottom-[3px] -left-[3px] h-[40%] w-[40%] rounded-bl-[30px] border-b-[3px] border-l-[3px] border-secondary" />

            <div className="relative space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="6"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group flex w-full items-center justify-center gap-3 rounded-full border border-foreground/15 bg-surface px-8 py-4 font-semibold text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>

              <p className="flex items-center justify-center gap-2 text-xs text-muted">
                <FaCheckCircle className="text-emerald-500" />
                Your message goes straight to my inbox.
              </p>
            </div>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}

export default Contact;
