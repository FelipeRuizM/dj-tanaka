export type ShowRole = "playing" | "attending";

export type Show = {
  id: string;
  name: string;           // Event name, e.g. "Saturday Night Heat"
  date: string;           // ISO date (YYYY-MM-DD)
  startTime: string;      // 24h "HH:MM", e.g. "22:00"
  endTime: string;        // 24h "HH:MM", may roll past midnight
  city: string;
  venue: string;
  role: ShowRole;         // "playing" = on the decks, "attending" = just there
  ticketUrl?: string;
  notes?: string;
};

export type ShowDraft = Omit<Show, "id">;
