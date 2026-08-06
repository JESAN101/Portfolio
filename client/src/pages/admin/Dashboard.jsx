import { useEffect, useState } from "react";
import api from "../../services/api";
import DashboardStats from "../../components/admin/Dashboard";
import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/dashboard");
        setStats(data.data);
      } catch {
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;
  if (!stats) return null;

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-3xl font-bold">Dashboard</h1>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Recent Projects</h3>
          <div className="space-y-3">
            {stats.recentProjects?.length > 0 ? (
              stats.recentProjects.map((p) => (
                <div key={p._id} className="flex items-center justify-between p-3 rounded-xl bg-surface">
                  <div>
                    <p className="font-medium text-sm">{p.title}</p>
                    <p className="text-xs text-muted">{p.category}</p>
                  </div>
                  <div className="flex gap-2">
                    {p.featured && <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg">Featured</span>}
                    {p.published && <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-lg">Published</span>}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted text-center py-4">No projects yet</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Recent Messages</h3>
          <div className="space-y-3">
            {stats.recentMessages?.length > 0 ? (
              stats.recentMessages.map((m) => (
                <div key={m._id} className="flex items-center justify-between p-3 rounded-xl bg-surface">
                  <div>
                    <p className="font-medium text-sm">{m.subject}</p>
                    <p className="text-xs text-muted">{m.name} — {new Date(m.createdAt).toLocaleDateString()}</p>
                  </div>
                  {!m.read && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted text-center py-4">No messages</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
