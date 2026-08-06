// FIX: previously toggled between `bg-zinc-200` and a `dark:bg-zinc-800`
// that required the `dark` prop to be passed in manually by every
// caller — and even then relied on Tailwind's `dark:` variant, which
// wasn't wired to the theme toggle (see index.css). `bg-border` is a
// CSS-variable-backed token that already changes with the theme, so a
// single class does the job everywhere, and the old `dark` prop can
// simply be dropped from call sites without breaking anything.
function Skeleton({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-2xl bg-border/60 ${className}`}
    />
  );
}

export default Skeleton;