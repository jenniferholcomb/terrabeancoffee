import { useRef, useEffect } from "react";

export function useIntersection() {
  const triggerRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          targetRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      },
      { threshold: .95 }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return { triggerRef, targetRef };
}
