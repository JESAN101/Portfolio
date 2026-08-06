import { useCallback, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, GraduationCap, AlertCircle } from "lucide-react";
import api from "../../services/api";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Select from "../../components/ui/Select";
import Modal from "../../components/ui/Modal";
import SearchBar from "../../components/ui/SearchBar";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import Loader from "../../components/ui/Loader";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Card from "../../components/ui/Card";
import Pagination from "../../components/ui/Pagination";

const defaultValues = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  current: false,
  grade: "",
  description: "",
  order: 0,
  isActive: true,
};

const buildParams = (search, activeFilter, page) => ({
  search: search || undefined,
  isActive: activeFilter || undefined,
  page,
  limit: 10,
  sort: "-startDate",
});

function Checkbox({ label, className = "", ...props }) {
  return (
    <label className={`flex items-center gap-2.5 cursor-pointer select-none ${className}`}>
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
        {...props}
      />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </label>
  );
}

function Education() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const current = useWatch({ control, name: "current" });

  useEffect(() => {
    if (search === debouncedSearch) return;
    const timer = setTimeout(() => {
      setPage(1);
      setLoading(true);
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, debouncedSearch]);

  const fetchItems = useCallback(async () => {
    try {
      const res = await api.get("/education", {
        params: buildParams(debouncedSearch, activeFilter, page),
      });
      setItems(res.data.data || []);
      setPagination(res.data.pagination || { page: 1, totalPages: 1, total: 0 });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load education");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, activeFilter, page]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    setLoading(true);
  };

  const openCreate = () => {
    setEditing(null);
    reset(defaultValues);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    reset({
      institution: item.institution,
      degree: item.degree,
      fieldOfStudy: item.fieldOfStudy || "",
      startDate: item.startDate ? format(new Date(item.startDate), "yyyy-MM-dd") : "",
      endDate: item.endDate ? format(new Date(item.endDate), "yyyy-MM-dd") : "",
      current: item.current,
      grade: item.grade || "",
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

  const onSubmit = async (data) => {
    setSaving(true);
    setLoading(true);
    try {
      const payload = {
        institution: data.institution.trim(),
        degree: data.degree.trim(),
        fieldOfStudy: data.fieldOfStudy || "",
        startDate: data.startDate,
        endDate: data.current ? null : data.endDate || null,
        current: data.current || false,
        grade: data.grade || "",
        description: data.description || "",
        order: Number(data.order) || 0,
        isActive: data.isActive || false,
      };

      if (editing) {
        await api.put(`/education/${editing._id}`, payload);
        toast.success("Education updated");
      } else {
        await api.post("/education", payload);
        toast.success("Education created");
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
    setLoading(true);
    try {
      await api.delete(`/education/${deleteTarget._id}`);
      toast.success("Education deleted");
      setDeleteTarget(null);
      if (items.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        await fetchItems();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete education");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Education</h1>
          <p className="text-sm text-muted mt-1">
            Manage your academic background and degrees.
          </p>
        </div>
        <Button onClick={openCreate} className="shrink-0">
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by institution, degree, or field of study..."
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={activeFilter}
            onChange={(e) => {
              setActiveFilter(e.target.value);
              setPage(1);
              setLoading(true);
            }}
            options={[
              { value: "", label: "All statuses" },
              { value: "true", label: "Active" },
              { value: "false", label: "Inactive" },
            ]}
          />
        </div>
      </div>

      <Card>
        {loading ? (
          <Loader text="Loading education..." />
        ) : error ? (
          <EmptyState
            icon={AlertCircle}
            title="Failed to load"
            description={error}
          />
        ) : items.length === 0 ? (
          <EmptyState
            icon={GraduationCap}
            title="No education yet"
            description="Get started by adding your first academic entry."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted">
                  <th className="px-6 py-4">Institution</th>
                  <th className="px-6 py-4">Degree</th>
                  <th className="px-6 py-4">Field of Study</th>
                  <th className="px-6 py-4">Start Date</th>
                  <th className="px-6 py-4">End Date</th>
                  <th className="px-6 py-4">Grade</th>
                  <th className="px-6 py-4">Active</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.tr
                      key={item._id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="border-b border-border last:border-0 hover:bg-surface/50"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-foreground">{item.institution}</div>
                      </td>
                      <td className="px-6 py-4 text-foreground">{item.degree}</td>
                      <td className="px-6 py-4 text-muted">{item.fieldOfStudy || "—"}</td>
                      <td className="px-6 py-4 text-muted whitespace-nowrap">
                        {format(new Date(item.startDate), "MMM yyyy")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.current ? (
                          <Badge variant="primary">Current</Badge>
                        ) : item.endDate ? (
                          <span className="text-muted">
                            {format(new Date(item.endDate), "MMM yyyy")}
                          </span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-muted">{item.grade || "—"}</td>
                      <td className="px-6 py-4">
                        <Badge variant={item.isActive ? "success" : "secondary"}>
                          {item.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(item)}
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteTarget(item)}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit Education" : "Add Education"}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <Input
                label="Institution"
                placeholder="Stanford University"
                error={errors.institution?.message}
                {...register("institution", { required: "Institution is required" })}
              />
            </div>
            <Input
              label="Degree"
              placeholder="Bachelor of Science"
              error={errors.degree?.message}
              {...register("degree", { required: "Degree is required" })}
            />
            <Input
              label="Field of Study"
              placeholder="Computer Science"
              {...register("fieldOfStudy")}
            />
            <Input
              label="Start Date"
              type="date"
              error={errors.startDate?.message}
              {...register("startDate", { required: "Start date is required" })}
            />
            <Input
              label="End Date"
              type="date"
              disabled={current}
              error={errors.endDate?.message}
              {...register("endDate", {
                validate: (value) => {
                  if (getValues("current")) return true;
                  if (!value) return true;
                  if (getValues("startDate") && value < getValues("startDate")) {
                    return "End date must be after start date";
                  }
                  return true;
                },
              })}
            />
            <Input
              label="Grade"
              placeholder="3.8 / 4.0"
              {...register("grade")}
            />
            <div>
              <Input
                label="Order"
                type="number"
                placeholder="0"
                {...register("order")}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-6">
            <Checkbox label="I currently attend here" {...register("current")} />
            <Checkbox label="Active" {...register("isActive")} />
          </div>

          <Textarea
            label="Description"
            placeholder="Describe your studies, achievements, and activities..."
            {...register("description")}
          />

          <div className="flex justify-end gap-3 pt-2">
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
        title="Delete education"
        message={`Are you sure you want to delete "${deleteTarget?.institution}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={deleting}
      />
    </div>
  );
}

export default Education;
