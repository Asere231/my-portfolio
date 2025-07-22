import { useEffect, useCallback } from "react";

export function useKeyboardNavigation(handlers = {}) {
  const handleKeyDown = useCallback(
    (e) => {
      // Skip if user is typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      const { key, ctrlKey, metaKey, shiftKey } = e;
      const modifierKey = ctrlKey || metaKey;

      // Handle different key combinations
      switch (key) {
        case "ArrowUp":
          if (handlers.onArrowUp) {
            e.preventDefault();
            handlers.onArrowUp(e);
          }
          break;
        case "ArrowDown":
          if (handlers.onArrowDown) {
            e.preventDefault();
            handlers.onArrowDown(e);
          }
          break;
        case "ArrowLeft":
          if (handlers.onArrowLeft) {
            e.preventDefault();
            handlers.onArrowLeft(e);
          }
          break;
        case "ArrowRight":
          if (handlers.onArrowRight) {
            e.preventDefault();
            handlers.onArrowRight(e);
          }
          break;
        case "Home":
          if (handlers.onHome) {
            e.preventDefault();
            handlers.onHome(e);
          }
          break;
        case "End":
          if (handlers.onEnd) {
            e.preventDefault();
            handlers.onEnd(e);
          }
          break;
        case "Escape":
          if (handlers.onEscape) {
            e.preventDefault();
            handlers.onEscape(e);
          }
          break;
        case "/":
          if (!modifierKey && handlers.onSearch) {
            e.preventDefault();
            handlers.onSearch(e);
          }
          break;
      }
    },
    [handlers]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
