import { signOut } from "firebase/auth";
import PageTransition from "../components/PageTransition";
import LoginGate, { useAuthState } from "../components/admin/LoginGate";
import ShowsList from "../components/admin/ShowsList";
import ShowForm from "../components/admin/ShowForm";
import { auth } from "../lib/firebase";
import { createShow } from "../lib/shows";

export default function Admin() {
  const state = useAuthState();

  if (state.kind !== "authorized") {
    return (
      <PageTransition>
        <LoginGate state={state} />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="min-h-dvh px-4 pt-12 pb-20 md:px-8 md:pt-16">
        <div className="mx-auto max-w-3xl">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[0.45em] text-white/40 uppercase">
                / Admin
              </p>
              <h1 className="text-chrome mt-2 text-3xl font-black tracking-tight uppercase md:text-4xl">
                Events
              </h1>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/50">
              <span>{state.user.email}</span>
              <button
                type="button"
                onClick={() => auth && signOut(auth)}
                className="rounded-sm border border-white/20 px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase hover:bg-white hover:text-black"
              >
                Sign out
              </button>
            </div>
          </header>

          <section className="mt-10">
            <h2 className="mb-4 text-xs tracking-[0.35em] text-white/60 uppercase">
              Add an event
            </h2>
            <ShowForm
              onSubmit={async (draft) => {
                await createShow(draft);
              }}
              submitLabel="Create"
            />
          </section>

          <section className="mt-12">
            <h2 className="mb-4 text-xs tracking-[0.35em] text-white/60 uppercase">
              All events
            </h2>
            <ShowsList />
          </section>
        </div>
      </section>
    </PageTransition>
  );
}
