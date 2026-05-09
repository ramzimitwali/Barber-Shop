import { SERVICES } from "@/src/constants";
import { Scissors, Check, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { formatPrice } from "@/src/lib/utils";

import SEO from "@/src/components/SEO";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function Services() {
  const categories = ['hair', 'beard', 'vip'];

  return (
    <div className="pt-32 pb-24">
      <SEO 
        title="Premium Grooming Services"
        description="Explore our range of premium barber services: skin fades, beard sculpting, and luxury VIP packages. View pricing and duration details."
      />
      <div className="container mx-auto px-6">
        <header className="text-center mb-32 space-y-6">
          <div className="flex justify-center items-center gap-3">
            <div className="h-[1px] w-8 bg-gold" />
            <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">The Menu</span>
            <div className="h-[1px] w-8 bg-gold" />
          </div>
          <motion.h1 {...fadeInUp} className="text-6xl md:text-8xl font-serif italic uppercase">Grooming <span className="not-italic">Services</span></motion.h1>
          <motion.p {...fadeInUp} transition={{ delay: 0.1 }} className="text-white/30 max-w-xl mx-auto italic text-lg font-light leading-relaxed">
            Meticulously engineered for the modern gentleman. Every service includes our signature hot towel finish. 
          </motion.p>
        </header>

        <div className="space-y-32">
          {categories.map((cat) => (
            <section key={cat}>
              <div className="flex items-center gap-6 mb-16">
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-white/20">{cat === 'vip' ? 'Exclusive Packages' : `${cat} Artistry`}</h2>
                <div className="h-[1px] flex-grow bg-white/5" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5">
                {SERVICES.filter(s => s.category === cat).map((svc, i) => (
                  <motion.div
                    key={svc.id}
                    {...fadeInUp}
                    transition={{ delay: i * 0.1 }}
                    className="relative p-10 bg-charcoal hover:bg-neutral-dark/40 transition-all group flex flex-col min-h-[400px]"
                  >
                    {svc.popular && (
                      <div className="absolute top-4 right-4">
                        <span className="text-[8px] bg-gold text-charcoal px-3 py-1 font-black uppercase tracking-[0.2em] shadow-premium">
                          Signature
                        </span>
                      </div>
                    )}
                    
                    <div className="mb-10 space-y-4">
                      <span className="text-[10px] text-gold font-bold uppercase tracking-widest">{svc.category}</span>
                      <h3 className="text-3xl font-serif italic uppercase group-hover:text-gold transition-colors">{svc.name}</h3>
                      <p className="text-white/30 text-xs leading-relaxed font-light italic">{svc.description}</p>
                    </div>

                    <div className="mt-auto pt-10 border-t border-white/5 space-y-8">
                       <div className="flex items-center justify-between">
                         <span className="text-[9px] uppercase tracking-[0.3em] font-black text-white/20">Duration</span>
                         <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">{svc.duration} Minutes</span>
                       </div>
                       <div className="flex items-center justify-between">
                         <span className="text-2xl font-serif text-gold">{formatPrice(svc.price)}</span>
                         <Link 
                           to={`/book?service=${svc.id}`} 
                           className="btn-premium py-2 px-6 text-[10px]"
                         >
                           Book Session
                         </Link>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Add-on Banner */}
        <motion.div
           {...fadeInUp}
           className="mt-24 p-12 glass-morphism rounded-3xl flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="space-y-4">
            <h3 className="text-3xl font-black uppercase">Complementary Perks</h3>
            <p className="text-white/50 max-w-md">Every session at The Grooming Lounge includes our signature hospitality bar and scalp massage.</p>
            <div className="flex flex-wrap gap-4 pt-4">
              {["Premium Coffee", "Whiskey Bar", "Hot Towel", "Scalp Massage"].map(perk => (
                <div key={perk} className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-gold">
                  <Check className="w-3 h-3" />
                  {perk}
                </div>
              ))}
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1512690118235-8c4f09703666?auto=format&fit=crop&q=80&w=400&h=300" className="w-64 h-48 object-cover rounded-2xl grayscale" alt="Whiskey Bar" referrerPolicy="no-referrer" />
        </motion.div>
      </div>
    </div>
  );
}
