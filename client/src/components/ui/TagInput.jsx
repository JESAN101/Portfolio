import { useState } from "react";
import { X } from "lucide-react";

export default function TagInput({
  label,
  value = [],
  onChange,
  placeholder = "Type and press Enter",
  error,
}) {
  const [text, setText] = useState("");

  const addTag = () => {
    const tag = text.trim();
    if (!tag) return;
    if (!value.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      onChange([...value, tag]);
    }
    setText("");
  };

  const removeTag = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !text && value.length) {
      removeTag(value.length - 1);
    }
  };

  const handleBlur = () => {
    if (text.trim()) addTag();
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div
        className={`flex flex-wrap items-center gap-2 min-h-10 w-full px-3 py-2 rounded-xl border border-border bg-card text-sm focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-colors ${error ? "border-red-500" : ""}`}
      >
        {value.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="inline-flex items-center gap-1 pl-2.5 pr-1 py-0.5 rounded-lg bg-primary/10 text-primary text-xs font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="p-0.5 rounded-full hover:bg-primary/20 transition-colors"
              title={`Remove ${tag}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={value.length ? "" : placeholder}
          className="flex-1 min-w-32 bg-transparent text-foreground placeholder:text-muted focus:outline-none"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
