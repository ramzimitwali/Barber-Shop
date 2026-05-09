import { useState } from "react";
import { motion } from "motion/react";
import { Send, MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <header className="text-center mb-20 max-w-2xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase mb-6"
          >
            Connect With Us
          </motion.h1>
          <p className="text-white/40 font-light leading-relaxed">
            Need a custom consultation or have questions about our services? Reach out to our concierge team.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info & Map */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-morphism p-8 rounded-3xl space-y-4">
                <MapPin className="w-8 h-8 text-gold" />
                <h3 className="font-bold uppercase text-lg">Our Location</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  123 Urban Avenue, <br />
                  Luxury District, NY 10001
                </p>
              </div>
              <div className="glass-morphism p-8 rounded-3xl space-y-4">
                <Phone className="w-8 h-8 text-gold" />
                <h3 className="font-bold uppercase text-lg">Call Us</h3>
                <p className="text-white/50 text-sm leading-relaxed font-mono">
                  Main: +1 (234) 567-890 <br />
                  VIP Line: +1 (234) 000-000
                </p>
              </div>
              <div className="glass-morphism p-8 rounded-3xl space-y-4">
                <Mail className="w-8 h-8 text-gold" />
                <h3 className="font-bold uppercase text-lg">Email Us</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  hello@groominglounge.com <br />
                  partners@groominglounge.com
                </p>
              </div>
              <div className="glass-morphism p-8 rounded-3xl space-y-4">
                <Clock className="w-8 h-8 text-gold" />
                <h3 className="font-bold uppercase text-lg">Operating Hours</h3>
                <div className="text-white/50 text-sm leading-relaxed">
                   <p>Mon - Sat: 9am - 8pm</p>
                   <p>Sun: 10am - 5pm</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative aspect-video rounded-3xl overflow-hidden grayscale opacity-50 contrast-125 border border-white/10 group cursor-crosshair">
              <img 
                src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800&h=450" 
                className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110" 
                alt="Map"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-charcoal text-white px-6 py-2 rounded-full border border-gold font-bold uppercase tracking-widest text-xs">
                    View Studio Map
                 </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-morphism p-10 lg:p-16 rounded-[40px] shadow-premium">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black uppercase">Send a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30 ml-4">Full Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-white/5 border border-white/5 px-6 py-4 rounded-2xl outline-none focus:border-gold transition-all"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30 ml-4">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-white/5 border border-white/5 px-6 py-4 rounded-2xl outline-none focus:border-gold transition-all"
                    placeholder="john@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30 ml-4">Subject</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-white/5 border border-white/5 px-6 py-4 rounded-2xl outline-none focus:border-gold transition-all"
                  placeholder="Inquiry about VIP Membership"
                  value={formState.subject}
                  onChange={(e) => setFormState({...formState, subject: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30 ml-4">Message</label>
                <textarea 
                  rows={4}
                  required
                  className="w-full bg-white/5 border border-white/5 px-6 py-4 rounded-2xl outline-none focus:border-gold transition-all resize-none"
                  placeholder="How can we help you today?"
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                />
              </div>
              <button 
                type="submit" 
                className={cn(
                  "w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all",
                  isSent ? "bg-green-500 text-white" : "bg-gold text-charcoal hover:bg-gold-light"
                )}
              >
                {isSent ? (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    Message Sent
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Inquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle2({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
  );
}
