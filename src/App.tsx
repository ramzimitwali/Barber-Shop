/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import SEO from "@/src/components/SEO";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";
import Home from "@/src/pages/Home";
import Services from "@/src/pages/Services";
import Barbers from "@/src/pages/Barbers";
import Gallery from "@/src/pages/Gallery";
import Booking from "@/src/pages/Booking";
import Contact from "@/src/pages/Contact";
import FAQ from "@/src/pages/FAQ";
import Blog from "@/src/pages/Blog";
import Membership from "@/src/pages/Membership";
import GiftCards from "@/src/pages/GiftCards";
import Confirmation from "@/src/pages/Confirmation";
import Profile from "@/src/pages/Profile";
import ScrollToTop from "@/src/components/ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/barbers" element={<Barbers />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/book" element={<Booking />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/gift-cards" element={<GiftCards />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <WhatsAppButton />
        
        {/* Mobile Sticky Booking Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 lg:hidden z-50">
          <a
            href="/book"
            className="flex items-center justify-center w-full bg-gold text-charcoal py-4 rounded-lg font-bold uppercase tracking-widest shadow-2xl"
          >
            Book Appointment Now
          </a>
        </div>
      </div>
    </Router>
  );
}
