import { Link } from "react-router-dom";

const IG_HANDLE = import.meta.env.VITE_INSTAGRAM_HANDLE || "itistanaka";
const YOUTUBE_URL = "https://www.youtube.com/@matheustanaka5385";
const SOUNDCLOUD_URL =
  "https://soundcloud.com/matt-tanaka-942814406?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing";
const SPOTIFY_URL =
  "https://open.spotify.com/user/matheustanaka68?si=jBwtsUgrTPmEM6N4RvwKrQ";

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
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-xs tracking-[0.2em] text-white/70 uppercase transition-colors hover:border-white/50 hover:text-white"
          >
            <InstagramIcon />
            <span className="hidden sm:inline">@{IG_HANDLE}</span>
          </a>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube channel"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-xs tracking-[0.2em] text-white/70 uppercase transition-colors hover:border-white/50 hover:text-white"
          >
            <YouTubeIcon />
            <span className="hidden sm:inline">YouTube</span>
          </a>
          <a
            href={SOUNDCLOUD_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="SoundCloud"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-xs tracking-[0.2em] text-white/70 uppercase transition-colors hover:border-white/50 hover:text-white"
          >
            <SoundCloudIcon />
            <span className="hidden sm:inline">SoundCloud</span>
          </a>
          <a
            href={SPOTIFY_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Spotify"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-xs tracking-[0.2em] text-white/70 uppercase transition-colors hover:border-white/50 hover:text-white"
          >
            <SpotifyIcon />
            <span className="hidden sm:inline">Spotify</span>
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

function SoundCloudIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M1.18 12.6c-.06 0-.1.04-.11.1l-.2 1.7.2 1.66c.01.06.05.1.11.1.05 0 .1-.04.1-.1l.24-1.66-.24-1.7c0-.06-.05-.1-.1-.1zm1.03-.93c-.06 0-.11.05-.12.11l-.27 2.62.27 2.55c.01.06.06.11.12.11.06 0 .11-.05.11-.11l.31-2.55-.31-2.62c0-.06-.05-.11-.11-.11zm1.06-.36c-.07 0-.13.05-.13.13l-.25 2.96.25 2.84c0 .07.06.13.13.13.07 0 .12-.06.13-.13l.29-2.84-.29-2.96c-.01-.07-.06-.13-.13-.13zm1.08-.13c-.08 0-.14.06-.14.14l-.24 3.08.24 2.96c0 .08.06.14.14.14.07 0 .14-.06.14-.14l.27-2.96-.27-3.08c0-.08-.07-.14-.14-.14zm1.1.1c-.08 0-.15.07-.15.15l-.22 2.97.22 2.96c0 .08.07.15.15.15.08 0 .15-.07.15-.15l.25-2.96-.25-2.97c0-.08-.07-.15-.15-.15zm1.13-1.1c-.09 0-.16.07-.16.16l-.21 4.06.21 2.94c0 .09.07.16.16.16.09 0 .16-.07.16-.16l.24-2.94-.24-4.06c0-.09-.07-.16-.16-.16zm1.14-.74c-.1 0-.17.08-.17.17l-.2 4.79.2 2.92c0 .09.07.17.17.17.09 0 .17-.08.17-.17l.22-2.92-.22-4.79c0-.09-.08-.17-.17-.17zm1.16-.3c-.1 0-.18.08-.18.18l-.18 5.08.18 2.9c0 .1.08.18.18.18.1 0 .18-.08.18-.18l.2-2.9-.2-5.08c0-.1-.08-.18-.18-.18zm1.17.05c-.1 0-.19.08-.19.19l-.17 5.02.17 2.88c0 .11.09.19.19.19.11 0 .19-.08.19-.19l.19-2.88-.19-5.02c0-.11-.08-.19-.19-.19zm1.19-.71c-.11 0-.2.09-.2.2l-.16 5.72.16 2.86c0 .11.09.2.2.2.11 0 .2-.09.2-.2l.18-2.86-.18-5.72c0-.11-.09-.2-.2-.2zm1.32-1.34c-.12 0-.21.1-.21.21l-.14 7.05.14 2.84c0 .12.1.21.21.21.12 0 .21-.09.22-.21l.16-2.84-.16-7.05c-.01-.12-.1-.21-.22-.21zm1.21.2c-.12 0-.22.1-.22.22l-.13 6.84.13 2.82c0 .12.1.22.22.22.12 0 .22-.1.22-.22l.15-2.82-.15-6.84c0-.12-.1-.22-.22-.22zm1.36-.86c-.13 0-.23.1-.23.23l-.12 7.47.12 2.8c0 .12.1.23.23.23.13 0 .23-.1.23-.23l.13-2.8-.13-7.47c0-.13-.1-.23-.23-.23zm1.23.13c-.13 0-.24.11-.24.24l-.11 7.33.11 2.78c0 .13.11.24.24.24.13 0 .24-.11.24-.24l.13-2.78-.13-7.33c0-.13-.11-.24-.24-.24zm2.43 3.85c-.34 0-.66.07-.95.19-.2-2.2-2.05-3.93-4.31-3.93-.55 0-1.09.11-1.56.29-.18.07-.23.14-.23.28v9.4c0 .14.11.25.25.26h6.8c1.36 0 2.46-1.1 2.46-2.46 0-1.36-1.1-2.47-2.46-2.47z" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.59 14.43a.62.62 0 0 1-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.22c3.81-.87 7.08-.5 9.72 1.11.3.18.39.57.21.86zm1.22-2.72a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 1 1-.45-1.49c3.63-1.1 8.15-.57 11.24 1.33.37.22.48.7.25 1.07zm.11-2.84c-3.23-1.92-8.56-2.1-11.64-1.16a.93.93 0 1 1-.54-1.78c3.54-1.07 9.42-.87 13.14 1.34a.93.93 0 1 1-.96 1.6z" />
    </svg>
  );
}
