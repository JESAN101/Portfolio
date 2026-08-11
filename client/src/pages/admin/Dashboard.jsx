import { useEffect, useState } from "react";
import api from "../../services/api";
import DashboardStats from "../../components/admin/Dashboard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted mt-1">Overview of your portfolio performance.</p>
        </div>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="p-6 relative group overflow-hidden">
          {/* subtle ambient glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-opacity group-hover:opacity-100" />
          
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-primary" />
            Recent Projects
          </h3>
          <div className="space-y-3">
            {stats.recentProjects?.length > 0 ? (
              stats.recentProjects.map((p) => (
                <div key={p._id} className="flex items-center justify-between p-3.5 rounded-xl bg-surface/50 border border-border/50 hover:border-primary/30 transition-all hover:-translate-y-0.5">
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{p.title}</p>
                    <p className="text-xs text-muted mt-0.5">{p.category}</p>
                  </div>
                  <div className="flex gap-2 shrink-0 ml-4">
                    {p.featured && <Badge variant="primary" className="text-[10px] px-1.5 py-0">Featured</Badge>}
                    {p.published ? (
                      <Badge variant="success" className="text-[10px] px-1.5 py-0">Public</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Draft</Badge>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <EmptyState title="No projects" description="They'll show up here once created." />
            )}
          </div>
        </Card>

        <Card className="p-6 relative group overflow-hidden">
          {/* subtle ambient glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-secondary/5 blur-2xl transition-opacity group-hover:opacity-100" />

          <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-secondary" />
            Recent Messages
          </h3>
          <div className="space-y-3">
            {stats.recentMessages?.length > 0 ? (
              stats.recentMessages.map((m) => (
                <div key={m._id} className="flex items-center justify-between p-3.5 rounded-xl bg-surface/50 border border-border/50 hover:border-secondary/30 transition-all hover:-translate-y-0.5">
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{m.subject}</p>
                    <p className="text-xs text-muted mt-0.5">{m.name} — {new Date(m.createdAt).toLocaleDateString()}</p>
                  </div>
                  {!m.read && <div className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0 ml-4" title="Unread" />}
                </div>
              ))
            ) : (
              <EmptyState title="No messages" description="When someone contacts you, you'll see it here." />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
