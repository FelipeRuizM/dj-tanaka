import { motion } from "motion/react";

// Editorial photo collage that closes out the home page. Photos live in
// /public/visuals/home-photos as home-1.webp … home-7.webp. Drop more files in
// and extend the COUNT to grow the wall — the masonry reflows on its own.
const COUNT = 8;

export default function HomeGallery() {
  const base = import.meta.env.BASE_URL;
  const photos = Array.from(
    { length: COUNT },
    (_, i) => `${base}visuals/home-photos/home-${i + 1}.webp`,
  );

  return (
    <section
      aria-label="Photo gallery"
      className="border-t border-white/10 bg-black px-4 py-12 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between md:mb-12">
          <p className="text-[10px] tracking-[0.45em] text-white/40 uppercase md:text-xs">
            / In the booth
          </p>
          <span className="text-chrome text-2xl font-black tracking-tight uppercase md:text-4xl">
            Tanaka
          </span>
        </div>

        {/* CSS columns give a natural masonry across the mixed aspect ratios. */}
        <div className="columns-2 gap-3 md:columns-3 md:gap-4 [&>*]:mb-3 md:[&>*]:mb-4">
          {photos.map((src, i) => (
            <motion.figure
              key={src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
            >
              <img
                src={src}
                alt={`Tanaka live ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* VHS scanline wash + a chrome edge glow on hover. */}
              <div className="scanlines pointer-events-none absolute inset-0" />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-[var(--color-accent-house)]/0 transition-all duration-500 group-hover:ring-1 group-hover:ring-[var(--color-accent-house)]/40" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
