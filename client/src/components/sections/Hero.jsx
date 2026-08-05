import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";
import Container from "@/components/ui/Container";
import profile from "@/assets/images/profile.jpg";
import TechOrbit from "./TechOrbit";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: "easeOut",
    },
  }),
};

function Hero() {
  return (
    <section className="relative overflow-hidden bg-black pt-24 text-white">
      <div className="absolute left-[-200px] top-20 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[170px]" />
      <div className="absolute bottom-0 right-[-150px] h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[180px]" />

      <Container>
        <div className="grid min-h-[90vh] items-center gap-20 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-300"
            >
              👋 Welcome to my portfolio
            </motion.span>

            <motion.h1
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 text-6xl font-black leading-none md:text-8xl"
            >
              Hi, I'm
              <br />
              <span className="bg-gradient-to-r from-white via-zinc-300 to-blue-500 bg-clip-text text-transparent">
                Bogati
              </span>
            </motion.h1>

            <motion.h2
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 text-3xl font-semibold text-zinc-300"
            >
              Full Stack MERN Developer
            </motion.h2>

            <motion.p
              custom={0.6}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 max-w-xl text-lg leading-9 text-zinc-400"
            >
              I build modern, scalable and high-performance web applications
              using React, Node.js, Express and MongoDB with a strong focus on
              clean UI, performance and user experience.
            </motion.p>

            <motion.div
              custom={0.8}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-12 flex flex-wrap gap-5"
            >
              <button className="flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:scale-105 hover:bg-blue-700">
                View Projects
                <FaArrowRight />
              </button>

              <button className="rounded-xl border border-zinc-700 px-8 py-4 font-semibold transition hover:border-white hover:bg-white hover:text-black">
                Download Resume
              </button>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-14 flex gap-5"
            >
              <a
                href="#"
                className="rounded-full border border-zinc-700 p-4 transition hover:border-white hover:text-white"
              >
                <FaGithub size={22} />
              </a>

              <a
                href="#"
                className="rounded-full border border-zinc-700 p-4 transition hover:border-blue-500 hover:text-blue-500"
              >
                <FaLinkedin size={22} />
              </a>

              <a
                href="#"
                className="rounded-full border border-zinc-700 p-4 transition hover:border-pink-500 hover:text-pink-500"
              >
                <FaInstagram size={22} />
              </a>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="hidden justify-center lg:flex"
          >
           <div className="relative hidden h-[620px] w-[620px] lg:block">
  <TechOrbit />
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl" />

              <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 overflow-hidden
rounded-full border-4 border-zinc-800 shadow-[0_0_80px_rgba(59,130,246,.25)]">
                <img
                  src={profile}
                  alt="Bogati"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;