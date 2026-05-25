// A thin marquee that hints at his live visuals. Right now it loops his
// chrome wordmark with style — once additional transcoded clips are added to
// /public/visuals, swap the static tile list to a video grid.
const TAGS = [
  "Latin",
  "House",
  "Reggaetón",
  "Tech House",
  "Brazilian Funk",
  "Perreo",
  "Open Format",
];

export default function VisualsStrip() {
  return (
    <section
      aria-label="Live set preview"
      className="border-y border-white/10 bg-black py-8 md:py-12"
    >
      <div className="mb-6 px-4 md:px-8">
        <p className="text-[10px] tracking-[0.45em] text-white/40 uppercase md:text-xs">
          / Live set vibe
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* The marquee duplicates its content so the loop is seamless. */}
        <div className="marquee flex w-max items-center gap-12 px-6 will-change-transform">
          {[...TAGS, ...TAGS, ...TAGS, ...TAGS].map((tag, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-chrome text-5xl font-black tracking-tight whitespace-nowrap uppercase md:text-7xl">
                {tag}
              </span>
              <span
                aria-hidden
                className="text-2xl text-white/40 md:text-4xl"
              >
                ✦
              </span>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent md:w-32" />
      </div>
    </section>
  );
}
