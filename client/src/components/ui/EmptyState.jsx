import { Inbox } from "lucide-react";

export default function EmptyState({
  icon: Icon = Inbox,
  title = "No data",
  description = "Nothing here yet.",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="relative mb-4">
        <div className="pointer-events-none absolute -inset-3 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-xl" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-foreground/10 bg-gradient-to-br from-primary/10 to-secondary/10 text-primary shadow-md">
          <Icon className="w-7 h-7" />
        </div>
      </div>
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
    </div>
  );
}
