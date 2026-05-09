import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SERVICES, BARBERS } from "@/src/constants";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronRight, ChevronLeft, Calendar, User, Scissors, Star, Clock, CreditCard, LogIn } from "lucide-react";
import { cn, formatPrice } from "@/src/lib/utils";
import SEO from "@/src/components/SEO";
import { useAuth } from "@/src/context/AuthContext";
import { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } from "@/src/lib/firebase";

const STEPS = ["Service", "Barber", "Date & Time", "Details"];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [selectedService, setSelectedService] = useState<string | null>(searchParams.get("service"));
  const [selectedBarber, setSelectedBarber] = useState<string | null>(searchParams.get("barber"));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [details, setDetails] = useState({ 
    name: user?.displayName || "", 
    email: user?.email || "", 
    phone: "" 
  });

  useEffect(() => {
    if (user) {
      setDetails(prev => ({
        ...prev,
        name: user.displayName || prev.name,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  const service = SERVICES.find(s => s.id === selectedService);
  const barber = BARBERS.find(b => b.id === selectedBarber);

  const nextStep = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 0, 0));

  const isStepValid = () => {
    if (step === 0) return !!selectedService;
    if (step === 1) return !!selectedBarber;
    if (step === 2) return !!selectedDate && !!selectedTime;
    if (step === 3) return !!details.name && !!details.email && !!details.phone && !!user;
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !service || !barber || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    const path = "appointments";
    try {
      const appointmentData = {
        userId: user.uid,
        userName: details.name,
        userEmail: details.email,
        userPhone: details.phone,
        serviceId: service.id,
        barberId: barber.id,
        date: selectedDate,
        time: selectedTime,
        status: "pending",
        createdAt: serverTimestamp(),
        totalPrice: service.price
      };

      await addDoc(collection(db, path), appointmentData);
      navigate("/confirmation", { state: { booking: { ...appointmentData, service, barber } } });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0A0A0A]">
      <SEO 
        title="Book Your Grooming Appointment"
        description="Seamless online booking for your next haircut or beard trim. Select your service, barber, and preferred time slot."
      />
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Progress Header */}
        <div className="mb-20 text-center space-y-6">
          <div className="flex justify-center items-center gap-3">
             <div className="h-[1px] w-8 bg-gold" />
             <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">The Lounge</span>
             <div className="h-[1px] w-8 bg-gold" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic uppercase">Secure <span className="not-italic">Your Slot</span></h1>
          
          <div className="flex flex-col items-center gap-4 pt-10">
            <div className="flex gap-3 justify-center max-w-md w-full">
              {STEPS.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-[2px] flex-grow transition-all duration-700",
                    i <= step ? "bg-gold" : "bg-white/5"
                  )} 
                />
              ))}
            </div>
            <div className="flex gap-8 justify-center text-[9px] uppercase tracking-[0.2em] text-white/20 font-black">
               {STEPS.map((s, i) => (
                  <span key={i} className={cn(i === step && "text-gold")}>{s}</span>
               ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Booking Area */}
          <div className="lg:col-span-8 space-y-12">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10"
                >
                  <div className="space-y-2 border-l-2 border-gold pl-6">
                    <h2 className="text-2xl font-serif italic uppercase">Select Artistry</h2>
                    <p className="text-white/20 text-xs tracking-widest uppercase font-bold">Choose your rejuvenation experience</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedService(s.id)}
                        className={cn(
                          "w-full p-8 transition-all group border text-left flex items-center justify-between",
                          selectedService === s.id ? "bg-white text-charcoal border-white" : "bg-neutral-dark/40 border-white/5 text-white hover:border-gold/30"
                        )}
                      >
                        <div className="flex items-center gap-6">
                           <Scissors className={cn("w-6 h-6", selectedService === s.id ? "text-charcoal" : "text-gold/40")} />
                           <div className="space-y-1">
                             <p className="text-lg font-serif italic uppercase tracking-wider">{s.name}</p>
                             <p className={cn("text-[10px] uppercase font-black tracking-widest", selectedService === s.id ? "text-charcoal/40" : "text-white/30")}>{s.duration} Minutes</p>
                           </div>
                        </div>
                        <p className={cn("text-xl font-serif italic", selectedService === s.id ? "text-charcoal" : "text-gold")}>{formatPrice(s.price)}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10"
                >
                   <div className="space-y-2 border-l-2 border-gold pl-6">
                    <h2 className="text-2xl font-serif italic uppercase">Master Artisans</h2>
                    <p className="text-white/20 text-xs tracking-widest uppercase font-bold">Choose your specialist</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {BARBERS.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBarber(b.id)}
                        className={cn(
                          "p-8 transition-all border text-left flex flex-col items-center text-center",
                          selectedBarber === b.id ? "bg-white text-charcoal border-white" : "bg-neutral-dark/40 border-white/5 text-white hover:border-gold/30"
                        )}
                      >
                         <div className="w-24 h-24 mb-6 relative">
                            <img 
                              src={b.image} 
                              className={cn("w-full h-full rounded-full object-cover grayscale active:grayscale-0 transition-all", selectedBarber === b.id && "grayscale-0 border-2 border-gold/50 p-1")} 
                              alt={b.name} 
                            />
                         </div>
                         <h4 className="text-lg font-serif italic uppercase mb-1">{b.name}</h4>
                         <p className={cn("text-[9px] uppercase tracking-[0.3em] font-black mb-6", selectedBarber === b.id ? "text-charcoal/60" : "text-gold")}>{b.role}</p>
                         <div className="flex items-center gap-1 text-[10px] font-bold italic border-t border-current w-full pt-4 justify-center">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{b.rating} Verified Verdict</span>
                         </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  <div className="space-y-10">
                    <div className="space-y-2 border-l-2 border-gold pl-6">
                      <h2 className="text-2xl font-serif italic uppercase">Select Date</h2>
                      <p className="text-white/20 text-xs tracking-widest uppercase font-bold">Priority scheduling</p>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(`May ${11 + i}`)}
                          className={cn(
                            "min-w-[100px] p-8 border flex flex-col items-center gap-2 transition-all",
                            selectedDate === `May ${11 + i}` ? "bg-white border-white text-charcoal" : "bg-neutral-dark/40 border-white/5 text-white hover:border-gold/30"
                          )}
                        >
                          <span className="text-[10px] uppercase font-black tracking-widest opacity-40">{day}</span>
                          <span className="text-2xl font-serif italic">{11 + i}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-2 border-l-2 border-gold pl-6">
                      <h2 className="text-2xl font-serif italic uppercase">Arrival Time</h2>
                      <p className="text-white/20 text-xs tracking-widest uppercase font-bold">Standard 45-60 minute sessions</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["09:00", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"].map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "py-4 border text-[11px] font-black uppercase tracking-widest transition-all",
                            selectedTime === time ? "bg-gold border-gold text-charcoal shadow-premium" : "bg-neutral-dark/40 border-white/5 text-white/50 hover:text-white"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10"
                >
                   <div className="space-y-2 border-l-2 border-gold pl-6">
                    <h2 className="text-2xl font-serif italic uppercase">Gentleman Details</h2>
                    <p className="text-white/20 text-xs tracking-widest uppercase font-bold">Personalized registration</p>
                  </div>
                  
                  {!user ? (
                    <div className="p-12 bg-neutral-dark/40 border border-gold/20 text-center space-y-8">
                      <div className="w-20 h-20 bg-gold/5 border border-gold/20 flex items-center justify-center mx-auto text-gold rotate-45">
                        <LogIn className="w-10 h-10 -rotate-45" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-serif italic uppercase">Concierge Required</h3>
                        <p className="text-white/40 text-sm max-w-sm mx-auto italic">Please authenticate your account to secure the booking and access VIP perks.</p>
                      </div>
                      <button onClick={login} className="btn-premium w-full max-w-md mx-auto">
                        Authenticate with Google
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-8 max-w-lg">
                      <div className="space-y-3">
                         <label className="text-[10px] uppercase tracking-[0.3em] text-gold font-black ml-1">Appointment Name</label>
                         <input 
                           type="text" 
                           placeholder="Full Name"
                           required
                           className="w-full bg-neutral-dark border-b border-white/10 px-0 py-4 outline-none focus:border-gold transition-all text-xl font-serif italic"
                           value={details.name}
                           onChange={(e) => setDetails({...details, name: e.target.value})}
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] uppercase tracking-[0.3em] text-gold font-black ml-1">Verify Email</label>
                         <input 
                           type="email" 
                           placeholder="Email Address"
                           required
                           readOnly
                           className="w-full bg-neutral-dark border-b border-white/10 px-0 py-4 outline-none opacity-30 cursor-not-allowed font-serif italic text-lg"
                           value={details.email}
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] uppercase tracking-[0.3em] text-gold font-black ml-1">Direct Contact</label>
                         <input 
                           type="tel" 
                           placeholder="Phone Number"
                           required
                           className="w-full bg-neutral-dark border-b border-white/10 px-0 py-4 outline-none focus:border-gold transition-all text-xl font-serif italic"
                           value={details.phone}
                           onChange={(e) => setDetails({...details, phone: e.target.value})}
                         />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-10 border-t border-white/5">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="btn-outline flex items-center gap-2 group px-10">
                  <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  Prev
                </button>
              )}
              <button 
                onClick={step === STEPS.length - 1 ? handleSubmit : nextStep}
                disabled={!isStepValid() || isSubmitting}
                className={cn(
                  "btn-premium flex items-center justify-center gap-3 flex-grow",
                  (!isStepValid() || isSubmitting) && "opacity-30 grayscale cursor-not-allowed"
                )}
              >
                {isSubmitting ? "Finalizing..." : step === STEPS.length - 1 ? "Complete Registration" : "Next Architecture"}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-[#0D0D0D] border border-white/5 p-10 sticky top-32 space-y-12">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gold border-b border-white/5 pb-6">Architecture</h3>
              
              <div className="space-y-10">
                {service ? (
                  <div className="space-y-2">
                    <p className="text-[9px] uppercase tracking-widest text-white/20 font-black">Design</p>
                    <p className="font-serif italic text-xl uppercase text-white/80">{service.name}</p>
                    <p className="text-[10px] text-gold font-black tracking-widest">{formatPrice(service.price)}</p>
                  </div>
                ) : (
                  <div className="text-white/10 text-[10px] uppercase tracking-widest italic font-bold">Defining service...</div>
                )}

                {barber && (
                  <div className="space-y-2">
                    <p className="text-[9px] uppercase tracking-widest text-white/20 font-black">Artisan</p>
                    <p className="font-serif italic text-xl uppercase text-white/80">{barber.name}</p>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="space-y-2">
                    <p className="text-[9px] uppercase tracking-widest text-white/20 font-black">Logistics</p>
                    <p className="font-serif italic text-xl uppercase text-white/80">{selectedDate} @ {selectedTime}</p>
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 pt-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-black text-white/20">Valuation</span>
                  <span className="text-3xl font-serif text-gold italic">{service ? formatPrice(service.price) : "$0.00"}</span>
                </div>
                <p className="text-[9px] text-white/20 uppercase tracking-widest font-bold mt-4">In-Studio Settlement only</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-[9px] text-white/20 font-black uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Instant Authentication
                </div>
                <div className="flex items-center gap-3 text-[9px] text-white/20 font-black uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Flexible Cancellation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
