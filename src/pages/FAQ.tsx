import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";

const FAQS = [
  {
    question: "Do I need an appointment or do you take walk-ins?",
    answer: "While we prioritize appointments to ensure every gentleman receives the full Lounge experience without a rush, we do accept walk-ins based on barber availability. We recommend booking at least 24-48 hours in advance for weekends."
  },
  {
    question: "How long does a standard grooming session take?",
    answer: "A precision haircut usually takes about 45 minutes, while 'The Full Lounge Experience' (Combo) takes approximately 90-120 minutes. Duration varies based on the complexity of the style and texture of the hair."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We value our barbers' time and only ask that you provide at least 12 hours' notice if you need to cancel or reschedule. Late cancellations or no-shows may be subject to a fee on their next booking."
  },
  {
    question: "Do you offer services for children?",
    answer: "Yes, we offer kids' precision cuts for young gentlemen aged 5-12. We maintain the same level of quality and care for them as we do for our adult clients."
  },
  {
    question: "What products do you use in the shop?",
    answer: "We exclusively use our proprietary plant-based grooming oils and premium brands like Baxter of California and Reuzel for styling. All products are available for purchase in-store or online."
  },
  {
    question: "Is there parking available nearby?",
    answer: "Yes, there is a multi-story parking garage just two blocks east of the studio, and metered street parking is usually available on Urban Avenue during the mornings."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <header className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 text-gold"
          >
            <HelpCircle className="w-10 h-10" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase mb-6"
          >
            Curious?
          </motion.h1>
          <p className="text-white/40 font-light leading-relaxed">
            Everything you need to know about The Grooming Lounge experience before your arrival.
          </p>
        </header>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-morphism rounded-3xl overflow-hidden border border-white/5"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left group"
              >
                <span className="text-lg font-bold uppercase tracking-tight pr-8">{faq.question}</span>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  openIdx === i ? "bg-gold text-charcoal rotate-180" : "bg-white/5 text-white/50 group-hover:bg-white/10"
                )}>
                  {openIdx === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 text-white/60 font-light leading-relaxed border-t border-white/5 pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-24 text-center glass-morphism p-12 rounded-3xl">
           <h3 className="text-2xl font-black uppercase mb-4">Still have questions?</h3>
           <p className="text-white/40 mb-8 max-w-sm mx-auto">Our concierge is happy to assist you personally with any custom requirements.</p>
           <Link to="/contact" className="btn-premium">Message Concierge</Link>
        </div>
      </div>
    </div>
  );
}
