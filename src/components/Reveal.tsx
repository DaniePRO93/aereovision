import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in ms before the element animates in. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

/**
 * Scroll-reveal wrapper: fades/slides its child in on first intersection.
 * The element itself is the grid/flow item (extra styles pass straight through),
 * so it can carry grid-column spans without an extra wrapper.
 */
const Reveal = ({ children, delay = 0, className = "", style, id }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => setShown(true), delay);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );
    io.observe(el);

    // Safety: reveal no matter what after 2.6s.
    const fallback = window.setTimeout(() => setShown(true), 2600);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      id={id}
      className={`av-reveal ${shown ? "av-in" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
};

export default Reveal;
