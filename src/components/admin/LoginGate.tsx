import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { ADMIN_UID, auth, firebaseReady } from "../../lib/firebase";

type State =
  | { kind: "loading" }
  | { kind: "not-configured" }
  | { kind: "signed-out" }
  | { kind: "unauthorized"; user: User }
  | { kind: "authorized"; user: User };

export function useAuthState(): State {
  const [state, setState] = useState<State>(
    firebaseReady ? { kind: "loading" } : { kind: "not-configured" }
  );

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (user) => {
      if (!user) return setState({ kind: "signed-out" });
      if (ADMIN_UID && user.uid !== ADMIN_UID) {
        return setState({ kind: "unauthorized", user });
      }
      setState({ kind: "authorized", user });
    });
  }, []);

  return state;
}

export default function LoginGate({ state }: { state: State }) {
  return (
    <div className="grid min-h-dvh place-items-center px-4 text-center">
      <div className="w-full max-w-sm">
        <p className="text-[10px] tracking-[0.45em] text-white/40 uppercase">
          / Admin
        </p>
        <h1 className="text-chrome mt-3 text-4xl font-black tracking-tight uppercase md:text-5xl">
          Backstage
        </h1>

        {state.kind === "not-configured" && (
          <p className="mt-8 text-sm text-white/60">
            Firebase is not configured. Add{" "}
            <code className="rounded bg-white/10 px-1">VITE_FIREBASE_*</code> values to{" "}
            <code className="rounded bg-white/10 px-1">.env.local</code> and reload.
          </p>
        )}

        {state.kind === "loading" && (
          <p className="mt-8 text-sm text-white/60">Checking session…</p>
        )}

        {state.kind === "signed-out" && <SignInForm />}

        {state.kind === "unauthorized" && (
          <>
            <p className="mt-6 text-sm text-white/60">
              <span className="text-white">{state.user.email}</span> isn't on the access
              list.
            </p>
            <button
              type="button"
              onClick={() => auth && signOut(auth)}
              className="mt-8 inline-flex h-11 items-center rounded-full border border-white/30 px-5 text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black"
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!auth) return;
    setSubmitting(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      const message =
        code === "auth/invalid-credential" || code === "auth/wrong-password"
          ? "Incorrect email or password."
          : code === "auth/too-many-requests"
            ? "Too many attempts. Try again in a moment."
            : (err as Error).message;
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4 text-left">
      <label className="block">
        <span className="mb-2 block text-[10px] tracking-[0.35em] text-white/50 uppercase">
          Email
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-base text-white focus:border-white/40 focus:outline-none"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-[10px] tracking-[0.35em] text-white/50 uppercase">
          Password
        </span>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-base text-white focus:border-white/40 focus:outline-none"
        />
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium tracking-[0.2em] text-black uppercase transition-transform hover:scale-[1.02] disabled:opacity-50"
      >
        {submitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
