import { Loader2 } from "lucide-react";

export default function Loader({ size = "md", text }) {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className="relative">
        <div className="pointer-events-none absolute -inset-2 rounded-full bg-primary/20 blur-lg" />
        <Loader2
          className={`${sizes[size]} relative text-primary animate-spin`}
        />
      </div>
      {text && <p className="text-sm font-medium text-muted">{text}</p>}
    </div>
  );
}
