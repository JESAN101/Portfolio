import { usePortfolio } from "@/context/PortfolioContext";

// Builds initials from the profile's full name, falling back to "JB"
// so the mark still looks right before the profile has loaded.
function getInitials(fullName) {
  if (!fullName) return "JB";
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function Logo() {
  const { profile } = usePortfolio();
  const initials = getInitials(profile?.fullName);
  const firstName = profile?.fullName?.split(" ")[0] || "Jesan";

  return (
    <div className="group flex items-center gap-3 select-none cursor-default">
      {/* Icon mark: a rounded-square badge with a subtle rotated layer
          behind it for depth, and the initials centered on top. Built
          from shapes + text (not a raster image) so it stays crisp at
          any size and re-colors itself with the theme automatically. */}
      <span className="relative h-10 w-10 shrink-0">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-[14px] bg-primary/25 transition-transform duration-300 group-hover:rotate-[10deg]"
          style={{ transform: "rotate(-8deg)" }}
        />
        <span className="relative flex h-full w-full items-center justify-center rounded-[14px] bg-primary text-base font-bold tracking-tight text-white shadow-sm">
          {initials}
        </span>
      </span>

      <span className="text-2xl font-black tracking-tight text-foreground">
        {firstName}
        <span className="text-primary">.</span>
      </span>
    </div>
  );
}

export default Logo;