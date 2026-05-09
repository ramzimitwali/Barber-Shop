import { motion } from "motion/react";
import { Gift, Mail, Send, ChevronRight, Check } from "lucide-react";
import { useState } from "react";
import { cn, formatPrice } from "@/src/lib/utils";

const AMOUNTS = [25, 50, 100, 250, 500];

export default function GiftCards() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [isDigital, setIsDigital] = useState(true);

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <header className="text-center mb-20 max-w-2xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase mb-6"
          >
            Gift Of Style
          </motion.h1>
          <p className="text-white/40 font-light leading-relaxed">
            The perfect gesture for the contemporary gentleman. Give an experience of precision and luxury.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Card Preview */}
          <div className="space-y-8">
            <motion.div
              initial={{ rotateY: 15, rotateX: 10 }}
              animate={{ rotateY: 0, rotateX: 0 }}
              className="aspect-[1.6/1] w-full max-w-md mx-auto p-12 rounded-[32px] bg-linear-to-br from-slate-dark to-charcoal border border-white/10 shadow-premium relative overflow-hidden group perspective-1000"
            >
              {/* Card Design */}
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <Gift size={200} />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <div className="flex flex-col">
                      <span className="font-display text-2xl font-bold tracking-tighter uppercase leading-none">The Grooming</span>
                      <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-bold">Lounge</span>
                   </div>
                   <div className="text-[10px] uppercase font-bold tracking-widest text-gold/60 border border-gold/30 px-2 py-1 rounded">
                      Gift Pass
                   </div>
                </div>
                
                <div className="space-y-1">
                   <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Valued At</p>
                   <p className="text-6xl font-display font-black text-gold">{formatPrice(selectedAmount)}</p>
                </div>

                <div className="flex justify-between items-end border-t border-white/5 pt-6">
                   <div className="text-[8px] uppercase tracking-widest text-white/20">
                      Valid at all locations <br /> Non-refundable
                   </div>
                   <div className="w-12 h-12 bg-white/5 rounded-md border border-white/10 flex items-center justify-center">
                      {/* Fake Chip */}
                      <div className="w-8 h-6 bg-gold/20 rounded-sm" />
                   </div>
                </div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { title: "Digital Delivery", desc: "Instant email delivery to the recipient with custom message." },
                 { title: "Premium Physical", desc: "Crafted heavy-weight metal card delivered in a matte black box." }
               ].map((item, i) => (
                 <div key={i} className="glass-morphism p-6 rounded-2xl flex gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                       <Check className="w-5 h-5" />
                    </div>
                    <div>
                       <h4 className="font-bold uppercase text-xs mb-1">{item.title}</h4>
                       <p className="text-white/40 text-[10px] leading-relaxed uppercase tracking-wider">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Form */}
          <div className="glass-morphism p-10 lg:p-16 rounded-[40px] shadow-premium">
             <h3 className="text-2xl font-black uppercase mb-10">Configure Gift</h3>
             
             <div className="space-y-10">
                {/* Delivery Type */}
                <div className="space-y-4">
                   <p className="text-[10px] uppercase font-bold tracking-widest text-white/30">Select Delivery</p>
                   <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setIsDigital(true)}
                        className={cn(
                          "py-4 rounded-xl border flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs transition-all",
                          isDigital ? "bg-gold text-charcoal border-gold" : "bg-white/5 border-white/5 text-white/40 hover:border-gold/30"
                        )}
                      >
                         <Mail className="w-4 h-4" /> Digital
                      </button>
                      <button 
                        onClick={() => setIsDigital(false)}
                        className={cn(
                          "py-4 rounded-xl border flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs transition-all",
                          !isDigital ? "bg-gold text-charcoal border-gold" : "bg-white/5 border-white/5 text-white/40 hover:border-gold/30"
                        )}
                      >
                         <Send className="w-4 h-4" /> Physical
                      </button>
                   </div>
                </div>

                {/* Amounts */}
                <div className="space-y-4">
                   <p className="text-[10px] uppercase font-bold tracking-widest text-white/30">Select Amount</p>
                   <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                      {AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setSelectedAmount(amt)}
                          className={cn(
                            "py-3 rounded-lg border text-sm font-bold transition-all",
                            selectedAmount === amt ? "bg-gold border-gold text-charcoal" : "bg-white/5 border-white/10 text-white/60 hover:border-gold/30"
                          )}
                        >
                           ${amt}
                        </button>
                      ))}
                      <div className="col-span-3 md:col-span-5 relative mt-2">
                         <input 
                           type="number" 
                           placeholder="Enter Custom Amount" 
                           className="w-full bg-white/5 border border-white/5 p-4 rounded-xl outline-none focus:border-gold px-6 text-sm"
                           onChange={(e) => setSelectedAmount(Number(e.target.value))}
                         />
                      </div>
                   </div>
                </div>

                {/* Actions */}
                <div className="pt-8 border-t border-white/5 space-y-4">
                   <button className="w-full btn-premium py-5 text-sm flex items-center justify-center gap-3">
                      Purchase Your Gift <ChevronRight className="w-5 h-5" />
                   </button>
                   <p className="text-center text-[10px] text-white/20 uppercase tracking-widest">
                      Gifts never expire. Non-transferable once activated.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
