export default function Card({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-lg shadow-black/5 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 ${className}`}
    >
      {children}
    </div>
  );
}
