import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  images: string[];
  intervalMs?: number;
  alt?: string;
};

export default function ProfileCarousel({
  images,
  intervalMs = 3500,
  alt = "Tanaka",
}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs]);

  // Warm the browser cache for the next image so the crossfade is instant.
  useEffect(() => {
    const next = new Image();
    next.src = images[(index + 1) % images.length];
  }, [index, images]);

  return (
    <div className="relative">
      <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-sm border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent md:max-w-none">
        <AnimatePresence initial={false}>
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={alt}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="scanlines pointer-events-none absolute inset-0" />

        {/* Indicator dots */}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              aria-hidden
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index ? "w-5 bg-white/80" : "w-1 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Chrome reflection accent under the frame */}
      <div
        aria-hidden
        className="mx-auto mt-3 h-px max-w-sm bg-gradient-to-r from-transparent via-white/40 to-transparent md:max-w-none"
      />
    </div>
  );
}
