import {
  onValue,
  push,
  ref,
  remove,
  set,
  update,
  type DatabaseReference,
} from "firebase/database";
import { db } from "./firebase";
import type { Show, ShowDraft } from "../types";

function showsRef(): DatabaseReference {
  if (!db) throw new Error("Firebase not configured");
  return ref(db, "shows");
}

export function subscribeShows(cb: (shows: Show[]) => void): () => void {
  if (!db) {
    cb([]);
    return () => {};
  }
  return onValue(showsRef(), (snap) => {
    const value = snap.val() as Record<string, ShowDraft> | null;
    const shows: Show[] = value
      ? Object.entries(value).map(([id, v]) => ({ id, ...v }))
      : [];
    shows.sort((a, b) => a.date.localeCompare(b.date));
    cb(shows);
  });
}

export async function createShow(draft: ShowDraft): Promise<string> {
  const r = push(showsRef());
  await set(r, draft);
  return r.key!;
}

export async function updateShow(id: string, draft: ShowDraft): Promise<void> {
  if (!db) throw new Error("Firebase not configured");
  await update(ref(db, `shows/${id}`), draft);
}

export async function deleteShow(id: string): Promise<void> {
  if (!db) throw new Error("Firebase not configured");
  await remove(ref(db, `shows/${id}`));
}
