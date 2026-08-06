import { Inbox } from "lucide-react";

export default function EmptyState({
  icon: Icon = Inbox,
  title = "No data",
  description = "Nothing here yet.",
  dark = false,
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center ${dark ? "text-white" : ""}`}>
      <div className={`p-4 rounded-2xl mb-4 ${dark ? "bg-zinc-900" : "bg-surface"}`}>
        <Icon className={`w-8 h-8 ${dark ? "text-zinc-500" : "text-muted"}`} />
      </div>
      <h3 className={`text-lg font-medium mb-1 ${dark ? "text-white" : "text-foreground"}`}>{title}</h3>
      <p className={`text-sm max-w-sm ${dark ? "text-zinc-400" : "text-muted"}`}>{description}</p>
    </div>
  );
}
