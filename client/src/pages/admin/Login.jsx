import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ThemeToggle from "../../components/layout/ThemeToggle";
import Logo from "../../components/layout/Logo";
import toast from "react-hot-toast";
import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data);
      toast.success("Welcome back!");
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-surface/60 px-5 py-4 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-surface";
  const labelClass =
    "mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-muted";

  return (
    <div className="relative flex min-h-screen bg-background">
      {/* Theme toggle */}
      <div className="absolute right-5 top-5 z-20">
        <ThemeToggle />
      </div>

      {/* Left panel — brand hero (hidden on mobile) */}
      <div className="relative hidden w-1/2 overflow-hidden bg-background lg:flex lg:flex-col lg:items-center lg:justify-center">
        {/* gradient orbs */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[180px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-secondary/20 blur-[170px]" />

        <div className="relative z-10 flex flex-col items-center gap-8 px-12 text-center">
          <Logo />
          <h1 className="max-w-sm text-3xl font-black leading-[1.15] tracking-tight text-foreground">
            Portfolio{" "}
            <span className="relative inline-block text-primary">
              Admin
              <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-primary/60 to-secondary/60" />
            </span>
          </h1>
          <p className="max-w-xs text-sm leading-6 text-muted">
            Manage your projects, skills, experience, and everything else from
            one dashboard.
          </p>
        </div>

        {/* decorative grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        {/* back to site */}
        <div className="absolute left-5 top-5 z-20">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-muted transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25"
          >
            <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Site
          </Link>
        </div>

        {/* mobile logo */}
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <Logo />
          <span className="text-xl font-black text-foreground">Admin</span>
        </div>

        {/* form card */}
        <div className="relative w-full max-w-md rounded-[30px] border border-white/60 bg-white/30 p-8 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-10">
          {/* corner accents */}
          <div className="pointer-events-none absolute -right-[3px] -top-[3px] h-[40%] w-[40%] rounded-tr-[30px] border-r-[3px] border-t-[3px] border-primary" />
          <div className="pointer-events-none absolute -bottom-[3px] -left-[3px] h-[40%] w-[40%] rounded-bl-[30px] border-b-[3px] border-l-[3px] border-secondary" />

          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-foreground/10 bg-gradient-to-br from-primary/15 to-secondary/15 text-primary shadow-md shadow-primary/10">
              <FaLock className="text-xl" />
            </div>
            <h2 className="mt-5 font-heading text-2xl font-bold text-foreground">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-muted">
              Enter your credentials to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label className={labelClass}>Email</label>
              <div className="relative">
                <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted" />
                <input
                  type="email"
                  placeholder="admin@portfolio.com"
                  className={`${inputClass} pl-11 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <div className="relative">
                <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted" />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${inputClass} pl-11 pr-11 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted transition-colors hover:text-foreground"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/40 hover:brightness-110 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <FaLock className="transition-transform duration-300 group-hover:scale-110" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* footer note */}
        <p className="mt-8 max-w-xs text-center text-xs text-muted/70">
          This area is restricted to authorized administrators only.
        </p>
      </div>
    </div>
  );
}

export default Login;
