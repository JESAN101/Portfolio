import { useRef } from "react";
import { ImagePlus, X, Upload } from "lucide-react";
import Button from "./Button";

export default function ImageUpload({
  label,
  preview,
  onUpload,
  onRemove,
  loading,
  className = "",
  size = "md",
}) {
  const fileInputRef = useRef(null);

  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div
        className={`relative group ${sizes[size]} rounded-2xl border-2 border-dashed border-border overflow-hidden bg-surface`}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
              >
                <Upload className="w-5 h-5 text-white" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onRemove}
                disabled={loading}
              >
                <X className="w-5 h-5 text-white" />
              </Button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="w-full h-full flex flex-col items-center justify-center text-muted hover:text-primary transition-colors"
          >
            <ImagePlus className="w-8 h-8 mb-1" />
            <span className="text-[10px] uppercase font-bold">Upload</span>
          </button>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={onUpload}
        />
        {loading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}
