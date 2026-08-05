import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="text-4xl font-black tracking-tight"
    >
      Bogati
      <span className="text-yellow-500">.</span>
    </Link>
  );
}

export default Logo;