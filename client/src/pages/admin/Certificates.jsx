import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Award, AlertCircle, ImagePlus, ExternalLink } from "lucide-react";
import { certificateApi } from "../../services/apiServices";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Modal from "../../components/ui/Modal";
import SearchBar from "../../components/ui/SearchBar";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import Loader from "../../components/ui/Loader";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Card from "../../components/ui/Card";
import Pagination from "../../components/ui/Pagination";

const defaultValues = {
  title: "",
  issuer: "",
  issuedDate: "",
  expiryDate: "",
  credentialId: "",
  credentialUrl: "",
  description: "",
  order: 0,
  isActive: true,
};

function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary cursor-pointer" {...props} />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </label>
  );
}

function Certificates() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues });

  useEffect(() => {
    if (search === debouncedSearch) return;
    const timer = setTimeout(() => {
      setPage(1);
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, debouncedSearch]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await certificateApi.getAll({
        search: debouncedSearch || undefined,
        page,
        limit: 10,
        sort: "-issuedDate",
      });
      setItems(res.data.data || []);
      setPagination(res.data.pagination || { page: 1, totalPages: 1, total: 0 });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load certificates");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openCreate = () => {
    setEditing(null);
    setImageFile(null);
    setImagePreview("");
    reset(defaultValues);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setImageFile(null);
    setImagePreview(item.image || "");
    reset({
      title: item.title,
      issuer: item.issuer,
      issuedDate: item.issuedDate ? format(new Date(item.issuedDate), "yyyy-MM-dd") : "",
      expiryDate: item.expiryDate ? format(new Date(item.expiryDate), "yyyy-MM-dd") : "",
      credentialId: item.credentialId || "",
      credentialUrl: item.credentialUrl || "",
      description: item.description || "",
      order: item.order ?? 0,
      isActive: item.isActive,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
  };

  const onImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = {
        title: data.title.trim(),
        issuer: data.issuer.trim(),
        issuedDate: data.issuedDate || null,
        expiryDate: data.expiryDate || null,
        credentialId: data.credentialId || "",
        credentialUrl: data.credentialUrl || "",
        description: data.description || "",
        order: Number(data.order) || 0,
        isActive: !!data.isActive,
      };

      let certId = editing?._id;
      if (editing) {
        await certificateApi.update(editing._id, payload);
        toast.success("Certificate updated");
      } else {
        const res = await certificateApi.create(payload);
        certId = res.data.data?._id;
        toast.success("Certificate created");
      }

      if (imageFile && certId) {
        const formData = new FormData();
        formData.append("file", imageFile);
        try {
          await certificateApi.uploadImage(certId, formData);
        } catch {
          toast.error("Certificate saved, but the image failed to upload");
        }
      }

      setModalOpen(false);
      await fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await certificateApi.delete(deleteTarget._id);
      toast.success("Certificate deleted");
      setDeleteTarget(null);
      if (items.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        await fetchItems();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete certificate");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Certificates</h1>
          <p className="text-sm text-muted mt-1">Manage the certifications shown on your portfolio.</p>
        </div>
        <Button onClick={openCreate} className="shrink-0">
          <Plus className="w-4 h-4" />
          Add Certificate
        </Button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search by title or issuer..." />

      <Card>
        {loading ? (
          <Loader text="Loading certificates..." />
        ) : error ? (
          <EmptyState icon={AlertCircle} title="Failed to load" description={error} />
        ) : items.length === 0 ? (
          <EmptyState icon={Award} title="No certificates yet" description="Add your first certification." />
        ) : (
          <div className="divide-y divide-border">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-surface/50"
                >
                  <div className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center overflow-hidden shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <Award className="w-5 h-5 text-muted" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground truncate">{item.title}</span>
                      {!item.isActive && <Badge variant="secondary">Hidden</Badge>}
                    </div>
                    <div className="text-sm text-muted truncate">
                      {item.issuer}
                      {item.issuedDate && ` · ${format(new Date(item.issuedDate), "MMM yyyy")}`}
                    </div>
                  </div>
                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted hover:text-primary shrink-0"
                      title="View credential"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(item)} title="Edit">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(item)} title="Delete">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Card>

      <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} onPageChange={setPage} />

      <Modal isOpen={modalOpen} onClose={closeModal} title={editing ? "Edit Certificate" : "Add Certificate"} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 rounded-xl border border-dashed border-border flex items-center justify-center overflow-hidden shrink-0 hover:border-primary transition-colors"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Certificate preview" className="w-full h-full object-cover" />
              ) : (
                <ImagePlus className="w-5 h-5 text-muted" />
              )}
            </button>
            <div className="text-sm">
              <button type="button" onClick={() => fileInputRef.current?.click()} className="text-primary font-medium hover:underline">
                Upload certificate image
              </button>
              <p className="text-muted mt-0.5">A scan or screenshot of the certificate.</p>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onImageChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Title"
              placeholder="AWS Certified Solutions Architect"
              error={errors.title?.message}
              {...register("title", { required: "Title is required" })}
            />
            <Input
              label="Issuer"
              placeholder="Amazon Web Services"
              error={errors.issuer?.message}
              {...register("issuer", { required: "Issuer is required" })}
            />
            <Input label="Issued Date" type="date" {...register("issuedDate")} />
            <Input label="Expiry Date" type="date" {...register("expiryDate")} />
            <Input label="Credential ID" placeholder="ABC-12345" {...register("credentialId")} />
            <Input label="Credential URL" placeholder="https://..." {...register("credentialUrl")} />
            <Input label="Order" type="number" {...register("order")} />
          </div>

          <Textarea label="Description" placeholder="What this certification covers..." {...register("description")} />

          <Checkbox label="Visible on the public site" {...register("isActive")} />

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : editing ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete certificate"
        message={`Delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={deleting}
      />
    </div>
  );
}

export default Certificates;