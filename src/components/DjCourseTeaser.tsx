export default function DjCourseTeaser() {
  return (
    <section
      aria-label="DJ course coming soon"
      className="border-b border-white/10 bg-black px-4 py-6 md:px-8 md:py-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 text-center md:flex-row md:gap-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[9px] tracking-[0.4em] text-white/50 uppercase md:text-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-latin)]" />
          Coming later this year
        </span>
        <span className="text-chrome text-lg font-black tracking-tight uppercase md:text-2xl">
          DJ Course
        </span>
        <span className="text-[10px] tracking-[0.35em] text-white/40 uppercase md:text-xs">
          / In the works
        </span>
      </div>
    </section>
  );
}
