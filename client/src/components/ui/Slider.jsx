import { forwardRef } from "react";

const Slider = forwardRef(
  (
    { label, error, min = 0, max = 100, step = 1, className = "", ...props },
    ref,
  ) => {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">
              {label}
            </label>
            <span className="text-xs font-bold text-primary">
              {props.value ?? min}%
            </span>
          </div>
        )}
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          className="w-full h-2 rounded-full bg-surface appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Slider.displayName = "Slider";

export default Slider;
