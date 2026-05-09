import { BARBERS } from "@/src/constants";
import { Instagram, Star, Scissors, Award, Sparkles, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import SEO from "@/src/components/SEO";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function Barbers() {
  return (
    <div className="pt-32 pb-24">
      <SEO 
        title="Master Barbers & Artisans"
        description="Meet the elite master barbers at The Grooming Lounge. Expert stylists specialized in precision cuts, modern fades, and traditional shaves."
      />
      <div className="container mx-auto px-6">
        <header className="text-center mb-32 space-y-6">
          <div className="flex justify-center items-center gap-3">
            <div className="h-[1px] w-8 bg-gold" />
            <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">The Team</span>
            <div className="h-[1px] w-8 bg-gold" />
          </div>
          <motion.h1 {...fadeInUp} className="text-6xl md:text-8xl font-serif italic uppercase leading-none">Master <span className="not-italic">Artisans</span></motion.h1>
          <motion.p {...fadeInUp} transition={{ delay: 0.1 }} className="text-white/30 max-w-xl mx-auto italic text-lg font-light leading-relaxed">
            A collective of elite specialists committed to the highest standards of male grooming. 
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5">
          {BARBERS.map((barber, i) => (
            <motion.div
              key={barber.id}
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
              className="group bg-charcoal p-10 hover:bg-neutral-dark/40 transition-all"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-10 shadow-premium">
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex justify-between items-end">
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-gold font-black">{barber.role}</span>
                      <h3 className="text-3xl font-serif italic text-white uppercase">{barber.name}</h3>
                   </div>
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/90 via-transparent to-transparent opacity-80" />
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/30 italic">
                   <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                   <span>{barber.rating} Rating</span>
                   <span className="h-3 w-px bg-white/10" />
                   <span>{barber.yearsExperience}yr Case History</span>
                </div>

                <p className="text-white/40 text-xs leading-relaxed italic font-light line-clamp-3">
                  {barber.bio}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {barber.specialties.map((spec, idx) => (
                    <span key={idx} className="text-[9px] uppercase tracking-[0.2em] font-black text-white/20">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                   <a href={`https://instagram.com/${barber.instagram}`} target="_blank" rel="noreferrer" className="text-white/20 hover:text-gold transition-colors">
                      <Instagram className="w-5 h-5" />
                   </a>
                   <Link to={`/book?barber=${barber.id}`} className="btn-premium py-2 px-8 text-[10px]">
                      Book Private Session
                   </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Credentials Section */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Award, label: "Top Rated 2024", sub: "Urban Groomers Assoc." },
            { icon: Scissors, label: "Precision Certified", sub: "Global Scissors Academy" },
            { icon: Sparkles, label: "Eco-Friendly Shop", sub: "Certified Sustainable" },
            { icon: Trophy, label: "Master Style Winner", sub: "State Barber Cup" }
          ].map((item, i) => (
            <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="text-center p-8 glass-morphism rounded-2xl">
              <item.icon className="w-8 h-8 text-gold mx-auto mb-4" />
              <p className="text-xs font-bold uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-[10px] text-white/30 uppercase tracking-tighter">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
