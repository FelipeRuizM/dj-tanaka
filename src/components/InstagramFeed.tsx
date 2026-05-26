import { useEffect, useRef } from "react";

const IG_HANDLE = import.meta.env.VITE_INSTAGRAM_HANDLE || "dj.tanaka_";
const BEHOLD_FEED_ID = import.meta.env.VITE_BEHOLD_FEED_ID;

// Behold.so widget script — loaded once per page.
function loadBeholdScript() {
  const SRC = "https://w.behold.so/widget.js";
  if (document.querySelector(`script[src="${SRC}"]`)) return;
  const s = document.createElement("script");
  s.src = SRC;
  s.type = "module";
  s.async = true;
  document.head.appendChild(s);
}

export default function InstagramFeed() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (BEHOLD_FEED_ID) loadBeholdScript();
  }, []);

  return (
    <section className="border-t border-white/10 bg-black px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between md:mb-12">
          <div>
            <p className="text-[10px] tracking-[0.45em] text-white/40 uppercase md:text-xs">
              / Instagram
            </p>
            <h2 className="text-chrome mt-2 text-3xl font-black tracking-tight uppercase md:text-5xl">
              Latest
            </h2>
          </div>
          <a
            href={`https://instagram.com/${IG_HANDLE}`}
            target="_blank"
            rel="noreferrer"
            className="hidden text-xs tracking-[0.3em] text-white/60 uppercase transition-colors hover:text-white md:inline-flex"
          >
            @{IG_HANDLE} →
          </a>
        </div>

        {BEHOLD_FEED_ID ? (
          <div ref={ref}>
            {/* The Behold web component renders here once the script loads. */}
            {/* @ts-expect-error - custom element */}
            <behold-widget feed-id={BEHOLD_FEED_ID} />
          </div>
        ) : (
          // Placeholder grid until a Behold feed ID is configured. Keeps the
          // layout intact and the page testable.
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <a
                key={i}
                href={`https://instagram.com/${IG_HANDLE}`}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square overflow-hidden rounded-sm border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent"
              >
                <div className="absolute inset-0 grid place-items-center text-white/30 transition-colors group-hover:text-white">
                  <span className="text-xs tracking-[0.3em] uppercase">@{IG_HANDLE}</span>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <a
            href={`https://instagram.com/${IG_HANDLE}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center rounded-full border border-white/30 px-6 text-xs tracking-[0.3em] uppercase"
          >
            @{IG_HANDLE} →
          </a>
        </div>
      </div>
    </section>
  );
}
