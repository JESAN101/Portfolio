import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Loader from "../../components/ui/Loader";
import toast from "react-hot-toast";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/profile");
        setProfile(data.data);
        reset(data.data);
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [reset]);

  const onSubmit = async (formData) => {
    setSaving(true);
    try {
      if (profile) {
        const { data } = await api.put("/profile", formData);
        setProfile(data.data);
        toast.success("Profile updated");
      } else {
        const { data } = await api.post("/profile", formData);
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
    <div className="space-y-6 max-w-4xl">
      <h1 className="font-heading text-3xl font-bold">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Personal Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" {...register("fullName", { required: true })} error={errors.fullName?.message} />
            <Input label="Title" {...register("title", { required: true })} error={errors.title?.message} />
            <Input label="Email" type="email" {...register("email")} />
            <Input label="Phone" {...register("phone")} />
            <Input label="Location" {...register("location")} />
            <Input label="Address" {...register("address")} />
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
  );
}
