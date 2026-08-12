import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, BrainCircuit, AlertCircle } from "lucide-react";
import { skillApi } from "../../services/apiServices";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Modal from "../../components/ui/Modal";
import SearchBar from "../../components/ui/SearchBar";
import Badge from "../../components/ui/Badge";
import Checkbox from "../../components/ui/Checkbox";
import EmptyState from "../../components/ui/EmptyState";
import Loader from "../../components/ui/Loader";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Card from "../../components/ui/Card";
import ImageUpload from "../../components/ui/ImageUpload";
import Slider from "../../components/ui/Slider";

const CATEGORIES = ["Frontend", "Backend", "Database", "DevOps", "Design", "Tools", "CyberSecurity", "Programming Languages", "Other"];


const defaultValues = {
  name: "",
  category: "Other",
  proficiency: 50,
  order: 0,
  isActive: true,
};

function Skills() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState("");

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({ defaultValues });
  const proficiency = watch("proficiency");

  useEffect(() => {
    if (search === debouncedSearch) return;
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search, debouncedSearch]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await skillApi.getAll({
        search: debouncedSearch || undefined,
        category: categoryFilter || undefined,
        limit: 100,
        sort: "category,order",
      });
      setItems(res.data.data || []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load skills");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, categoryFilter]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openCreate = () => {
    setEditing(null);
    setIconFile(null);
    setIconPreview("");
    reset(defaultValues);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setIconFile(null);
    setIconPreview(item.icon || "");
    reset({
      name: item.name,
      category: item.category,
      proficiency: item.proficiency,
      order: item.order ?? 0,
      isActive: item.isActive,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
  };

  const onIconChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIconFile(file);
    setIconPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  useEffect(() => {
    return () => {
      if (iconPreview) URL.revokeObjectURL(iconPreview);
    };
  }, [iconPreview]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = {
        name: data.name.trim(),
        category: data.category,
        proficiency: Number(data.proficiency) || 0,
        order: Number(data.order) || 0,
        isActive: !!data.isActive,
      };

      let skillId = editing?._id;
      if (editing) {
        await skillApi.update(editing._id, payload);
        toast.success("Skill updated");
      } else {
        const res = await skillApi.create(payload);
        skillId = res.data.data?._id;
        toast.success("Skill created");
      }

      if (iconFile && skillId) {
        const formData = new FormData();
        formData.append("file", iconFile);
        try {
          await skillApi.uploadIcon(skillId, formData);
        } catch {
          toast.error("Skill saved, but the icon failed to upload");
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
      await skillApi.delete(deleteTarget._id);
      toast.success("Skill deleted");
      setDeleteTarget(null);
      await fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete skill");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* page header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary/60" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
              Admin · Skills
            </span>
          </div>
          <h1 className="font-heading mt-3 text-3xl font-black tracking-tight">Skills</h1>
          <p className="mt-1.5 text-sm text-muted">Manage the tech stack shown on your portfolio.</p>
        </div>
        <Button onClick={openCreate} className="shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40">
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search skills..." />
        </div>
        <div className="w-full sm:w-56">
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[{ value: "", label: "All categories" }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]}
          />
        </div>
      </div>

      <Card>
        {loading ? (
          <Loader text="Loading skills..." />
        ) : error ? (
          <EmptyState icon={AlertCircle} title="Failed to load" description={error} />
        ) : items.length === 0 ? (
          <EmptyState icon={BrainCircuit} title="No skills yet" description="Add the technologies you work with." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-2xl border border-foreground/10 bg-card p-4 shadow-lg shadow-black/5 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="w-12 h-12 rounded-xl border border-foreground/10 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-110">
                    {item.icon ? (
                      <img src={item.icon} alt={item.name} className="w-6 h-6 object-contain" />
                    ) : (
                      <BrainCircuit className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground truncate">{item.name}</span>
                      {!item.isActive && <Badge variant="secondary">Hidden</Badge>}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="primary">{item.category}</Badge>
                      <span className="text-xs text-muted">{item.proficiency}%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-foreground/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 group-hover:brightness-110"
                        style={{ width: `${item.proficiency}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
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

      <Modal isOpen={modalOpen} onClose={closeModal} title={editing ? "Edit Skill" : "Add Skill"} size="md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <ImageUpload
            label="Icon"
            preview={iconPreview}
            onUpload={onIconChange}
            onRemove={() => { setIconFile(null); setIconPreview(""); }}
            loading={false}
            size="sm"
          />

          <Input
            label="Name"
            placeholder="React"
            error={errors.name?.message}
            {...register("name", { required: "Skill name is required" })}
          />

          <div className="grid grid-cols-2 gap-5">
            <Select
              label="Category"
              options={CATEGORIES.map((c) => ({ value: c, label: c }))}
              {...register("category")}
            />
            <Input label="Order" type="number" {...register("order")} />
          </div>

          <Slider
            label="Proficiency"
            min={0}
            max={100}
            value={proficiency}
            {...register("proficiency", { valueAsNumber: true })}
          />

          <Checkbox label="Visible on the public site" {...register("isActive")} />

          <div className="flex justify-end gap-3 pt-2 border-t border-foreground/10">
            <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : editing ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete skill"
        message={`Delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={deleting}
      />
    </div>
  );
}

export default Skills;