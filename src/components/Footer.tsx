import { Link } from "react-router-dom";

const IG_HANDLE = import.meta.env.VITE_INSTAGRAM_HANDLE || "dj.tanaka_";

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

        <a
          href={`https://instagram.com/${IG_HANDLE}`}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-white/70 transition-colors hover:text-white"
        >
          <span>Instagram</span>
          <span className="text-white/40 transition-colors group-hover:text-white">@{IG_HANDLE}</span>
        </a>

        <p className="text-xs tracking-widest text-white/40 uppercase">
          © {new Date().getFullYear()} Tanaka
        </p>
      </div>
    </footer>
  );
}
