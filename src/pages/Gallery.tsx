import { motion } from "motion/react";
import { useState } from "react";
import { Maximize2, Scissors } from "lucide-react";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1593702295094-ada74fb4a798?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1621605815345-bb93a4706192?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1512690118235-8c4f09703666?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1493238792040-d710d03666f3?auto=format&fit=crop&q=80&w=600&h=600"
];

export default function Gallery() {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - container.left) / container.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
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
            The Showcase
          </motion.h1>
          <p className="text-white/40 font-light leading-relaxed">
            Witness the precision. From classic scissoring to modern skin fades, explore our master transformations.
          </p>
        </header>

        {/* Before/After Interactive Slider */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight">Master Transformation</h2>
            <div className="h-[1px] flex-grow bg-white/10" />
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold">Slide to Reveal</span>
          </div>
          
          <div 
            className="relative h-[600px] w-full rounded-[40px] overflow-hidden cursor-ew-resize group select-none shadow-premium"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
          >
            {/* After Image */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1593702295094-ada74fb4a798?auto=format&fit=crop&q=80&w=1920&h=1080" 
                className="w-full h-full object-cover grayscale-0" 
                alt="After"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-1/2 right-12 -translate-y-1/2 text-right">
                <span className="text-[120px] font-black text-white/10 uppercase leading-none block">After</span>
                <span className="text-gold font-bold uppercase tracking-widest bg-charcoal/80 px-4 py-2 rounded-lg">High Skin Fade</span>
              </div>
            </div>

            {/* Before Image (Clipped) */}
            <div 
              className="absolute inset-0 grayscale border-r-2 border-gold shadow-2xl z-10"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1512690118235-8c4f09703666?auto=format&fit=crop&q=80&w=1920&h=1080" 
                className="w-full h-full object-cover" 
                alt="Before"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-1/2 left-12 -translate-y-1/2">
                <span className="text-[120px] font-black text-white/5 uppercase leading-none block">Before</span>
                <span className="text-white/60 font-bold uppercase tracking-widest bg-charcoal/80 px-4 py-2 rounded-lg">Overgrown Shag</span>
              </div>
            </div>

            {/* Drag Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-gold z-20 transition-opacity"
              style={{ left: `${sliderPosition}%` }}
            >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-premium group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-6 h-6 text-charcoal rotate-45" />
               </div>
            </div>
          </div>
        </section>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-square rounded-3xl overflow-hidden shadow-xl"
            >
              <img 
                src={img} 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
                alt="Gallery"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-charcoal scale-0 group-hover:scale-100 transition-transform">
                    <Scissors className="w-6 h-6" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-32 text-center">
           <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-black mb-6">See our daily grind</p>
           <a href="#" className="inline-flex items-center gap-4 text-4xl md:text-5xl font-black uppercase hover:text-gold transition-colors">
             @TheGroomingLounge
           </a>
        </div>
      </div>
    </div>
  );
}
