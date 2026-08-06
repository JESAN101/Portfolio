import { FolderKanban, BrainCircuit, Briefcase, GraduationCap, Award, Mail } from "lucide-react";
import Card from "../../components/ui/Card";

export default function Dashboard({ stats }) {
  const items = [
    { label: "Projects", value: stats?.counts?.projects || 0, icon: FolderKanban, color: "text-blue-500" },
    { label: "Skills", value: stats?.counts?.skills || 0, icon: BrainCircuit, color: "text-emerald-500" },
    { label: "Experience", value: stats?.counts?.experiences || 0, icon: Briefcase, color: "text-purple-500" },
    { label: "Education", value: stats?.counts?.education || 0, icon: GraduationCap, color: "text-pink-500" },
    { label: "Certificates", value: stats?.counts?.certificates || 0, icon: Award, color: "text-amber-500" },
    { label: "Messages", value: stats?.counts?.unreadMessages || 0, icon: Mail, color: "text-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.label} className="p-6 flex items-center gap-4">
          <div className={`p-4 rounded-2xl bg-surface`}>
            <item.icon className={`w-6 h-6 ${item.color}`} />
          </div>
          <div>
            <p className="text-sm text-muted font-medium">{item.label}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
