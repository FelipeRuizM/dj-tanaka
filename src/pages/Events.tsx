import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { subscribeShows } from "../lib/shows";
import { firebaseReady } from "../lib/firebase";
import type { Show } from "../types";

const IG_HANDLE = import.meta.env.VITE_INSTAGRAM_HANDLE || "dj.tanaka_";

function formatDate(iso: string): { month: string; day: string; year: string } {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return { month: "", day: iso, year: "" };
  }
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: String(d.getDate()),
    year: String(d.getFullYear()),
  };
}

function formatTime(hhmm: string): string {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return hhmm;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

function formatTimeRange(start: string, end: string): string {
  const s = formatTime(start);
  const e = formatTime(end);
  if (s && e) return `${s} – ${e}`;
  return s || e;
}

export default function Events() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!firebaseReady) {
      setLoaded(true);
      return;
    }
    const unsub = subscribeShows((s) => {
      setShows(s);
      setLoaded(true);
    });
    return () => unsub();
  }, []);

  const upcoming = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return shows.filter((s) => {
      const d = new Date(s.date);
      return Number.isNaN(d.getTime()) || d >= today;
    });
  }, [shows]);

  return (
    <PageTransition>
      <section className="relative min-h-dvh px-4 pt-28 pb-20 md:px-8 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] tracking-[0.45em] text-white/40 uppercase md:text-xs">
            / Upcoming
          </p>
          <h1 className="text-chrome mt-3 text-5xl leading-[0.95] font-black tracking-tight uppercase md:mt-4 md:text-7xl">
            Events
          </h1>

          <div className="mt-12 md:mt-16">
            {!loaded ? (
              <p className="text-white/50">Loading…</p>
            ) : upcoming.length === 0 ? (
              <EmptyState />
            ) : (
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {upcoming.map((show) => (
                  <ShowRow key={show.id} show={show} />
                ))}
              </ul>
            )}
          </div>

          <p className="mt-16 text-xs tracking-[0.3em] text-white/40 uppercase md:mt-24">
            More dates drop on{" "}
            <a
              href={`https://instagram.com/${IG_HANDLE}`}
              target="_blank"
              rel="noreferrer"
              className="text-white/70 underline-offset-4 hover:underline"
            >
              Instagram
            </a>{" "}
            first.
          </p>
        </div>
      </section>
    </PageTransition>
  );
}

function ShowRow({ show }: { show: Show }) {
  const { month, day, year } = formatDate(show.date);
  const timeRange = formatTimeRange(show.startTime, show.endTime);

  return (
    <li className="grid grid-cols-[4rem_1fr] items-center gap-x-5 gap-y-2 py-6 md:grid-cols-[5rem_1fr_auto] md:gap-x-10 md:py-8">
      <div className="text-center tabular-nums">
        <div className="text-xs tracking-[0.3em] text-white/50 uppercase">
          {month}
        </div>
        <div className="text-chrome text-4xl leading-none font-black md:text-5xl">
          {day}
        </div>
        <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase">
          {year}
        </div>
      </div>

      <div>
        <RoleBadge role={show.role} />
        {show.name && (
          <p className="mt-1.5 text-chrome text-2xl leading-tight font-black tracking-tight uppercase md:text-3xl">
            {show.name}
          </p>
        )}
        <p className="mt-1 text-lg font-semibold text-white/90 md:text-xl">
          {show.venue}
        </p>
        <p className="text-sm text-white/60 md:text-base">
          {show.city}
          {timeRange && (
            <>
              <span className="mx-2 text-white/30">·</span>
              <span className="text-white/70">{timeRange}</span>
            </>
          )}
        </p>
        {show.notes && (
          <p className="mt-1 text-sm text-white/50">{show.notes}</p>
        )}
      </div>

      <div className="col-span-2 md:col-span-1">
        {show.ticketUrl ? (
          <a
            href={show.ticketUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center rounded-sm bg-white px-5 text-xs font-medium tracking-[0.25em] text-black uppercase transition-transform hover:scale-[1.02]"
          >
            Tickets →
          </a>
        ) : (
          <span className="inline-flex h-11 items-center rounded-sm border border-white/20 px-5 text-xs tracking-[0.25em] text-white/60 uppercase">
            Soon
          </span>
        )}
      </div>
    </li>
  );
}

function RoleBadge({ role }: { role: Show["role"] }) {
  // Default to "playing" for any legacy records without the field.
  const r = role ?? "playing";
  if (r === "playing") {
    return (
      <span
        className="relative inline-flex items-center gap-2 overflow-hidden rounded-sm border border-[--color-accent-house]/60 bg-gradient-to-b from-[--color-accent-house]/20 to-[--color-accent-house]/5 px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.35em] text-[--color-accent-house] uppercase"
        style={{ boxShadow: "0 0 28px -6px rgba(109,240,255,0.55), inset 0 1px 0 0 rgba(255,255,255,0.12)" }}
      >
        <span
          aria-hidden
          className="block h-3 w-[3px] bg-[--color-accent-house]"
          style={{ boxShadow: "0 0 8px rgba(109,240,255,0.95)" }}
        />
        <span className="scanlines relative">// I'm playing</span>
      </span>
    );
  }
  return (
    <span
      className="relative inline-flex items-center gap-2 rounded-sm border border-[--color-accent-latin]/50 bg-gradient-to-b from-[--color-accent-latin]/15 to-[--color-accent-latin]/[0.03] px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.35em] text-[--color-accent-latin] uppercase"
      style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.08)" }}
    >
      <span aria-hidden className="text-[--color-accent-latin]">✦</span>
      <span>// I'll be there</span>
    </span>
  );
}

function EmptyState() {
  return (
    <div className="rounded-sm border border-white/10 bg-white/[0.02] p-8 text-center md:p-14">
      <p className="text-chrome text-2xl font-black md:text-3xl">
        Next dates dropping soon.
      </p>
      <p className="mt-3 text-sm text-white/60 md:text-base">
        Follow on Instagram to be first to know.
      </p>
      <Link
        to="/booking"
        className="mt-6 inline-flex h-11 items-center rounded-sm border border-white/30 px-5 text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black"
      >
        Or book a date →
      </Link>
    </div>
  );
}
