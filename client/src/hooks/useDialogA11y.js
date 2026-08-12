import { useEffect, useRef } from "react";

export default function useDialogA11y({ isOpen, onClose }) {
  const ref = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const dialog = ref.current;
    const previouslyFocused = document.activeElement;

    const getFocusables = () =>
      Array.from(
        dialog.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      );

    const firstFocusable = getFocusables()[0];
    firstFocusable?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current?.();
      }

      if (e.key === "Tab") {
        const items = getFocusables();
        if (items.length === 0) return;

        const firstEl = items[0];
        const lastEl = items[items.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey, true);

    return () => {
      document.removeEventListener("keydown", handleKey, true);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  return ref;
}