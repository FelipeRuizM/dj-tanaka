import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function Hero() {
  const base = import.meta.env.BASE_URL;

  return (
    <section className="relative h-dvh w-full overflow-hidden">
      {/* Black background renders instantly; the video streams in over it. */}
      <div className="absolute inset-0 bg-black" />
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={`${base}visuals/hero.mp4`}
        poster={`${base}visuals/logo.svg`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />

      {/* Vignette + scanline overlay for VHS feel. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      <div className="scanlines pointer-events-none absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-28 text-center md:pb-36">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            to="/events"
            className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-sm border border-white/30 bg-white/5 px-6 text-sm tracking-[0.3em] uppercase backdrop-blur transition-colors hover:border-white/80 hover:bg-white hover:text-black md:h-14 md:px-8"
          >
            <span>Upcoming Events</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll affordance */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center text-[10px] tracking-[0.4em] text-white/40 uppercase">
        Scroll
      </div>
    </section>
  );
}
