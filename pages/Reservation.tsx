import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { MOCK_ROOMS } from '../constants';
import { BookingForm as BookingFormType, Booking } from '../types';
import { CheckCircle, ChevronRight, ChevronLeft, ArrowRight, Star, Calendar, Users } from 'lucide-react';

const Reservation: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState<BookingFormType>({
    checkIn: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    guests: 2,
    roomType: MOCK_ROOMS[0].id,
    name: '',
    email: '',
    specialRequests: ''
  });

  useEffect(() => {
    const checkInParam = searchParams.get('checkIn');
    const checkOutParam = searchParams.get('checkOut');
    const guestsParam = searchParams.get('guests');
    const roomParam = searchParams.get('room');

    setFormData(prev => ({
      ...prev,
      checkIn: checkInParam || prev.checkIn,
      checkOut: checkOutParam || prev.checkOut,
      guests: guestsParam ? parseInt(guestsParam) : prev.guests,
      roomType: roomParam || prev.roomType,
    }));
  }, [searchParams]);

  const selectedRoom = MOCK_ROOMS.find(r => r.id === formData.roomType) || MOCK_ROOMS[0];
  const nights = Math.max(1, Math.ceil(Math.abs(new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24)));
  const subtotal = selectedRoom.price * nights;
  const total = subtotal + (subtotal * 0.17);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsSubmitting(true);
      setTimeout(() => { setIsSuccess(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 2000);
    }
  };

  if (isSuccess) {
    return (
      <main className="bg-[#0A0A0A] min-h-screen flex items-center justify-center p-6 text-center">
         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md">
            <CheckCircle className="w-20 h-20 text-[#C5A059] mx-auto mb-8" strokeWidth={1} />
            <h1 className="font-serif text-5xl text-white mb-6">Confirmed</h1>
            <p className="text-white/60 mb-10 leading-relaxed">Our concierge will contact you shortly to finalize your stay at {selectedRoom.name}.</p>
            <Link to="/" className="inline-block bg-[#C5A059] text-black px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em]">Return Home</Link>
         </motion.div>
      </main>
    );
  }

  return (
    <main ref={containerRef} className="bg-[#0A0A0A] min-h-screen text-[#E5E5E5] selection:bg-[#C5A059] selection:text-black">
      
      {/* 1. HERO SECTION - Calibrated for Desktop Clearance */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center overflow-hidden">
         <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/70 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=2500&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale opacity-40" 
              alt="Hero" 
            />
         </motion.div>
         
         <div className="relative z-20 text-center w-[90vw] pt-32 pb-48 lg:pb-72">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
               <span className="text-[#C5A059] text-[10px] lg:text-[0.7vw] font-bold uppercase tracking-[0.5em] mb-6 block">The Ledger</span>
               <h1 className="font-serif text-[clamp(3rem,9vw,11rem)] text-white tracking-tighter leading-[0.85]">
                 Secure Your <br/> <span className="italic text-white/50 ml-[8vw]">Sanctuary</span>
               </h1>
            </motion.div>
         </div>
      </section>

      {/* 2. FORM CONTAINER - Desktop Overlap vs Mobile Clearance */}
      <div className="w-full lg:w-[92vw] mx-auto pb-32 relative z-30 mt-0 lg:-mt-40">
         <div className="bg-[#0F0F0F] border-y lg:border border-white/5 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
               
               {/* LEFT COLUMN: FORM */}
               <div className="lg:col-span-8 p-6 md:p-12 lg:p-[5vw] border-b lg:border-b-0 lg:border-r border-white/5">
                  
                  {/* Progress Indicator */}
                  <div className="flex flex-wrap items-center gap-6 mb-16">
                     {[ { s: 1, n: 'Itinerary' }, { s: 2, n: 'Guest' }, { s: 3, n: 'Confirm' } ].map((item) => (
                        <div key={item.s} className="flex items-center gap-4">
                           <div className={`flex items-center gap-3 ${step >= item.s ? 'text-[#C5A059]' : 'text-white/20'}`}>
                              <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold ${step >= item.s ? 'border-[#C5A059]' : 'border-white/10'}`}>
                                 {item.s}
                              </span>
                              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{item.n}</span>
                           </div>
                           {item.s < 3 && <div className="hidden sm:block w-8 h-[1px] bg-white/10"></div>}
                        </div>
                     ))}
                  </div>

                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div key="s1" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} className="space-y-12">
                           <h2 className="font-serif text-4xl lg:text-5xl text-white">Choose Sanctuary</h2>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-3">
                                 <label className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">Arrival</label>
                                 <input type="date" value={formData.checkIn} onChange={(e)=>setFormData({...formData, checkIn: e.target.value})} className="w-full bg-[#151515] border border-white/10 p-5 text-white font-serif outline-none [color-scheme:dark]" />
                              </div>
                              <div className="space-y-3">
                                 <label className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">Departure</label>
                                 <input type="date" value={formData.checkOut} onChange={(e)=>setFormData({...formData, checkOut: e.target.value})} className="w-full bg-[#151515] border border-white/10 p-5 text-white font-serif outline-none [color-scheme:dark]" />
                              </div>
                           </div>

                           <div className="grid grid-cols-1 gap-5">
                              {MOCK_ROOMS.map(room => (
                                <div key={room.id} onClick={() => setFormData({...formData, roomType: room.id})} className={`group cursor-pointer border p-5 flex flex-col md:flex-row gap-8 transition-all duration-500 ${formData.roomType === room.id ? 'border-[#C5A059] bg-[#C5A059]/5' : 'border-white/5 bg-white/[0.01] hover:border-white/20'}`}>
                                   <div className="w-full md:w-40 h-32 overflow-hidden border border-white/5">
                                      <img src={room.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="" />
                                   </div>
                                   <div className="flex-1 flex justify-between items-center">
                                      <div>
                                         <h3 className="font-serif text-2xl text-white mb-2">{room.name}</h3>
                                         <p className="text-[#C5A059] text-[10px] uppercase tracking-widest font-bold">${room.price} <span className="text-white/30 font-light">/ night</span></p>
                                      </div>
                                      {formData.roomType === room.id && <div className="w-3 h-3 rounded-full bg-[#C5A059]"></div>}
                                   </div>
                                </div>
                              ))}
                           </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div key="s2" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} className="space-y-10">
                           <h2 className="font-serif text-5xl text-white">Guest Identity</h2>
                           <div className="space-y-8">
                              <input type="text" placeholder="Full Name" required value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-white/10 py-5 text-2xl font-serif text-white focus:border-[#C5A059] outline-none placeholder:text-white/5" />
                              <input type="email" placeholder="Email Address" required value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-white/10 py-5 text-2xl font-serif text-white focus:border-[#C5A059] outline-none placeholder:text-white/5" />
                              <div className="pt-6">
                                 <label className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold mb-4 block">Special Arrangements</label>
                                 <textarea rows={4} value={formData.specialRequests} onChange={(e)=>setFormData({...formData, specialRequests: e.target.value})} className="w-full bg-[#151515] border border-white/10 p-6 text-white outline-none focus:border-[#C5A059]" placeholder="Dietary needs, airport transfer, private check-in..." />
                              </div>
                           </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div key="s3" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} className="py-20 text-center space-y-6">
                           <div className="w-20 h-20 border border-[#C5A059]/30 rounded-full flex items-center justify-center mx-auto mb-6">
                              <Star className="w-8 h-8 text-[#C5A059] animate-pulse" />
                           </div>
                           <h2 className="font-serif text-5xl text-white">Final Review</h2>
                           <p className="text-white/40 max-w-sm mx-auto leading-relaxed">Your request will be prioritized by our head concierge.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-20 pt-10 border-t border-white/5">
                        {step > 1 ? (
                           <button type="button" onClick={() => setStep(step - 1)} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all">
                              <ChevronLeft className="w-4 h-4" /> Previous
                           </button>
                        ) : <div />}
                        
                        <button type="submit" disabled={isSubmitting} className="flex items-center gap-6 bg-[#C5A059] text-black px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all group">
                           {isSubmitting ? 'Submitting...' : step === 3 ? 'Request Stay' : 'Continue'} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                  </form>
               </div>

               {/* RIGHT COLUMN: STICKY SUMMARY */}
               <div className="lg:col-span-4 bg-[#121212] p-8 md:p-12 lg:p-[4vw] border-t lg:border-t-0 border-white/5">
                  <div className="sticky top-12">
                     <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.3em] mb-10 block">Summary</span>
                     <div className="aspect-[16/10] w-full overflow-hidden mb-8 border border-white/5 grayscale">
                        <img src={selectedRoom.imageUrl} className="w-full h-full object-cover" alt="" />
                     </div>
                     <h3 className="font-serif text-3xl text-white mb-2">{selectedRoom.name}</h3>
                     <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-10">{formData.checkIn} — {formData.checkOut}</p>
                     
                     <div className="space-y-5 pt-10 border-t border-white/5 mb-10">
                        <div className="flex justify-between text-xs font-light"><span className="text-white/40">Duration</span><span className="text-white">{nights} Nights</span></div>
                        <div className="flex justify-between text-xs font-light"><span className="text-white/40">Base Rate</span><span className="text-white">${selectedRoom.price}</span></div>
                        <div className="flex justify-between text-xs font-light"><span className="text-white/40">Taxes & Service</span><span className="text-white">${(total - subtotal).toFixed(0)}</span></div>
                     </div>

                     <div className="flex justify-between items-end pt-10 border-t border-white/5">
                        <span className="text-[10px] uppercase font-bold text-[#C5A059] tracking-[0.2em]">Estimate</span>
                        <span className="font-serif text-5xl text-white leading-none">${total.toFixed(0)}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </main>
  );
};

export default Reservation;