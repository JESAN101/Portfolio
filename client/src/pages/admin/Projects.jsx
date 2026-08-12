import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Plus,
  Pencil,
  Trash2,
  FolderKanban,
  AlertCircle,
  X,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";
import { projectApi } from "../../services/apiServices";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import TagInput from "../../components/ui/TagInput";
import Select from "../../components/ui/Select";
import Modal from "../../components/ui/Modal";
import SearchBar from "../../components/ui/SearchBar";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import Loader from "../../components/ui/Loader";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Card from "../../components/ui/Card";
import Pagination from "../../components/ui/Pagination";
import ImageUpload from "../../components/ui/ImageUpload";
import Checkbox from "../../components/ui/Checkbox";

const CATEGORIES = ["Web", "Mobile", "Desktop", "UI/UX", "Other"];

const defaultValues = {
  title: "",
  shortDescription: "",
  description: "",
  githubUrl: "",
  liveUrl: "",
  category: "Web",
  featured: false,
  published: true,
  order: 0,
};

function Projects() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const galleryInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

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
      const res = await projectApi.getAll({
        search: debouncedSearch || undefined,
        category: categoryFilter || undefined,
        page,
        limit: 10,
        sort: "-createdAt",
      });
      setItems(res.data.data || []);
      setPagination(
        res.data.pagination || { page: 1, totalPages: 1, total: 0 },
      );
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load projects");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, categoryFilter, page]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openCreate = () => {
    setEditing(null);
    setCoverFile(null);
    setCoverPreview("");
    setGalleryFiles([]);
    setTechnologies([]);
    reset(defaultValues);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setCoverFile(null);
    setCoverPreview(item.coverImage || "");
    setGalleryFiles([]);
    setTechnologies(item.technologies || []);
    reset({
      title: item.title,
      shortDescription: item.shortDescription,
      description: item.description,
      githubUrl: item.githubUrl || "",
      liveUrl: item.liveUrl || "",
      category: item.category,
      featured: item.featured,
      published: item.published,
      order: item.order ?? 0,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
  };

  const onCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  const galleryPreviewUrls = useMemo(
    () => galleryFiles.map((file) => URL.createObjectURL(file)),
    [galleryFiles],
  );

  useEffect(() => {
    const urls = galleryPreviewUrls;
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [galleryPreviewUrls]);

  const onGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles((prev) => [...prev, ...files]);
  };

  const removeGalleryFile = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryImage = async (imageId) => {
    if (!editing) return;
    try {
      await projectApi.deleteGallery(editing._id, imageId);
      setEditing((prev) => ({
        ...prev,
        galleryImages: prev.galleryImages.filter((img) => img._id !== imageId),
      }));
      toast.success("Image removed");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove image");
    }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = {
        title: data.title.trim(),
        shortDescription: data.shortDescription.trim(),
        description: data.description.trim(),
        technologies,
        githubUrl: data.githubUrl || "",
        liveUrl: data.liveUrl || "",
        category: data.category,
        featured: !!data.featured,
        published: !!data.published,
        order: Number(data.order) || 0,
      };

      let projectId = editing?._id;
      if (editing) {
        await projectApi.update(editing._id, payload);
        toast.success("Project updated");
      } else {
        const res = await projectApi.create(payload);
        projectId = res.data.data?._id;
        toast.success("Project created");
      }

      if (coverFile && projectId) {
        const formData = new FormData();
        formData.append("file", coverFile);
        try {
          await projectApi.uploadCover(projectId, formData);
        } catch {
          toast.error("Project saved, but the cover image failed to upload");
        }
      }

      if (galleryFiles.length && projectId) {
        const formData = new FormData();
        galleryFiles.forEach((file) => formData.append("files", file));
        try {
          await projectApi.uploadGallery(projectId, formData);
        } catch {
          toast.error(
            "Project saved, but some gallery images failed to upload",
          );
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
      await projectApi.delete(deleteTarget._id);
      toast.success("Project deleted");
      setDeleteTarget(null);
      if (items.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        await fetchItems();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete project");
    } finally {
      setDeleting(false);
    }
  };

  const togglePublish = async (item) => {
    try {
      await projectApi.togglePublish(item._id);
      setItems((prev) =>
        prev.map((p) =>
          p._id === item._id ? { ...p, published: !p.published } : p,
        ),
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update project");
    }
  };

  const toggleFeature = async (item) => {
    try {
      await projectApi.toggleFeature(item._id);
      setItems((prev) =>
        prev.map((p) =>
          p._id === item._id ? { ...p, featured: !p.featured } : p,
        ),
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update project");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted mt-1">
            Manage the case studies shown on your portfolio.
          </p>
        </div>
        <Button onClick={openCreate} className="shrink-0">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search projects..."
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { value: "", label: "All categories" },
              ...CATEGORIES.map((c) => ({ value: c, label: c })),
            ]}
          />
        </div>
      </div>

      <Card>
        {loading ? (
          <Loader text="Loading projects..." />
        ) : error ? (
          <EmptyState
            icon={AlertCircle}
            title="Failed to load"
            description={error}
          />
        ) : items.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="No projects yet"
            description="Add your first project to showcase your work."
          />
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
                  <div className="w-16 h-12 rounded-lg bg-surface border border-border overflow-hidden shrink-0">
                    {item.coverImage ? (
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FolderKanban className="w-5 h-5 text-muted" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground truncate">
                        {item.title}
                      </span>
                      <Badge variant="primary">{item.category}</Badge>
                    </div>
                    <p className="text-sm text-muted truncate">
                      {item.shortDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-yellow-500/10"
                      onClick={() => toggleFeature(item)}
                      title={item.featured ? "Unfeature" : "Feature"}
                    >
                      <Star
                        className={`w-4 h-4 ${item.featured ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10"
                      onClick={() => togglePublish(item)}
                      title={item.published ? "Unpublish" : "Publish"}
                    >
                      {item.published ? (
                        <Eye className="w-4 h-4 text-primary" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10"
                      onClick={() => openEdit(item)}
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4 text-muted hover:text-primary transition-colors" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-red-500/10"
                      onClick={() => setDeleteTarget(item)}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-muted hover:text-red-500 transition-colors" />
                    </Button>
                  </div>
                </motion.div>
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

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit Project" : "Add Project"}
        size="xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <ImageUpload
                label="Cover Image"
                preview={coverPreview}
                onUpload={onCoverChange}
                onRemove={() => {
                  setCoverFile(null);
                  setCoverPreview("");
                }}
                className="w-full h-48"
                size="full"
              />
            </div>

            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <Input
                  label="Title"
                  placeholder="E-commerce Dashboard"
                  error={errors.title?.message}
                  {...register("title", { required: "Title is required" })}
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Short Description"
                  placeholder="One-line summary shown in project cards"
                  error={errors.shortDescription?.message}
                  {...register("shortDescription", {
                    required: "Short description is required",
                  })}
                />
              </div>
              <Input
                label="GitHub URL"
                placeholder="https://github.com/..."
                {...register("githubUrl")}
              />
              <Input
                label="Live URL"
                placeholder="https://..."
                {...register("liveUrl")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select
              label="Category"
              options={CATEGORIES.map((c) => ({ value: c, label: c }))}
              {...register("category")}
            />
            <Input label="Order" type="number" {...register("order")} />
            <div className="flex items-end gap-6 pb-2">
              <Checkbox label="Featured" {...register("featured")} />
              <Checkbox label="Published" {...register("published")} />
            </div>
          </div>

          <div className="space-y-6">
            <TagInput
              label="Technologies"
              placeholder="Type a technology and press Enter"
              value={technologies}
              onChange={setTechnologies}
            />

            <Textarea
              label="Full Description"
              placeholder="The problem, your approach, and the outcome..."
              error={errors.description?.message}
              {...register("description", {
                required: "Description is required",
              })}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Gallery
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => galleryInputRef.current?.click()}
              >
                + Add images
              </Button>
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={onGalleryChange}
              />
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
              {editing?.galleryImages?.map((img) => (
                <div
                  key={img._id}
                  className="relative aspect-square rounded-xl overflow-hidden border border-border group"
                >
                  <img
                    src={img.url}
                    alt="Gallery"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingGalleryImage(img._id)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
              {galleryFiles.map((file, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden border border-border group"
                >
                  <img
                    src={galleryPreviewUrls[i]}
                    alt="New gallery"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryFile(i)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
            {!editing?.galleryImages?.length && !galleryFiles.length && (
              <p className="text-xs text-muted text-center py-4 border-2 border-dashed border-border rounded-xl">
                No gallery images yet.
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/60">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete project"
        message={`Delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={deleting}
      />
    </div>
  );
}

export default Projects;
