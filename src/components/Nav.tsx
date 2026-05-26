import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "motion/react";

const links = [
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/booking", label: "Booking" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu on route change.
  useEffect(() => setOpen(false), [location.pathname]);

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 md:px-8 md:py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            to="/"
            aria-label="Tanaka — home"
            className="group inline-flex items-center"
          >
            <img
              src={`${import.meta.env.BASE_URL}visuals/logo.svg`}
              alt="tanaka"
              className="h-7 w-auto drop-shadow-[0_0_12px_rgba(109,240,255,0.35)] transition-transform group-hover:scale-105 md:h-9"
            />
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `relative px-4 py-2 text-sm tracking-[0.2em] uppercase transition-colors ${
                        isActive ? "text-white" : "text-white/60 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{l.label}</span>
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute inset-x-3 -bottom-0.5 h-px bg-white"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-[70] grid h-11 w-11 place-items-center rounded-sm border border-white/15 bg-black/60 md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute inset-x-0 top-0 h-[2px] origin-center rounded bg-white transition-transform duration-150 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded bg-white transition-opacity duration-150 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-[2px] origin-center rounded bg-white transition-transform duration-150 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Plain CSS overlay — no Framer remount cost, no GPU-heavy backdrop blur. */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] grid place-items-center bg-black/95 transition-opacity duration-150 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <ul
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center gap-8 text-center"
        >
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className="text-chrome text-5xl font-black tracking-tight uppercase"
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li className="mt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[10px] tracking-[0.4em] text-white/40 uppercase"
            >
              Tap anywhere to close
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
