import { useState, useEffect, useRef, useMemo } from "react";

const TYPE_SPEED = 90;
const DELETE_SPEED = 35;
const HOLD_DELAY = 1500;
const START_DELAY = 400;

export default function useTypewriter(words) {
  const safeWords = useMemo(
    () => (Array.isArray(words) ? words.filter(Boolean) : []),
    [words]
  );
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);
  const wordIndexRef = useRef(0);
  const lastKeyRef = useRef("");
  const wordsKey = safeWords.join("|");

  useEffect(() => {
    if (lastKeyRef.current === wordsKey) return;
    lastKeyRef.current = wordsKey;
    wordIndexRef.current = 0;
    const resetTimeout = setTimeout(() => {
      setText("");
      setDeleting(false);
      setStarted(false);
    }, 0);
    return () => clearTimeout(resetTimeout);
  }, [wordsKey]);

  useEffect(() => {
    if (safeWords.length === 0) return;

    const target = safeWords[wordIndexRef.current % safeWords.length];
    let timeout;

    if (!started) {
      timeout = setTimeout(() => setStarted(true), START_DELAY);
    } else if (!deleting && text === target) {
      timeout = setTimeout(() => setDeleting(true), HOLD_DELAY);
    } else if (deleting && text === "") {
      wordIndexRef.current = (wordIndexRef.current + 1) % safeWords.length;
      timeout = setTimeout(() => setDeleting(false), 60);
    } else {
      const speed = deleting ? DELETE_SPEED : TYPE_SPEED;
      timeout = setTimeout(() => {
        setText(
          target.slice(0, Math.max(0, text.length + (deleting ? -1 : 1)))
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, started, safeWords]);

  return text;
}
