import { Inbox } from "lucide-react";

// FIX: this used to switch between hardcoded white/zinc text and
// theme-token text based on a manually-passed `dark` prop. Now that
// the public sections use `bg-background`/`bg-card` correctly, a
// single token-based style works everywhere — the `dark` prop is
// still accepted (and ignored) so no call site needs to change.
export default function EmptyState({
  icon: Icon = Inbox,
  title = "No data",
  description = "Nothing here yet.",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 rounded-2xl mb-4 bg-surface">
        <Icon className="w-8 h-8 text-muted" />
      </div>
      <h3 className="text-lg font-medium mb-1 text-foreground">{title}</h3>
      <p className="text-sm max-w-sm text-muted">{description}</p>
    </div>
  );
}