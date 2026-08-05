import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";

import {
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";

const skills = [
  {
    name: "React",
    icon: FaReact,
    color: "text-cyan-400",
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    color: "text-green-500",
  },
  {
    name: "Express",
    icon: SiExpress,
    color: "text-white",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "text-green-400",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "text-yellow-400",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "text-sky-400",
  },
  {
    name: "HTML5",
    icon: FaHtml5,
    color: "text-orange-500",
  },
  {
    name: "CSS3",
    icon: FaCss3Alt,
    color: "text-blue-500",
  },
  {
    name: "Git",
    icon: FaGitAlt,
    color: "text-orange-500",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    color: "text-white",
  },
];

export default skills;