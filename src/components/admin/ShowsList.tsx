import { useEffect, useState } from "react";
import type { Show, ShowDraft } from "../../types";
import { deleteShow, subscribeShows, updateShow } from "../../lib/shows";
import ShowForm from "./ShowForm";

export default function ShowsList() {
  const [shows, setShows] = useState<Show[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => subscribeShows(setShows), []);

  async function handleUpdate(id: string, draft: ShowDraft) {
    await updateShow(id, draft);
    setEditingId(null);
  }

  async function handleDelete(show: Show) {
    if (!confirm(`Delete ${show.venue} on ${show.date}?`)) return;
    await deleteShow(show.id);
  }

  if (shows.length === 0) {
    return <p className="text-sm text-white/50">No shows yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {shows.map((show) => (
        <li
          key={show.id}
          className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
        >
          {editingId === show.id ? (
            <ShowForm
              initial={show}
              onSubmit={(draft) => handleUpdate(show.id, draft)}
              onCancel={() => setEditingId(null)}
              submitLabel="Update"
            />
          ) : (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="min-w-[140px]">
                <div className="text-[10px] tracking-[0.3em] text-white/50 uppercase">
                  {show.date}
                </div>
                <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase">
                  {show.startTime}{show.endTime ? `–${show.endTime}` : ""}
                </div>
                <div className="mt-1 text-sm font-semibold">{show.city}</div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="mb-1 flex items-center gap-2">
                  {show.name && (
                    <span className="font-semibold text-white">{show.name}</span>
                  )}
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-sm border bg-gradient-to-b px-2 py-0.5 text-[9px] font-bold tracking-[0.3em] uppercase ${
                      (show.role ?? "playing") === "playing"
                        ? "border-[--color-accent-house]/60 from-[--color-accent-house]/20 to-[--color-accent-house]/5 text-[--color-accent-house]"
                        : "border-[--color-accent-latin]/50 from-[--color-accent-latin]/15 to-[--color-accent-latin]/[0.03] text-[--color-accent-latin]"
                    }`}
                  >
                    <span aria-hidden>
                      {(show.role ?? "playing") === "playing" ? "▮" : "✦"}
                    </span>
                    {(show.role ?? "playing") === "playing" ? "Playing" : "There"}
                  </span>
                </div>
                <div className="text-sm text-white/70">{show.venue}</div>
                {show.notes && (
                  <div className="text-xs text-white/50">{show.notes}</div>
                )}
                {show.ticketUrl && (
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-white/60 underline-offset-4 hover:underline"
                  >
                    Ticket link
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingId(show.id)}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase hover:bg-white hover:text-black"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(show)}
                  className="rounded-full border border-red-400/40 px-3 py-1.5 text-[10px] tracking-[0.25em] text-red-300 uppercase hover:bg-red-400 hover:text-black"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
