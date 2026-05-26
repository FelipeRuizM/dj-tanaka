import { Link } from "react-router-dom";

const IG_HANDLE = import.meta.env.VITE_INSTAGRAM_HANDLE || "dj.tanaka_";
const YOUTUBE_URL = "https://www.youtube.com/@matheustanaka5385";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <Link to="/" aria-label="Tanaka — home">
          <img
            src={`${import.meta.env.BASE_URL}visuals/logo.svg`}
            alt="tanaka"
            className="h-8 w-auto opacity-80"
          />
        </Link>

        <nav className="flex items-center gap-2 md:gap-3" aria-label="Social">
          <a
            href={`https://instagram.com/${IG_HANDLE}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Instagram — @${IG_HANDLE}`}
            className="inline-flex h-11 items-center gap-2 rounded-sm border border-white/15 px-4 text-xs tracking-[0.2em] text-white/70 uppercase transition-colors hover:border-white/50 hover:text-white"
          >
            <InstagramIcon />
            <span className="hidden sm:inline">@{IG_HANDLE}</span>
          </a>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube channel"
            className="inline-flex h-11 items-center gap-2 rounded-sm border border-white/15 px-4 text-xs tracking-[0.2em] text-white/70 uppercase transition-colors hover:border-white/50 hover:text-white"
          >
            <YouTubeIcon />
            <span className="hidden sm:inline">YouTube</span>
          </a>
        </nav>

        <p className="text-xs tracking-widest text-white/40 uppercase">
          © {new Date().getFullYear()} Tanaka
        </p>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.2 8.8 2.2 12 2.2zm0 1.8c-3.14 0-3.51.01-4.75.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.27.83-.39.39-.63.76-.83 1.27-.15.39-.33.97-.38 2.04C2.67 8.83 2.67 9.2 2.67 12s0 3.17.07 4.41c.05 1.07.23 1.65.38 2.04.2.51.44.88.83 1.27.39.39.76.63 1.27.83.39.15.97.33 2.04.38 1.24.07 1.61.07 4.74.07s3.51 0 4.75-.07c1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.27-.83.39-.39.63-.76.83-1.27.15-.39.33-.97.38-2.04.07-1.24.07-1.61.07-4.41s0-3.17-.07-4.41c-.05-1.07-.23-1.65-.38-2.04a3 3 0 0 0-.83-1.27 3 3 0 0 0-1.27-.83c-.39-.15-.97-.33-2.04-.38C15.51 4 15.14 4 12 4zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zm5.14-2.92a1.16 1.16 0 1 1 0 2.32 1.16 1.16 0 0 1 0-2.32z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.45 3.5 12 3.5 12 3.5s-7.45 0-9.38.58A3 3 0 0 0 .5 6.2C0 8.13 0 12 0 12s0 3.87.5 5.8a3 3 0 0 0 2.12 2.12C4.55 20.5 12 20.5 12 20.5s7.45 0 9.38-.58a3 3 0 0 0 2.12-2.12C24 15.87 24 12 24 12s0-3.87-.5-5.8zM9.6 15.5V8.5L15.8 12 9.6 15.5z" />
    </svg>
  );
}
