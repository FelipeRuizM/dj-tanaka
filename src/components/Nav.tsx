import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { to: "/about", label: "About" },
  { to: "/shows", label: "Shows" },
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

  return (
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
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/40 backdrop-blur md:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute inset-x-0 top-0 h-px bg-white transition-transform duration-200 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-px bg-white transition-transform duration-200 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 grid place-items-center bg-black/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col items-center gap-8 text-center">
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <NavLink
                    to={l.to}
                    className="text-chrome text-5xl font-black tracking-tight uppercase"
                  >
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
