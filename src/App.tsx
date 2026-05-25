import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SparkleCursor from "./components/SparkleCursor";
import Home from "./pages/Home";
import About from "./pages/About";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";

// Lazy-load anything that pulls in Firebase. Keeps the initial bundle small
// for first-time visitors who never touch events/admin.
const Events = lazy(() => import("./pages/Events"));
const Admin = lazy(() => import("./pages/Admin"));

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="flex min-h-dvh flex-col bg-black text-white">
      <SparkleCursor />
      {!isAdmin && <Nav />}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Suspense fallback={<RouteFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

function RouteFallback() {
  return (
    <div className="grid min-h-dvh place-items-center">
      <p className="text-xs tracking-[0.4em] text-white/40 uppercase">Loading…</p>
    </div>
  );
}
