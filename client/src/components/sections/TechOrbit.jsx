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
} from "react-icons/si";

const icons = [
  { icon: <FaReact />, x: 0, y: -250, color: "text-cyan-400" },
  { icon: <SiJavascript />, x: 175, y: -175, color: "text-yellow-400" },
  { icon: <SiMongodb />, x: 250, y: 0, color: "text-green-500" },
  { icon: <FaNodeJs />, x: 175, y: 175, color: "text-green-400" },
  { icon: <SiExpress />, x: 0, y: 250, color: "text-white" },
  { icon: <FaGitAlt />, x: -175, y: 175, color: "text-orange-500" },
  { icon: <FaGithub />, x: -250, y: 0, color: "text-white" },
  { icon: <SiTailwindcss />, x: -175, y: -175, color: "text-sky-400" },
];

function TechOrbit() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute inset-0"
    >
      {icons.map((item, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            x: item.x,
            y: item.y,
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900/80 backdrop-blur-xl shadow-xl ${item.color}`}
        >
          <span className="text-3xl">
            {item.icon}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default TechOrbit;