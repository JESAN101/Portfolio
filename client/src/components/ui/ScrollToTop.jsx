import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SCROLL_KEY = "scroll:pos";
const { sessionStorage, history } = window;

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const restoreOnRefresh = (e) => {
      if (e.type === "beforeunload") {
        sessionStorage.setItem(SCROLL_KEY, JSON.stringify(window.scrollY));
      }
      if (e.type === "load") {
        try {
          const saved = sessionStorage.getItem(SCROLL_KEY);
          if (saved) {
            sessionStorage.removeItem(SCROLL_KEY);
            const pos = JSON.parse(saved);
            if (typeof pos === "number") {
              window.scrollTo(0, pos);
            }
          }
        } catch {
          sessionStorage.removeItem(SCROLL_KEY);
        }
      }
    };

    const unloadHandler = (e) => restoreOnRefresh(e);
    const loadHandler = (e) => restoreOnRefresh(e);

    history.scrollRestoration = "manual";
    window.addEventListener("beforeunload", unloadHandler);
    window.addEventListener("load", loadHandler);

    return () => {
      window.removeEventListener("beforeunload", unloadHandler);
      window.removeEventListener("load", loadHandler);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
