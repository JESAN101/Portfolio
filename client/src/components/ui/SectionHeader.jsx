function SectionHeader({ badge, title, subtitle, light = false }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {badge && (
        <span
          className={`inline-flex rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-widest ${
            light
              ? "border-white/10 bg-white/5 text-zinc-300"
              : "border-border bg-surface text-muted"
          }`}
        >
          {badge}
        </span>
      )}

      {title && (
        <h2
          className={`font-heading mt-6 text-4xl font-bold md:text-5xl ${
            light ? "text-white" : "text-foreground"
          }`}
        >
          {title}
        </h2>
      )}

      {subtitle && (
        <p className={`mt-4 text-lg ${light ? "text-zinc-400" : "text-muted"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;