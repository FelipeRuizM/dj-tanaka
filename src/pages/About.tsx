import PageTransition from "../components/PageTransition";

export default function About() {
  return (
    <PageTransition>
      <section className="relative min-h-dvh overflow-hidden px-4 pt-28 pb-20 md:px-8 md:pt-40 md:pb-32">
        {/* Soft dual-tone glow: Latin warm / House cool. Stacks vertically on mobile. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute top-1/4 -left-32 h-[60vmin] w-[60vmin] rounded-full bg-[--color-accent-latin] opacity-20 blur-[120px]" />
          <div className="absolute right-[-15%] bottom-0 h-[55vmin] w-[55vmin] rounded-full bg-[--color-accent-house] opacity-20 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] tracking-[0.45em] text-white/40 uppercase md:text-xs">
            / About
          </p>
          <h1 className="text-chrome mt-3 text-5xl leading-[0.95] font-black tracking-tight uppercase md:mt-4 md:text-7xl">
            Two Worlds.
            <br />
            One Floor.
          </h1>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-white/80 md:mt-14 md:text-lg">
            <p>
              Tanaka is a Vancouver-based DJ blending the heat of Latin rhythms with the
              relentless drive of house music. Born from late-night dance floors and
              early-morning afterparties across BC, his sets move fluidly between
              reggaetón, perreo, tech house, and afro house — built for crowds that want
              to feel something, not just hear something.
            </p>
            <p>
              He plays clubs, private events, and underground parties throughout British
              Columbia, with a sound rooted in groove, identity, and the chrome-tinted
              future he projects on screen.
            </p>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 md:mt-20 md:grid-cols-3 md:pt-14">
            {[
              { k: "Based", v: "British Columbia" },
              { k: "Style", v: "Latin × House" },
              { k: "For", v: "Clubs · Private · Events" },
            ].map((item) => (
              <div key={item.k}>
                <dt className="text-[10px] tracking-[0.4em] text-white/40 uppercase">
                  {item.k}
                </dt>
                <dd className="mt-2 text-base font-medium md:text-lg">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </PageTransition>
  );
}
