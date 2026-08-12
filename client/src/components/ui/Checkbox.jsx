import { forwardRef } from "react";

const Checkbox = forwardRef(({ label, className = "", ...props }, ref) => {
  return (
    <label
      className={`flex items-center gap-2.5 cursor-pointer select-none ${className}`}
    >
      <input
        ref={ref}
        type="checkbox"
        className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
        {...props}
      />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
