import { forwardRef } from "react";

const Input = forwardRef(({ label, error, className = "", id, ...props }, ref) => {
  const inputId = id || props.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={`w-full h-11 px-4 rounded-xl border border-border/60 bg-surface/50 text-foreground text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${error ? "border-red-500" : ""} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
