export type Show = {
  id: string;
  date: string;           // ISO 8601 (YYYY-MM-DD or full datetime)
  city: string;
  venue: string;
  ticketUrl?: string;
  notes?: string;
};

export type ShowDraft = Omit<Show, "id">;
