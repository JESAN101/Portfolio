import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import useDialogA11y from "@/hooks/useDialogA11y";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) {
  const dialogRef = useDialogA11y({ isOpen, onClose });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-[90vw]",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full ${sizes[size]} overflow-hidden rounded-[24px] border border-foreground/10 bg-card shadow-2xl shadow-black/20 max-h-[85vh] flex flex-col`}
          >
            {/* gradient top accent */}
            <div className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary via-secondary to-transparent" />
            {/* corner accents */}
            <div className="pointer-events-none absolute -right-[3px] -top-[3px] h-[40%] w-[40%] rounded-tr-[24px] border-r-[3px] border-t-[3px] border-primary/50" />
            <div className="pointer-events-none absolute -bottom-[3px] -left-[3px] h-[40%] w-[40%] rounded-bl-[24px] border-b-[3px] border-l-[3px] border-secondary/50" />

            <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/10">
              <h2 className="text-lg font-bold text-foreground">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-surface text-muted hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
