import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
      <h1 className="text-7xl font-bold">404</h1>

      <p className="text-muted">Page Not Found</p>

      <Link
        to="/"
        className="rounded-lg bg-primary px-6 py-3 text-white transition hover:scale-105"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;