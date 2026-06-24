import PageTransition from "../components/PageTransition";

const IG_HANDLE = import.meta.env.VITE_INSTAGRAM_HANDLE || "itistanaka";

export default function Booking() {
  return (
    <PageTransition>
      <section className="relative grid min-h-dvh place-items-center overflow-hidden px-4 pt-28 pb-20 md:px-8 md:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute top-1/2 left-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[--color-accent-house] opacity-15 blur-[140px]" />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] tracking-[0.45em] text-white/40 uppercase md:text-xs">
            / Booking
          </p>
          <h1 className="text-chrome mt-3 text-5xl leading-[0.95] font-black tracking-tight uppercase md:mt-4 md:text-7xl">
            Let's Build
            <br />
            The Night.
          </h1>

          <p className="mt-8 text-base text-white/75 md:mt-10 md:text-lg">
            For clubs, private events, weddings, and brand activations across British
            Columbia — slide into the DMs with date, city, and the vibe you're going for.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 md:mt-14">
            <a
              href={`https://instagram.com/${IG_HANDLE}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-8 text-sm font-medium tracking-[0.2em] text-black uppercase transition-transform hover:scale-[1.02] md:h-16 md:px-10"
            >
              <span>DM on Instagram</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
              @{IG_HANDLE}
            </p>
          </div>

          <ul className="mt-16 flex flex-wrap justify-center gap-3 text-xs tracking-[0.25em] text-white/50 uppercase md:mt-20">
            {["Clubs", "Private Events", "Weddings", "Brand Activations"].map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/15 px-3 py-1.5"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageTransition>
  );
}
