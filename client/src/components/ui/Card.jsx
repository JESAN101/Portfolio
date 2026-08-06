export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-card border border-border rounded-2xl overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
