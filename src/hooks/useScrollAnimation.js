// src/hooks/useScrollAnimation.js

import { useEffect, useRef } from "react";

export function useScrollAnimation() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("scroll-visible");
        } else {
          element.classList.remove("scroll-visible");
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return ref;
}