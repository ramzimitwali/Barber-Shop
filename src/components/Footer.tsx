import { Scissors, Instagram, Twitter, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#050505] pt-32 pb-16 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-10 h-10 border-2 border-gold flex items-center justify-center rotate-45">
                <span className="-rotate-45 font-serif text-xl font-black tracking-tighter text-gold">G</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-black tracking-[0.1em] uppercase leading-none">The Grooming</span>
                <span className="font-sans text-[9px] tracking-[0.5em] uppercase text-gold font-black">Lounge</span>
              </div>
            </Link>
            <p className="text-white/30 text-sm italic leading-relaxed max-w-xs">
              Redefining the modern grooming experience through traditional craftsmanship and cinematic aesthetics.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:border-gold hover:text-gold transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">The Studio</h4>
            <div className="space-y-4 text-white/40 text-xs italic">
              <p>123 Urban Avenue<br/>Luxury District, NY 10001</p>
              <div className="h-[1px] w-8 bg-white/10" />
              <p>+1 (234) 567-890</p>
              <p>concierge@groominglounge.com</p>
            </div>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Studio Hours</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-white/30">
              <li className="flex justify-between"><span>Mon - Sat</span> <span className="text-white/60">09:00 - 20:00</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span className="text-white/60">10:00 - 17:00</span></li>
              <li className="flex justify-between text-green-500/50"><span>Status</span> <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Open Now</span></li>
            </ul>
          </div>

          {/* Parking */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Parking</h4>
            <p className="text-white/30 text-[11px] leading-relaxed italic">
              Validated valet parking is available for all gentlemen at the main district entrance.
            </p>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-black">
            © 2026 THE GROOMING LOUNGE. CRAFTED BY VANGUARD.
          </p>
          <div className="flex gap-10 text-[9px] uppercase tracking-[0.3em] text-white/20 font-black">
            <span className="hover:text-gold cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-gold cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-gold cursor-pointer transition-colors">Gift Cards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

