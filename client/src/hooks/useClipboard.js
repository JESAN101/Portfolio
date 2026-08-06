import { useCallback, useState } from "react";

export function useClipboard({ onSuccess, onError } = {}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        onSuccess?.();
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(false);
        onError?.();
      }
    },
    [onSuccess, onError]
  );

  return { copied, copy };
}
