import { FolderKanban, BrainCircuit, Briefcase, Mail } from "lucide-react";
import Card from "../../components/ui/Card";

export default function Dashboard({ stats }) {
  const items = [
    {
      label: "Projects",
      value: stats?.counts?.projects || 0,
      icon: FolderKanban,
      iconClass: "from-blue-500 to-cyan-400",
      textClass: "text-blue-500",
    },
    {
      label: "Skills",
      value: stats?.counts?.skills || 0,
      icon: BrainCircuit,
      iconClass: "from-emerald-500 to-teal-400",
      textClass: "text-emerald-500",
    },
    {
      label: "Experience",
      value: stats?.counts?.experiences || 0,
      icon: Briefcase,
      iconClass: "from-purple-500 to-fuchsia-400",
      textClass: "text-purple-500",
    },
    {
      label: "Messages",
      value: stats?.counts?.unreadMessages || 0,
      icon: Mail,
      iconClass: "from-rose-500 to-pink-400",
      textClass: "text-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="group p-6">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.iconClass} text-white shadow-lg shadow-black/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
            >
              <item.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-3xl font-black leading-none text-foreground">{item.value}</p>
              <p className="mt-1.5 text-sm font-medium text-muted">{item.label}</p>
            </div>
          </div>
          <div className={`mt-4 h-1 w-0 rounded-full bg-gradient-to-r ${item.iconClass} transition-all duration-500 group-hover:w-full`} />
        </Card>
      ))}
    </div>
  );
}
