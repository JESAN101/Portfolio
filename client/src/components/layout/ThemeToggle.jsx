import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

// FIX: previously this used hardcoded `border-zinc-700` / `hover:border-white`
// classes, which look fine in dark mode but wrong (dark border on a white
// button) in light mode. Now it uses the theme tokens (border-border,
// bg-card, text-foreground) defined in index.css, so it automatically
// adapts to both themes. It also uses `theme` (not the undefined
// `darkMode` the duplicate ui/ThemeToggle.jsx was reading), and animates
// the icon swap for a more premium feel.
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-center justify-center"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.span>
    </button>
  );
}

export default ThemeToggle;