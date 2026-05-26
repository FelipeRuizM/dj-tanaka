import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

export default function NotFound() {
  return (
    <PageTransition>
      <section className="grid min-h-dvh place-items-center px-4 pt-28 pb-20 text-center">
        <div>
          <p className="text-chrome text-7xl font-black md:text-9xl">404</p>
          <p className="mt-4 text-sm tracking-[0.3em] text-white/60 uppercase">
            No signal on this channel.
          </p>
          <Link
            to="/"
            className="mt-10 inline-flex h-12 items-center rounded-sm border border-white/30 px-6 text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
