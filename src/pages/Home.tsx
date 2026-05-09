import { BARBERS, REVIEWS, SERVICES } from "@/src/constants";
import { Scissors, Star, ArrowRight, ShieldCheck, Clock, Users, PlayCircle, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { formatPrice, cn } from "@/src/lib/utils";
import SEO from "@/src/components/SEO";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Home() {
  return (
    <div className="space-y-0">
      <SEO 
        title="Luxury Modern Barber Shop & Grooming Lounge"
        description="Experience precision haircuts, skin fades, and hot towel shaves at The Grooming Lounge. Book your master barber appointment online today."
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-0 relative z-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center py-20 lg:pr-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-[1px] w-12 bg-gold" />
              <span className="text-gold text-[12px] uppercase tracking-[0.4em] font-bold">Est. 2018 • Downtown District</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif italic leading-[1.1] mb-8">
              Precision Cuts.<br/>
              <span className="not-italic text-gold">Premium</span> Experience.
            </h1>
            
            <p className="text-white/40 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light italic">
              Experience the intersection of traditional craftsmanship and modern luxury. 
              Dedicated to the discerning gentleman who values quality and class.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-10">
              <div className="flex flex-col">
                <span className="text-4xl font-serif text-white">4.9/5</span>
                <div className="flex text-gold text-xs gap-1 mt-1 italic">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-gold" />)}
                </div>
                <span className="text-[10px] text-white/30 uppercase tracking-widest mt-2">2,400+ Verified Reviews</span>
              </div>
              
              <div className="hidden sm:block h-12 w-[1px] bg-white/10" />
              
              <div className="flex flex-col">
                <span className="text-xs text-gold font-bold uppercase tracking-widest">Next Slot</span>
                <span className="text-2xl font-serif mt-1">Today, 2:30 PM</span>
                <span className="text-[10px] text-green-500 uppercase font-black mt-1 tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Open Until 9:00 PM
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 mt-16">
              <Link to="/book" className="btn-premium">
                Book Appointment
              </Link>
              <Link to="/services" className="btn-outline">
                View Services
              </Link>
            </div>
          </motion.div>

          {/* Right Visual (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-5 relative">
            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(197,160,89,0.08)_0%,_transparent_70%)]" />
            
            <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
               {/* Abstract Frame */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1.2 }}
                 className="w-80 h-[500px] border border-white/5 rounded-t-full relative flex items-end justify-center pb-20 overflow-hidden"
               >
                  <div className="absolute inset-0 bg-linear-to-b from-gold/10 to-transparent" />
                  <div className="text-white/5 text-[150px] font-serif rotate-90 translate-x-12 select-none pointer-events-none">LUXURY</div>
                  <div className="z-20 text-center">
                     <p className="text-gold font-serif italic text-4xl mb-2">The Craft</p>
                     <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">Master Barbers</p>
                  </div>
               </motion.div>
            </div>

            {/* Floating Barber Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-12 right-0 glass-morphism p-8 w-72 z-30 shadow-premium"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-neutral-dark border border-gold/50 p-1">
                  <img 
                    src={BARBERS[0].image} 
                    alt={BARBERS[0].name} 
                    className="w-full h-full rounded-full object-cover grayscale active:grayscale-0 transition-all"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-tight">{BARBERS[0].name}</h4>
                  <p className="text-[9px] text-gold uppercase tracking-[0.2em] font-bold">{BARBERS[0].role}</p>
                </div>
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed mb-6 italic">"Specializing in classic tapers and executive razor shaves. Excellence is our standard."</p>
              <Link to="/barbers" className="block text-center border border-white/10 py-3 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-charcoal transition-all">
                The Artisans
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Global Text Overlay Background */}
        <div className="absolute inset-0 z-0 opacity-[0.02] flex items-center justify-center select-none pointer-events-none overflow-hidden">
          <h1 className="text-[500px] font-serif font-black tracking-tighter uppercase whitespace-nowrap">VANGUARD</h1>
        </div>
      </section>

      {/* Featured Services Grid */}
      <section className="py-32 bg-charcoal relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-gold" />
                <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">Signature Menu</span>
              </div>
              <h2 className="text-5xl font-serif">Executive <span className="italic">Grooming</span></h2>
            </div>
            <Link to="/services" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 border-b border-white/10 pb-2 hover:text-gold hover:border-gold transition-all">
              Full Service Menu
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.filter(s => s.popular).map((service, i) => (
              <motion.div
                key={service.id}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "p-8 group transition-all duration-500 relative",
                  i === 2 ? "bg-neutral-dark/80 border border-gold" : "bg-neutral-dark/40 border border-white/5 hover:border-gold/30"
                )}
              >
                {i === 2 && (
                  <div className="absolute -top-3 right-4 bg-gold text-black text-[9px] font-black uppercase px-3 py-1 tracking-widest shadow-premium">
                    Top Rated
                  </div>
                )}
                <div className="mb-8">
                  <span className="text-[10px] text-white/20 uppercase font-black tracking-widest">{service.category}</span>
                  <h3 className="text-xl font-serif italic mt-2 uppercase">{service.name}</h3>
                </div>
                <p className="text-white/40 text-xs leading-relaxed mb-10 h-12 overflow-hidden">
                  {service.description}
                </p>
                <div className="flex items-center justify-between border-t border-white/5 pt-8">
                  <span className="text-gold font-serif text-lg">{formatPrice(service.price)}</span>
                  <Link to={`/book?service=${service.id}`} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all group-hover:bg-gold group-hover:text-charcoal">
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Craftsmanship Section */}
      <section className="py-32 bg-slate-dark relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div {...fadeInUp} className="aspect-[4/5] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600&h=800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Craft" />
                </motion.div>
                <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="aspect-square bg-gold flex flex-col items-center justify-center p-8 text-center text-charcoal">
                  <span className="text-5xl font-serif italic mb-2 tracking-tighter">12yr</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Master Legacy</span>
                </motion.div>
              </div>
              <div className="space-y-4 pt-12">
                <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="aspect-square bg-neutral-dark border border-white/5 flex items-center justify-center">
                  <Scissors className="w-12 h-12 text-gold/30" />
                </motion.div>
                <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="aspect-[4/5] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1593702295094-ada74fb4a798?auto=format&fit=crop&q=80&w=600&h=800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Craft" />
                </motion.div>
              </div>
            </div>
            
            <motion.div {...fadeInUp} className="order-1 lg:order-2 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-gold" />
                  <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">The Philosophy</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif">The Pursuit of <br/><span className="italic">Perfection.</span></h2>
              </div>
              
              <p className="text-white/40 text-lg leading-relaxed italic">
                We believe that every man deserves a sanctuary where he can disconnect from the world and focus on his arrival. Our master barbers are trained in ancient traditions with modern execution.
              </p>

              <div className="grid sm:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <ShieldCheck className="w-8 h-8 text-gold" />
                  <h4 className="text-xs uppercase font-black tracking-widest">Heritage Tools</h4>
                  <p className="text-white/30 text-xs leading-relaxed">We combine world-class razor skills with the industry's most advanced organic solutions.</p>
                </div>
                <div className="space-y-4">
                  <Clock className="w-8 h-8 text-gold" />
                  <h4 className="text-xs uppercase font-black tracking-widest">Curation Time</h4>
                  <p className="text-white/30 text-xs leading-relaxed">No rushed chairs. We allocate maximum time to ensure every detail of your style is perfected.</p>
                </div>
              </div>

              <div className="pt-6">
                <Link to="/barbers" className="btn-premium">
                  Meet The Team
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Showcase */}
      <section className="py-32 bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <div className="flex justify-center items-center gap-3">
              <div className="h-[1px] w-6 bg-gold" />
              <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">Client Verdict</span>
              <div className="h-[1px] w-6 bg-gold" />
            </div>
            <h2 className="text-5xl font-serif italic uppercase">Voices of <span className="not-italic">Distinction</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.slice(0, 3).map((review, i) => (
              <motion.div
                key={review.id}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-neutral-dark/30 border border-white/5 relative group hover:border-gold/20 transition-all duration-500"
              >
                <div className="flex text-gold gap-1 mb-8">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-gold" />)}
                </div>
                <p className="text-lg italic text-white/70 leading-relaxed mb-10">"{review.comment}"</p>
                <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                  <div className="w-10 h-10 rounded-full bg-white/5 p-0.5 border border-white/10 group-hover:border-gold/50 transition-all">
                    <img src={review.avatar} className="w-full h-full rounded-full grayscale" alt={review.userName} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest">{review.userName}</h4>
                    <p className="text-[8px] text-white/30 uppercase tracking-[0.2em] mt-1 font-bold">{review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Large CTA Section */}
      <section className="py-40 bg-slate-dark relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
          <motion.div {...fadeInUp} className="space-y-6">
             <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold">Secure Your Legacy</span>
             <h2 className="text-6xl md:text-8xl font-serif leading-[1.1]">
                Mastery in <br/> Every <span className="italic">Stroke.</span>
             </h2>
          </motion.div>
          
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <Link to="/book" className="btn-premium px-16 text-[11px]">
                Book Appointment
             </Link>
             <Link to="/contact" className="btn-outline px-16 text-[11px]">
                Get Directions
             </Link>
          </motion.div>
        </div>

        {/* Faded Background Text */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 opacity-[0.03] select-none pointer-events-none">
          <h1 className="text-[400px] font-serif font-black italic uppercase leading-none">CRAFT</h1>
        </div>
      </section>

    </div>
  );
}
