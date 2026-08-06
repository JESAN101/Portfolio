import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Reusable data-fetching hook with abort support.
 *
 * @param {Function} fetcher Stable function returning a Promise.
 *        It may accept an `AbortSignal` as its only argument.
 * @param {Array} deps Dependencies that trigger a refetch when changed.
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const execute = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const result = await fetcher(controller.signal);
      if (!controller.signal.aborted) setData(result);
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(err?.response?.data?.message || err?.message || "Something went wrong.");
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, deps);

  useEffect(() => {
    execute();
    return () => controllerRef.current?.abort();
  }, [execute]);

  return { data, loading, error, refetch: execute };
}
