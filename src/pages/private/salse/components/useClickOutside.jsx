import { useEffect } from "react";

export const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // If the click is inside the ref-ed element, do nothing
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Otherwise, call the handler function (to close the calendar)
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
