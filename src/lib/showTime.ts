import type { Show } from "../types";

export const DEFAULT_TIME_ZONE = "America/Vancouver";

// Zones offered in the admin form. Start/end times are entered as the
// venue's local wall-clock time; the zone says when that actually is.
export const TIME_ZONES: { value: string; label: string }[] = [
  // BC no longer falls back in winter, so it differs from the US West Coast
  // from November to March.
  { value: "America/Vancouver", label: "BC — Vancouver, Victoria, Kelowna" },
  { value: "America/Los_Angeles", label: "US Pacific — Seattle, LA, Las Vegas" },
  { value: "America/Edmonton", label: "Mountain — Calgary, Edmonton, Denver" },
  { value: "America/Winnipeg", label: "Central — Winnipeg, Chicago, Dallas" },
  { value: "America/Toronto", label: "Eastern — Toronto, Montréal, New York, Miami" },
  { value: "America/Halifax", label: "Atlantic — Halifax" },
  { value: "Pacific/Honolulu", label: "Hawaii — Honolulu" },
  { value: "America/Mexico_City", label: "Mexico — Mexico City, Guadalajara" },
  { value: "America/Cancun", label: "Mexico — Cancún, Tulum" },
  { value: "America/Bogota", label: "Colombia — Bogotá, Medellín, Cali" },
  { value: "America/Puerto_Rico", label: "Caribbean — Puerto Rico, Santo Domingo" },
  { value: "America/Sao_Paulo", label: "Brazil — São Paulo, Rio" },
  { value: "Europe/London", label: "UK — London" },
  { value: "Europe/Madrid", label: "Central Europe — Madrid, Ibiza, Berlin, Amsterdam" },
];

export function showTimeZone(show: Pick<Show, "timeZone">): string {
  const tz = show.timeZone || DEFAULT_TIME_ZONE;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return tz;
  } catch {
    return DEFAULT_TIME_ZONE;
  }
}

// How far `tz`'s wall clock is ahead of UTC at instant `ts`, in ms.
function zoneOffset(ts: number, tz: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(new Date(ts));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value);
  const wall = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second")
  );
  return wall - ts;
}

// The instant a wall-clock date + "HH:MM" in `tz` happens. `dayOffset`
// rolls the date forward, e.g. for an end time past midnight.
function zonedTime(date: string, hhmm: string, tz: string, dayOffset = 0): number | null {
  const d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const t = /^(\d{1,2}):(\d{2})$/.exec(hhmm);
  if (!d || !t) return null;
  const wall = Date.UTC(+d[1], +d[2] - 1, +d[3] + dayOffset, +t[1], +t[2]);
  // Second pass picks up the right offset when the first guess landed on
  // the other side of a daylight-saving change.
  const guess = wall - zoneOffset(wall, tz);
  return wall - zoneOffset(guess, tz);
}

export function showStart(show: Show): number | null {
  return zonedTime(show.date, show.startTime, showTimeZone(show));
}

// When the show is over. An end time at or before the start time runs past
// midnight into the next morning — the show's date stays the night it starts.
export function showEnd(show: Show): number | null {
  const tz = showTimeZone(show);
  if (!show.endTime) return zonedTime(show.date, "00:00", tz, 1);
  const overnight = Boolean(show.startTime) && show.endTime <= show.startTime;
  return zonedTime(show.date, show.endTime, tz, overnight ? 1 : 0);
}

// Short zone name like "PDT", taken at the show's start so it reflects
// daylight saving on that date.
export function timeZoneAbbr(show: Show): string {
  const at = showStart(show) ?? Date.now();
  return (
    new Intl.DateTimeFormat("en-US", {
      timeZone: showTimeZone(show),
      timeZoneName: "short",
    })
      .formatToParts(new Date(at))
      .find((p) => p.type === "timeZoneName")?.value ?? ""
  );
}
