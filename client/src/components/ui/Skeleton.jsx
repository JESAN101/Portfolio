function Skeleton({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-2xl bg-border/60 ${className}`}
    />
  );
}

export default Skeleton;