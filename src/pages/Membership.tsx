import { motion } from "motion/react";
import { Check, Star, Shield, Trophy } from "lucide-react";
import { cn } from "@/src/lib/utils";

const PLANS = [
  {
    name: "Classic Member",
    price: 40,
    interval: "month",
    description: "The essentials for the monthly groomer.",
    features: [
      "1 Precision Haircut per month",
      "Complimentary Beverage",
      "10% off Grooming Products",
      "Priority Booking"
    ],
    popular: false
  },
  {
    name: "Premium Gentleman",
    price: 95,
    interval: "month",
    description: "Full service maintenance for the sharp professional.",
    features: [
      "2 Haircuts per month",
      "Unlimited Beard Maintenance",
      "Hot Towel Service",
      "15% off Grooming Products",
      "Member-Only Events"
    ],
    popular: true
  },
  {
    name: "Lounge VIP",
    price: 180,
    interval: "month",
    description: "The ultimate lifestyle grooming package.",
    features: [
      "Unlimited Haircuts",
      "Unlimited Shaves & Facial Masks",
      "Private Locker Access",
      "Complimentary Premium Spirits",
      "Guest Pass (1 per month)"
    ],
    popular: false
  }
];

export default function Membership() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <header className="text-center mb-20 max-w-2xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase mb-6"
          >
            Exclusive Membership
          </motion.h1>
          <p className="text-white/50 text-sm tracking-[0.2em] uppercase font-bold text-gradient-gold mb-8">
            Elevate Your Grooming Lifestyle
          </p>
          <p className="text-white/40 font-light leading-relaxed">
            Join the most exclusive grooming club in the city. Monthly memberships designed for consistency and value.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative p-10 rounded-3xl border flex flex-col transition-all",
                plan.popular ? "bg-white text-charcoal border-white shadow-premium scale-105 z-10" : "bg-slate-dark border-white/5 text-white"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-charcoal text-[10px] uppercase font-black px-4 py-1 rounded-full tracking-widest">
                  Most Requested
                </div>
              )}

              <div className="mb-10 text-center">
                <h3 className="text-2xl font-black uppercase mb-2">{plan.name}</h3>
                <p className={cn("text-xs font-medium uppercase tracking-widest", plan.popular ? "text-charcoal/60" : "text-white/40")}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-10 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-xl font-bold uppercase">$</span>
                  <span className="text-6xl font-display font-black leading-none">{plan.price}</span>
                </div>
                <p className="text-xs uppercase tracking-widest opacity-50 mt-2 font-bold">Per {plan.interval}</p>
              </div>

              <ul className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className={cn("w-5 h-5 shrink-0 mt-0.5", plan.popular ? "text-gold" : "text-gold")} />
                    <span className={plan.popular ? "text-charcoal/80" : "text-white/60"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={cn(
                "w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all",
                plan.popular ? "bg-charcoal text-white hover:bg-black" : "bg-gold text-charcoal hover:bg-gold-light"
              )}>
                Join the Club
              </button>
            </motion.div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
           {[
             { icon: Shield, title: "Zero Wait Time", desc: "Members get priority slots and can skip the virtual queue." },
             { icon: Star, title: "Curated Perks", desc: "Enjoy exclusive spirits, premium coffees, and monthly grooming tips." },
             { icon: Trophy, title: "Member Events", desc: "Exclusive access to our quarterly networking and style workshops." }
           ].map((benefit, i) => (
             <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gold">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold uppercase">{benefit.title}</h4>
                <p className="text-white/40 text-sm font-light leading-relaxed">{benefit.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
