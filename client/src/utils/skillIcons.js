import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaDatabase,
  FaCode,
} from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiRedux,
  SiPostgresql,
  SiDocker,
  SiGraphql,
  SiVuedotjs,
  SiAngular,
  SiPython,
  SiFirebase,
  SiBootstrap,
} from "react-icons/si";

const SKILL_ICON_MAP = {
  react: FaReact,
  "node.js": FaNodeJs,
  nodejs: FaNodeJs,
  express: SiExpress,
  expressjs: SiExpress,
  mongodb: SiMongodb,
  javascript: FaJsSquare,
  js: FaJsSquare,
  typescript: SiTypescript,
  ts: SiTypescript,
  "tailwind css": SiTailwindcss,
  tailwind: SiTailwindcss,
  html5: FaHtml5,
  html: FaHtml5,
  css3: FaCss3Alt,
  css: FaCss3Alt,
  git: FaGitAlt,
  github: FaGithub,
  nextjs: SiNextdotjs,
  "next.js": SiNextdotjs,
  redux: SiRedux,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  docker: SiDocker,
  graphql: SiGraphql,
  vue: SiVuedotjs,
  angular: SiAngular,
  python: SiPython,
  firebase: SiFirebase,
  bootstrap: SiBootstrap,
  database: FaDatabase,
};

const DEFAULT_ICON = FaCode;

const SKILL_COLORS = [
  "text-cyan-400",
  "text-green-500",
  "text-yellow-400",
  "text-blue-500",
  "text-sky-400",
  "text-orange-500",
  "text-purple-400",
  "text-pink-400",
  "text-emerald-400",
  "text-red-400",
];

export function getSkillIcon(name) {
  const key = (name || "").toLowerCase().trim();
  return SKILL_ICON_MAP[key] || DEFAULT_ICON;
}

export function getSkillColor(index) {
  return SKILL_COLORS[index % SKILL_COLORS.length];
}
