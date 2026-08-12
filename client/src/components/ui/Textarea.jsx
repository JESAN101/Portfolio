import { forwardRef } from "react";

const Textarea = forwardRef(({ label, error, className = "", id, ...props }, ref) => {
  const textareaId = id || props.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        ref={ref}
        className={`w-full min-h-[100px] px-4 py-3 rounded-xl border border-border/60 bg-surface/50 text-foreground text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y ${error ? "border-red-500" : ""} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
