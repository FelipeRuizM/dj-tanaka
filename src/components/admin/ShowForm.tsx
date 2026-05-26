import { useEffect, useState } from "react";
import type { Show, ShowDraft } from "../../types";

type Props = {
  initial?: Show;
  onSubmit: (draft: ShowDraft) => Promise<void> | void;
  onCancel?: () => void;
  submitLabel?: string;
};

const EMPTY: ShowDraft = {
  name: "",
  date: "",
  startTime: "21:00",
  endTime: "02:00",
  city: "",
  venue: "",
  role: "playing",
  ticketUrl: "",
  notes: "",
};

export default function ShowForm({ initial, onSubmit, onCancel, submitLabel = "Save" }: Props) {
  const [draft, setDraft] = useState<ShowDraft>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initial) {
      const { id: _id, ...rest } = initial;
      setDraft({ ...EMPTY, ...rest });
    } else {
      setDraft(EMPTY);
    }
  }, [initial]);

  function update<K extends keyof ShowDraft>(key: K, value: ShowDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !draft.name ||
      !draft.date ||
      !draft.startTime ||
      !draft.endTime ||
      !draft.city ||
      !draft.venue
    ) {
      setError("Name, date, start time, end time, city, and venue are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const cleaned: ShowDraft = {
        name: draft.name.trim(),
        date: draft.date,
        startTime: draft.startTime,
        endTime: draft.endTime,
        city: draft.city.trim(),
        venue: draft.venue.trim(),
        role: draft.role,
        ...(draft.ticketUrl?.trim() ? { ticketUrl: draft.ticketUrl.trim() } : {}),
        ...(draft.notes?.trim() ? { notes: draft.notes.trim() } : {}),
      };
      await onSubmit(cleaned);
      if (!initial) setDraft(EMPTY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-sm border border-white/10 bg-white/[0.02] p-4 md:p-6">
      <Field label="Event name">
        <input
          type="text"
          required
          placeholder="Saturday Night Heat"
          value={draft.name}
          onChange={(e) => update("name", e.target.value)}
          className="input"
        />
      </Field>

      <Field label="I'll be...">
        <div
          role="radiogroup"
          aria-label="My role at this event"
          className="inline-flex rounded-sm border border-white/15 bg-white/[0.04] p-1"
        >
          {(
            [
              { value: "playing", label: "Playing" },
              { value: "attending", label: "There" },
            ] as const
          ).map((opt) => {
            const active = draft.role === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => update("role", opt.value)}
                className={`min-w-[110px] rounded-sm px-4 py-2 text-xs tracking-[0.2em] uppercase transition-colors ${
                  active
                    ? "bg-white text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </Field>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Date">
          <input
            type="date"
            required
            value={draft.date}
            onChange={(e) => update("date", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Start time">
          <input
            type="time"
            required
            value={draft.startTime}
            onChange={(e) => update("startTime", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="End time">
          <input
            type="time"
            required
            value={draft.endTime}
            onChange={(e) => update("endTime", e.target.value)}
            className="input"
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="City">
          <input
            type="text"
            required
            placeholder="Vancouver"
            value={draft.city}
            onChange={(e) => update("city", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Venue">
          <input
            type="text"
            required
            placeholder="Celebrities Nightclub"
            value={draft.venue}
            onChange={(e) => update("venue", e.target.value)}
            className="input"
          />
        </Field>
      </div>

      <Field label="Ticket URL (optional)">
        <input
          type="url"
          placeholder="https://..."
          value={draft.ticketUrl ?? ""}
          onChange={(e) => update("ticketUrl", e.target.value)}
          className="input"
        />
      </Field>

      <Field label="Notes (optional)">
        <input
          type="text"
          placeholder="Opening for ..."
          value={draft.notes ?? ""}
          onChange={(e) => update("notes", e.target.value)}
          className="input"
        />
      </Field>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-11 items-center rounded-sm bg-white px-5 text-xs font-medium tracking-[0.25em] text-black uppercase disabled:opacity-50"
        >
          {saving ? "Saving…" : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-11 items-center rounded-sm border border-white/20 px-5 text-xs tracking-[0.25em] uppercase"
          >
            Cancel
          </button>
        )}
      </div>

      <style>{`
        .input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 2px;
          padding: 12px 14px;
          color: white;
          font-size: 15px;
          width: 100%;
          color-scheme: dark;
        }
        .input:focus {
          outline: none;
          border-color: rgba(255,255,255,0.4);
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] tracking-[0.35em] text-white/50 uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
