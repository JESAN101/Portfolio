import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { KeyRound, Shield, LogOut, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { authApi } from "../../services/apiServices";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

function Settings() {
  const { admin, logout } = useAuth();
  const [saving, setSaving] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const newPassword = watch("newPassword");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await authApi.updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password updated");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* page header */}
      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-primary/60" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            Admin · Account
          </span>
        </div>
        <h1 className="font-heading mt-3 text-3xl font-black tracking-tight">
          Settings
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          Manage your admin account and password.
        </p>
      </div>

      <Card className="p-6 flex items-center gap-4 relative overflow-hidden group">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary flex items-center justify-center shrink-0 border border-border/50 shadow-sm transition-transform group-hover:scale-110">
          <Shield className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-foreground text-lg">{admin?.name}</div>
          <div className="text-sm text-muted truncate mt-0.5">
            {admin?.email}
          </div>
        </div>
        <Button
          variant="outline"
          onClick={logout}
          className="hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </Button>
      </Card>

      <Card className="p-6 relative overflow-hidden group">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-secondary/5 blur-2xl" />

        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-surface border border-border/50 text-primary shadow-sm">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-foreground">Security</h2>
            <p className="text-xs text-muted mt-0.5">
              Update your password to keep your account secure.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <Input
              label="Current Password"
              type={showCurrent ? "text" : "password"}
              placeholder="••••••••"
              error={errors.currentPassword?.message}
              {...register("currentPassword", {
                required: "Current password is required",
              })}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowCurrent((v) => !v)}
              className="absolute right-3 bottom-3 rounded-lg p-1.5 text-muted transition-colors hover:text-foreground"
              aria-label={showCurrent ? "Hide password" : "Show password"}
            >
              {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          <div className="relative">
            <Input
              label="New Password"
              type={showNew ? "text" : "password"}
              placeholder="••••••••"
              error={errors.newPassword?.message}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
              })}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowNew((v) => !v)}
              className="absolute right-3 bottom-3 rounded-lg p-1.5 text-muted transition-colors hover:text-foreground"
              aria-label={showNew ? "Hide password" : "Show password"}
            >
              {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          <div className="relative">
            <Input
              label="Confirm New Password"
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 bottom-3 rounded-lg p-1.5 text-muted transition-colors hover:text-foreground"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          <div className="flex justify-end pt-4">
            <Button type="submit" size="lg" disabled={saving} className="px-8">
              {saving ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Settings;
