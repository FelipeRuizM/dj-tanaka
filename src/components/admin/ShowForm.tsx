import { useEffect, useState } from "react";
import type { Show, ShowDraft } from "../../types";

type Props = {
  initial?: Show;
  onSubmit: (draft: ShowDraft) => Promise<void> | void;
  onCancel?: () => void;
  submitLabel?: string;
};

const EMPTY: ShowDraft = { date: "", city: "", venue: "", ticketUrl: "", notes: "" };

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
    if (!draft.date || !draft.city || !draft.venue) {
      setError("Date, city, and venue are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const cleaned: ShowDraft = {
        date: draft.date,
        city: draft.city.trim(),
        venue: draft.venue.trim(),
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
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.02] p-4 md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Date">
          <input
            type="date"
            required
            value={draft.date}
            onChange={(e) => update("date", e.target.value)}
            className="input"
          />
        </Field>
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
      </div>

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
          className="inline-flex h-11 items-center rounded-full bg-white px-5 text-xs font-medium tracking-[0.25em] text-black uppercase disabled:opacity-50"
        >
          {saving ? "Saving…" : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-11 items-center rounded-full border border-white/20 px-5 text-xs tracking-[0.25em] uppercase"
          >
            Cancel
          </button>
        )}
      </div>

      <style>{`
        .input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
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
