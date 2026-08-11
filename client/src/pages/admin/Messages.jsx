import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Mail, MailOpen, Trash2, AlertCircle, Inbox } from "lucide-react";
import { messageApi } from "../../services/apiServices";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import SearchBar from "../../components/ui/SearchBar";
import Select from "../../components/ui/Select";
import EmptyState from "../../components/ui/EmptyState";
import Loader from "../../components/ui/Loader";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Pagination from "../../components/ui/Pagination";

function StatCard({ label, value, icon: Icon, colorClass }) {
  return (
    <Card className="group p-6 flex items-center gap-4 relative overflow-hidden">
      <div className={`p-4 rounded-2xl bg-surface border border-border/50 transition-colors ${colorClass || "bg-primary/10"}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-3xl font-black text-foreground leading-none">{value}</div>
        <div className="text-xs text-muted mt-2 font-medium uppercase tracking-wider">{label}</div>
      </div>
      
      {/* subtle corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  );
}

function Messages() {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ total: 0, read: 0, unread: 0 });
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [readFilter, setReadFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (search === debouncedSearch) return;
    const timer = setTimeout(() => {
      setPage(1);
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, debouncedSearch]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [listRes, statsRes] = await Promise.all([
        messageApi.getAll({
          search: debouncedSearch || undefined,
          read: readFilter || undefined,
          page,
          limit: 10,
          sort: "-createdAt",
        }),
        messageApi.getStats(),
      ]);
      setItems(listRes.data.data || []);
      setPagination(listRes.data.pagination || { page: 1, totalPages: 1, total: 0 });
      setStats(statsRes.data.data || statsRes.data || { total: 0, read: 0, unread: 0 });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load messages");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, readFilter, page]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const openMessage = async (item) => {
    setSelected(item);
    if (!item.read) {
      try {
        await messageApi.markRead(item._id, true);
        setItems((prev) => prev.map((m) => (m._id === item._id ? { ...m, read: true } : m)));
        setStats((s) => ({ ...s, read: s.read + 1, unread: Math.max(0, s.unread - 1) }));
      } catch {
        // non-fatal — the message still opens even if the read receipt fails
      }
    }
  };

  const toggleRead = async (item) => {
    try {
      await messageApi.markRead(item._id, !item.read);
      setItems((prev) => prev.map((m) => (m._id === item._id ? { ...m, read: !item.read } : m)));
      setStats((s) =>
        !item.read
          ? { ...s, read: s.read + 1, unread: Math.max(0, s.unread - 1) }
          : { ...s, read: Math.max(0, s.read - 1), unread: s.unread + 1 }
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update message");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await messageApi.delete(deleteTarget._id);
      toast.success("Message deleted");
      setDeleteTarget(null);
      setSelected((s) => (s?._id === deleteTarget._id ? null : s));
      if (items.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        await fetchAll();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete message");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* page header */}
      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-primary/60" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            Admin · Inbox
          </span>
        </div>
        <h1 className="font-heading mt-3 text-3xl font-black tracking-tight">Messages</h1>
        <p className="mt-1.5 text-sm text-muted">Enquiries submitted through your contact form.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Total" value={stats.total} icon={Inbox} colorClass="group-hover:bg-blue-500/10 text-blue-500" />
        <StatCard label="Unread" value={stats.unread} icon={Mail} colorClass="group-hover:bg-primary/10 text-primary" />
        <StatCard label="Read" value={stats.read} icon={MailOpen} colorClass="group-hover:bg-emerald-500/10 text-emerald-500" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name, email, or subject..." />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={readFilter}
            onChange={(e) => {
              setReadFilter(e.target.value);
              setPage(1);
            }}
            options={[
              { value: "", label: "All messages" },
              { value: "false", label: "Unread" },
              { value: "true", label: "Read" },
            ]}
          />
        </div>
      </div>

      <Card>
        {loading ? (
          <Loader text="Loading messages..." />
        ) : error ? (
          <EmptyState icon={AlertCircle} title="Failed to load" description={error} />
        ) : items.length === 0 ? (
          <EmptyState icon={Inbox} title="No messages yet" description="Messages sent through your contact form will show up here." />
        ) : (
          <div className="divide-y divide-border">
            <AnimatePresence>
              {items.map((item) => (
                <motion.button
                  key={item._id}
                  type="button"
                  onClick={() => openMessage(item)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full text-left px-6 py-4 flex items-start gap-4 hover:bg-surface/50 transition-colors"
                >
                  <div className="mt-1 shrink-0">
                    {item.read ? (
                      <MailOpen className="w-4 h-4 text-muted" />
                    ) : (
                      <span className="block w-2.5 h-2.5 rounded-full bg-primary" title="Unread" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`truncate ${item.read ? "text-foreground" : "font-semibold text-foreground"}`}>
                        {item.name} <span className="text-muted font-normal">— {item.email}</span>
                      </span>
                      <span className="text-xs text-muted whitespace-nowrap">
                        {format(new Date(item.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>
                    <div className={`truncate text-sm mt-0.5 ${item.read ? "text-muted" : "text-foreground/90"}`}>
                      {item.subject}
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Card>

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
      />

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.subject} size="lg">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <div className="font-medium text-foreground">{selected.name}</div>
                <div className="text-sm text-muted">{selected.email}</div>
              </div>
              <Badge variant={selected.read ? "secondary" : "primary"}>
                {selected.read ? "Read" : "Unread"}
              </Badge>
            </div>
            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{selected.message}</p>
          <div className="flex items-center justify-between pt-4 border-t border-border mt-6">
            <span className="text-xs text-muted">
              Received {format(new Date(selected.createdAt), "MMM d, yyyy 'at' h:mm a")}
            </span>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => toggleRead(selected)}>
                Mark as {selected.read ? "unread" : "read"}
              </Button>
              <Button variant="outline" className="hover:bg-red-500/10 hover:text-red-500" onClick={() => setDeleteTarget(selected)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete message"
        message={`Delete the message from "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={deleting}
      />
    </div>
  );
}

export default Messages;