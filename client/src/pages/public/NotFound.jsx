import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-7xl font-bold">404</h1>

      <p>Page Not Found</p>

      <Link
        to="/"
        className="rounded-lg bg-blue-600 px-6 py-3 text-white"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;