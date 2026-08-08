import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Loader from "../../components/ui/Loader";
import toast from "react-hot-toast";
import { FaCamera, FaTrash } from "react-icons/fa";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/profile");
        setProfile(data.data);
        reset(data.data);
        setTitles(
          data.data?.titles?.length
            ? data.data.titles
            : data.data?.title
              ? [data.data.title]
              : [""]
        );
      } catch {
        setProfile(null);
        setTitles([""]);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [reset]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const { data } = await api.put("/profile/image", formData);
      setProfile(data.data);
      reset(data.data);
      toast.success("Profile image updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async () => {
    if (!profile?.profileImage) return;
    
    setSaving(true);
    try {
      const { data } = await api.delete("/profile/image");
      setProfile(data.data);
      reset(data.data);
      toast.success("Profile image removed");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove image");
    } finally {
      setSaving(false);
    }
  };

  const addTitle = () => setTitles((prev) => [...prev, ""]);
  const changeTitle = (index, value) =>
    setTitles((prev) => prev.map((item, i) => (i === index ? value : item)));
  const removeTitle = (index) =>
    setTitles((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));

  const onSubmit = async (formData) => {
    setSaving(true);
    const payload = {
      ...formData,
      title: titles[0]?.trim() || "",
      titles: titles.map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (profile) {
        const { data } = await api.put("/profile", payload);
        setProfile(data.data);
        toast.success("Profile updated");
      } else {
        const { data } = await api.post("/profile", payload);
        setProfile(data.data);
        toast.success("Profile created");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="font-heading text-3xl font-bold">Profile</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Image Sidebar */}
        <div className="w-full lg:w-1/3 space-y-6">
          <Card className="p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
            <div className="relative group mx-auto w-48 h-48 rounded-full overflow-hidden border-4 border-border shadow-md">
              {profile?.profileImage ? (
                <img 
                  src={profile.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-surface flex items-center justify-center text-muted">
                  No Image
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                  title="Upload New"
                  disabled={uploading}
                >
                  <FaCamera size={20} />
                </button>
                {profile?.profileImage && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="p-3 bg-red-500/50 hover:bg-red-500/70 rounded-full text-white transition-colors"
                    title="Remove"
                    disabled={saving}
                  >
                    <FaTrash size={20} />
                  </button>
                )}
              </div>
              
              {uploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin rounded-full" />
                </div>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
            <p className="mt-4 text-xs text-muted">
              JPG, PNG or WebP. Max 2MB.
            </p>
          </Card>
        </div>

        {/* Profile Details Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-8">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Personal Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Name" {...register("fullName", { required: true })} error={errors.fullName?.message} />
              <Input label="Email" type="email" {...register("email")} />
              <Input label="Phone" {...register("phone")} />
              <Input label="Location" {...register("location")} />
              <Input label="Address" {...register("address")} />
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="availableForWork"
                  {...register("availableForWork")}
                  className="h-4 w-4 rounded border-border bg-card text-primary focus:ring-primary/30"
                />
                <label htmlFor="availableForWork" className="text-sm font-medium text-foreground cursor-pointer">
                  Available for work
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Titles <span className="text-muted">(cycled in the hero typewriter)</span>
              </label>
              <div className="space-y-2">
                {titles.map((title, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={title}
                      onChange={(e) => changeTitle(index, e.target.value)}
                      placeholder={`Title ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="shrink-0"
                      onClick={() => removeTitle(index)}
                      disabled={titles.length <= 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addTitle}>
                + Add Title
              </Button>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">About</h2>
            <Textarea label="Short Bio" {...register("shortBio")} />
            <Textarea label="About" {...register("about")} className="min-h-[200px]" />
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Social Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="GitHub" {...register("socials.github")} />
              <Input label="LinkedIn" {...register("socials.linkedin")} />
              <Input label="Twitter" {...register("socials.twitter")} />
              <Input label="Instagram" {...register("socials.instagram")} />
              <Input label="Facebook" {...register("socials.facebook")} />
            </div>
          </Card>

          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
