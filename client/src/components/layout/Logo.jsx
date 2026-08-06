import { Link } from "react-router-dom";
import { usePortfolio } from "@/context/PortfolioContext";

function Logo() {
  const { profile } = usePortfolio();

  return (
    <Link
      to="/"
      className="text-4xl font-black tracking-tight"
    >
      {profile?.fullName?.split(" ")[0] || "Portfolio"}
      <span className="text-yellow-500">.</span>
    </Link>
  );
}

export default Logo;
