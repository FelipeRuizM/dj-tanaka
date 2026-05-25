import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SparkleCursor from "./components/SparkleCursor";
import Home from "./pages/Home";
import About from "./pages/About";
import Shows from "./pages/Shows";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="flex min-h-dvh flex-col bg-black text-white">
      <SparkleCursor />
      {!isAdmin && <Nav />}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}
