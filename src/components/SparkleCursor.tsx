import { useEffect, useRef } from "react";

// Desktop-only star sparkle that trails the cursor. No-op on touch devices
// or when the user prefers reduced motion.
export default function SparkleCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;

    let raf = 0;
    let tx = -100;
    let ty = -100;
    let x = -100;
    let y = -100;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[60] hidden h-6 w-6 md:block"
      style={{ mixBlendMode: "screen" }}
    >
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <path
          d="M12 1 L13.2 10.8 L22 12 L13.2 13.2 L12 23 L10.8 13.2 L2 12 L10.8 10.8 Z"
          fill="white"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}
