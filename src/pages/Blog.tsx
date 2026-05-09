import { motion } from "motion/react";
import { BookOpen, Calendar, Clock, ChevronRight, Hash } from "lucide-react";
import { Link } from "react-router-dom";

const POSTS = [
  {
    id: 1,
    title: "The Ultimate Guide to Maintenance: Dealing with Skin Fades",
    excerpt: "Skin fades are the sharpest look in the game right now, but how do you keep that gradient fresh for weeks?",
    image: "https://images.unsplash.com/photo-1593702295094-ada74fb4a798?auto=format&fit=crop&q=80&w=800&h=500",
    date: "May 5, 2026",
    category: "Style Guide",
    readingTime: "5 min"
  },
  {
    id: 2,
    title: "Beard Oil vs. Balm: Which One Does Your Facial Hair Actually Need?",
    excerpt: "The science of facial hair grooming explained. We dive deep into textures, hold, and hydration for your beard.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800&h=500",
    date: "April 28, 2026",
    category: "Grooming Tips",
    readingTime: "7 min"
  },
  {
    id: 3,
    title: "5 Modern Classic Haircuts That Will Never Go Out Of Style",
    excerpt: "Trends come and go, but these five silhouettes remain the foundation of masculine elegance.",
    image: "https://images.unsplash.com/photo-1621605815345-bb93a4706192?auto=format&fit=crop&q=80&w=800&h=500",
    date: "April 15, 2026",
    category: "Trends",
    readingTime: "4 min"
  }
];

export default function Blog() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <header className="text-center mb-20 max-w-2xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase mb-6"
          >
            The Journal
          </motion.h1>
          <p className="text-white/40 font-light leading-relaxed">
            Insights into the world of luxury grooming, style anthropology, and precision maintenance.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 max-w-5xl mx-auto">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col md:flex-row gap-8 lg:gap-16 items-center border-b border-white/5 pb-16 last:border-0"
            >
              <div className="w-full md:w-2/5 aspect-[16/10] overflow-hidden rounded-3xl shrink-0">
                <img 
                  src={post.image} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  alt={post.title}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow space-y-4">
                <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-[0.2em] text-gold">
                  <span className="flex items-center gap-1"><Hash className="w-3 h-3" /> {post.category}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span className="flex items-center gap-1 text-white/30"><Clock className="w-3 h-3" /> {post.readingTime}</span>
                </div>
                <h2 className="text-3xl font-black uppercase leading-tight group-hover:text-gold transition-colors">
                  {post.title}
                </h2>
                <p className="text-white/50 font-light leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] uppercase text-white/30 font-bold tracking-widest">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <Link to={`/blog/${post.id}`} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:translate-x-2 transition-transform">
                    Read Journal <BookOpen className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter / Lead Capture */}
        <div className="mt-32 p-16 glass-morphism rounded-[40px] text-center max-w-4xl mx-auto shadow-premium">
           <h3 className="text-3xl font-black uppercase mb-4">Join the Inner Circle</h3>
           <p className="text-white/40 mb-10 max-w-sm mx-auto">Get exclusive grooming tips and priority appointment notifications directly to your inbox.</p>
           <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="gentleman@example.com" 
                className="flex-grow bg-white/5 border border-white/5 px-6 py-4 rounded-xl outline-none focus:border-gold transition-all"
              />
              <button type="submit" className="btn-premium whitespace-nowrap">Subscribe</button>
           </form>
           <p className="mt-6 text-[10px] text-white/20 uppercase tracking-[0.2em]">We value your privacy as much as your style.</p>
        </div>
      </div>
    </div>
  );
}
