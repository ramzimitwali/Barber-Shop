import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, Scissors, User, MapPin, ChevronRight, LogOut, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/src/context/AuthContext";
import { db, collection, query, where, onSnapshot, OperationType, handleFirestoreError } from "@/src/lib/firebase";
import { SERVICES, BARBERS } from "@/src/constants";
import { cn, formatPrice } from "@/src/lib/utils";
import SEO from "@/src/components/SEO";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Profile() {
  const { user, signOut } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const path = "appointments";
    const q = query(collection(db, path), where("userId", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a: any, b: any) => b.createdAt?.seconds - a.createdAt?.seconds);
      setAppointments(docs);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return unsubscribe;
  }, [user]);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-charcoal">
         <div className="text-center space-y-4">
           <h1 className="text-3xl font-black uppercase">Unauthorized</h1>
           <p className="text-white/40">Please login to view your profile.</p>
         </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0A0A0A]">
      <SEO 
        title="My Grooming Profile"
        description="View your upcoming appointments, booking history, and membership status at The Grooming Lounge."
      />
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* User Info Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            <motion.div {...fadeInUp} className="p-10 bg-neutral-dark/40 border border-white/5 space-y-10 relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none select-none">
                 <User size={150} />
              </div>

              <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                <div className="w-32 h-32 rounded-full relative p-1 border border-gold/20">
                  <div className="w-full h-full rounded-full border border-gold/50 p-1">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full rounded-full object-cover grayscale" />
                    ) : (
                      <div className="w-full h-full rounded-full bg-charcoal flex items-center justify-center text-gold">
                        <User size={40} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <h2 className="text-3xl font-serif italic uppercase">{user.displayName}</h2>
                  <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] font-mono">{user.email}</p>
                </div>
              </div>
              
              <div className="pt-10 border-t border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-white/20 font-black">Status</span>
                  <span className="text-gold font-serif italic text-lg tracking-widest uppercase">Elite Member</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-white/20 font-black">Legacy Points</span>
                  <span className="text-white/80 font-serif text-lg italic">1,250</span>
                </div>
              </div>

              <button 
                onClick={signOut}
                className="w-full btn-outline flex items-center justify-center gap-3 py-4 text-[10px] opacity-50 hover:opacity-100 hover:text-red-500 hover:border-red-500/30"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="p-10 bg-neutral-dark/40 border border-white/5 space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Client Management</h3>
              <div className="space-y-6">
                {["Edit Profile", "Payment Methods", "Preferences"].map((action) => (
                  <button key={action} className="w-full flex items-center justify-between group">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/30 group-hover:text-white transition-all italic">{action}</span>
                    <ChevronRight size={14} className="text-white/10 group-hover:text-gold transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content: Appointments */}
          <div className="lg:col-span-8 space-y-12">
            <header className="flex items-center justify-between border-b border-white/5 pb-8">
              <div className="space-y-1">
                <h2 className="text-4xl font-serif italic uppercase tracking-tight">Case <span className="not-italic">History</span></h2>
                <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">Your journey at the lounge</p>
              </div>
              <span className="px-4 py-1.5 border border-white/5 text-[9px] uppercase font-black tracking-widest text-white/20">
                {appointments.length} Total Sessions
              </span>
            </header>

            {loading ? (
              <div className="grid gap-4">
                {[1, 2].map(i => (
                  <div key={i} className="h-32 bg-neutral-dark/20 border border-white/5 animate-pulse" />
                ))}
              </div>
            ) : appointments.length > 0 ? (
              <div className="grid gap-1px bg-white/5 border border-white/5">
                {appointments.map((appt, idx) => {
                  const service = SERVICES.find(s => s.id === appt.serviceId);
                  const barber = BARBERS.find(b => b.id === appt.barberId);
                  
                  return (
                    <motion.div 
                      key={appt.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group p-10 bg-[#0D0D0D] hover:bg-neutral-dark/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-10"
                    >
                      <div className="flex items-center gap-8">
                        <div className="w-14 h-14 border border-gold/20 flex items-center justify-center text-gold/30 group-hover:text-gold transition-colors rotate-45 shrink-0">
                          <Scissors size={20} className="-rotate-45" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                             <span className={cn(
                               "text-[8px] uppercase font-black tracking-widest px-2 py-0.5",
                               appt.status === 'confirmed' ? "bg-green-500 text-charcoal" : "bg-gold text-charcoal shadow-premium"
                             )}>
                               {appt.status}
                             </span>
                             <span className="text-[10px] text-white/20 uppercase font-black tracking-widest">{appt.time}</span>
                          </div>
                          <h3 className="text-2xl font-serif italic uppercase text-white/80">{service?.name || 'Grooming Service'}</h3>
                          <p className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30 italic">
                            Artisan: <span className="text-gold/60">{barber?.name || 'Master Barber'}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col md:items-end gap-2 pr-4">
                         <p className="text-xl font-serif italic text-white/50">{appt.date}</p>
                         <p className="text-[10px] uppercase font-black tracking-widest text-white/20">Session Reference: #{appt.id.slice(-6).toUpperCase()}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="p-20 border border-white/5 bg-neutral-dark/20 text-center space-y-10 group">
                <div className="w-24 h-24 bg-white/5 border border-white/5 flex items-center justify-center mx-auto rotate-45 group-hover:border-gold/30 transition-all">
                  <Package size={32} className="-rotate-45 text-white/10 group-hover:text-gold" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif italic uppercase">Empty Registry</h3>
                  <p className="text-white/20 text-sm max-w-xs mx-auto italic">Your transformation journey hasn't begun yet. We are awaiting your first arrival.</p>
                </div>
                <Link to="/book" className="btn-premium inline-block px-12">Secure First Session</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}
