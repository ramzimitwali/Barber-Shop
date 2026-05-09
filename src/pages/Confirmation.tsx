import { CheckCircle2, Calendar, MapPin, Share2, ReceiptText, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";

export default function Confirmation() {
  const location = useLocation();
  const { booking } = location.state || {};

  if (!booking) {
    return (
      <div className="pt-40 pb-20 text-center container mx-auto">
        <h1 className="text-3xl font-bold uppercase mb-8">No booking found</h1>
        <Link to="/book" className="btn-premium">Back to Booking</Link>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24 min-h-screen flex items-center">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-morphism rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Confetti effect placeholder */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gold rounded-full" />
          
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          
          <h1 className="text-4xl font-black uppercase mb-4 leading-tight">Appointment <br /> <span className="text-gold uppercase">Confirmed!</span></h1>
          <p className="text-white/50 mb-12 max-w-sm mx-auto">
            Your transformation is scheduled. We've sent a confirmation email & SMS to your phone.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-12">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <Calendar className="w-5 h-5 text-gold mb-3" />
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">When</p>
              <p className="font-bold text-sm uppercase">{booking.date} @ {booking.time}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <MapPin className="w-5 h-5 text-gold mb-3" />
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Where</p>
              <p className="font-bold text-sm uppercase">Downtown Studio</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-white text-charcoal py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gold transition-colors">
              <Share2 className="w-4 h-4" />
              Add to Calendar
            </button>
            <button className="w-full border border-white/10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs opacity-60 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <ReceiptText className="w-4 h-4" />
              Manage Booking
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">
             Thank you for choosing the Lounge
          </div>
        </motion.div>

        <div className="mt-12 text-center">
           <Link to="/" className="text-gold font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:gap-4 transition-all">
             Return to Home Experience <ArrowRight className="w-4 h-4" />
           </Link>
        </div>
      </div>
    </div>
  );
}
