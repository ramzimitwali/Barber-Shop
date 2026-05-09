import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Scissors, Menu, X, Phone, Calendar, User as UserIcon, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { useAuth } from "@/src/context/AuthContext";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Barbers", href: "/barbers" },
  { name: "Gallery", href: "/gallery" },
  { name: "FAQ", href: "/faq" },
  { name: "Membership", href: "/membership" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const { user, login, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 h-20 border-b flex items-center",
        isScrolled 
          ? "bg-charcoal/95 backdrop-blur-md border-white/10 shadow-premium" 
          : "bg-transparent border-white/5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-9 h-9 border-2 border-gold flex items-center justify-center rotate-45 transition-transform duration-700 group-hover:rotate-[225deg]">
            <span className="-rotate-45 font-serif text-lg font-black tracking-tighter text-gold">G</span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-serif text-lg font-black tracking-[0.1em] uppercase leading-none">The Grooming</span>
            <span className="font-sans text-[8px] tracking-[0.5em] uppercase text-gold font-black">Lounge</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-[10px] uppercase font-bold tracking-[0.3em] transition-all duration-300 hover:text-gold",
                pathname === link.href ? "text-gold" : "text-white/50"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-6 border-l border-white/10 pl-10">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-neutral-dark border border-gold/20 flex items-center justify-center overflow-hidden transition-all group-hover:border-gold">
                    {user.photoURL ? <img src={user.photoURL} alt="User" className="w-full h-full object-cover" /> : <UserIcon className="w-4 h-4 text-gold" />}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 group-hover:text-gold transition-colors">{user.displayName?.split(' ')[0]}</span>
                </Link>
                <button onClick={signOut} className="text-white/20 hover:text-red-500 transition-colors">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button onClick={login} className="text-[10px] uppercase font-black tracking-[0.3em] text-white/40 hover:text-gold transition-colors">
                Login
              </button>
            )}
            <Link to="/book" className="btn-premium">
              Book Now
            </Link>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <a href="tel:+1234567890" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
            <Phone className="w-5 h-5 text-gold" />
          </a>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-charcoal z-[90] lg:hidden flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to={link.href}
                  className="text-2xl font-display font-bold uppercase tracking-widest text-white hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4"
            >
              <Link to="/book" className="btn-premium text-lg px-12 py-4">
                Book Appointment
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
