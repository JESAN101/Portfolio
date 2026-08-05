import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="flex min-h-screen flex-col items-center justify-center gap-6">
        <h1 className="text-5xl font-bold">
          Portfolio CMS 🚀
        </h1>

        <p className="text-muted">
          Current Theme: <strong>{theme}</strong>
        </p>

        <button
          onClick={toggleTheme}
          className="rounded-lg bg-primary px-6 py-3 text-white transition hover:scale-105"
        >
          Toggle Theme
        </button>
      </div>
    </main>
  );
}

export default App;