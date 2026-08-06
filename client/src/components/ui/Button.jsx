const variants = {
  default: "bg-primary text-white hover:bg-primary/90 shadow-sm",
  destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
  outline: "border border-border bg-transparent hover:bg-surface text-foreground",
  secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-sm",
  ghost: "hover:bg-surface text-muted hover:text-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizes = {
  sm: "h-9 px-3 text-xs rounded-lg",
  md: "h-10 px-4 py-2 text-sm rounded-xl",
  lg: "h-11 px-6 text-sm rounded-xl",
  icon: "h-10 w-10 rounded-xl",
};

export default function Button({ variant = "default", size = "md", className = "", children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
