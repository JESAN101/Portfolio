import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import {
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiPhp,
  SiHtml5,
  SiCss,
  SiMysql,
} from "react-icons/si";

// Keeps the tech icons in the hero, but instead of orbiting the
// profile picture they now flow horizontally in a seamless marquee
// strip under it. Content is duplicated so the `-50%` translate loops
// with no jump. Brand colors read fine on both themes; Express/GitHub
// use `text-foreground` so they stay visible in light mode too.
const icons = [
  { icon: <FaReact />, color: "text-cyan-400" },
  { icon: <SiJavascript />, color: "text-yellow-400" },
  { icon: <SiMongodb />, color: "text-green-500" },
  { icon: <FaNodeJs />, color: "text-green-400" },
  { icon: <SiExpress />, color: "text-foreground" },
  { icon: <FaGitAlt />, color: "text-orange-500" },
  { icon: <FaGithub />, color: "text-foreground" },
  { icon: <SiTailwindcss />, color: "text-sky-400" },
  { icon: <SiPhp />, color: "text-indigo-400" },
  { icon: <SiHtml5 />, color: "text-orange-500" },
  { icon: <SiCss />, color: "text-blue-500" },
  { icon: <SiMysql />, color: "text-sky-600" },
];

function TechMarquee() {
  const loopItems = [...icons, ...icons];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-card/60 py-3 backdrop-blur-xl">
      <motion.div
        className="flex w-max items-center gap-3 will-change-transform px-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {loopItems.map((item, index) => (
          <div
            key={index}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card shadow-sm ${item.color}`}
          >
            <span className="text-2xl">{item.icon}</span>
          </div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

export default TechMarquee;
