import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-xl border border-zinc-700 p-3 transition hover:border-white"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

export default ThemeToggle;