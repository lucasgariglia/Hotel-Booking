import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { MOCK_ROOMS } from '../constants';
import { BookingForm as BookingFormType, Booking } from '../types';
import { CheckCircle, ChevronRight, ChevronLeft, ArrowRight, Star } from 'lucide-react';

const Reservation: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Default dates
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);

  const [formData, setFormData] = useState<BookingFormType>({
    checkIn: tomorrow.toISOString().split('T')[0],
    checkOut: dayAfter.toISOString().split('T')[0],
    guests: 2,
    roomType: MOCK_ROOMS[0].id,
    name: '',
    email: '',
    specialRequests: ''
  });

  // URL Parameter Ingestion
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
  
  const calculateNights = () => {
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const subtotal = selectedRoom.price * nights;
  const tax = subtotal * 0.12; // 12% Tax
  const service = subtotal * 0.05; // 5% Service
  const total = subtotal + tax + service;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        const newBooking: Booking = {
          ...formData,
          id: Math.random().toString(36).substr(2, 9),
          totalPrice: total,
          status: 'pending',
          dateCreated: new Date().toISOString()
        };
        const existingBookings = JSON.parse(localStorage.getItem('obsidian_bookings') || '[]');
        localStorage.setItem('obsidian_bookings', JSON.stringify([newBooking, ...existingBookings]));
        setIsSubmitting(false);
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2000);
    }
  };

  if (isSuccess) {
    return (
      <main className="bg-[#0A0A0A] min-h-screen flex items-center justify-center p-4 md:p-[2vw] relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none"></div>
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="bg-[#111] border border-[#C5A059]/30 p-16 md:p-[4vw] max-w-2xl w-full text-center relative z-10 shadow-2xl shadow-[#C5A059]/10"
         >
            <div className="w-24 h-24 md:w-[6vw] md:h-[6vw] rounded-full bg-[#C5A059]/10 flex items-center justify-center mx-auto mb-10 md:mb-[2.5vw] border border-[#C5A059]">
               <CheckCircle className="w-10 h-10 md:w-[2.5vw] md:h-[2.5vw] text-[#C5A059]" strokeWidth={1} />
            </div>
            <h1 className="font-serif text-5xl md:text-[3vw] text-white mb-6 md:mb-[1.5vw]">Request Accepted</h1>
            <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mb-8 md:mb-[2vw]"></div>
            <p className="text-white/60 font-light text-lg md:text-[1.1vw] mb-12 md:mb-[3vw] leading-relaxed">
              We have received your request, <span className="text-white font-medium">{formData.name.split(' ')[0]}</span>.<br/> 
              Our concierge will contact you shortly to finalize your stay at the <span className="text-[#C5A059] italic">{selectedRoom.name}</span>.
            </p>
            <Link to="/" className="inline-flex items-center gap-4 md:gap-[1vw] px-10 py-4 md:px-[2.5vw] md:py-[1vw] bg-[#C5A059] text-[#0A0A0A] text-xs md:text-[0.8vw] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors">
              Return Home <ArrowRight className="w-4 h-4 md:w-[1vw] md:h-[1vw]"/>
            </Link>
         </motion.div>
      </main>
    );
  }

  return (
    <main ref={containerRef} className="bg-[#0A0A0A] min-h-screen text-[#E5E5E5] selection:bg-[#C5A059] selection:text-black overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] flex flex-col justify-center items-center overflow-hidden">
         <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1551516594-56cb78394645?q=80&w=2030&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale opacity-60"
              alt="Reserve Hero"
            />
         </motion.div>
         
         <div className="relative z-20 text-center w-[94vw] mx-auto pt-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#C5A059] text-[10px] md:text-[0.75vw] font-bold uppercase tracking-[0.4em] mb-6 md:mb-[1.5vw] block">The Ledger</span>
              <h1 className="font-serif text-4xl md:text-[clamp(2.5rem,10vw,12rem)] text-white tracking-tight leading-none mix-blend-overlay">
                Secure Your <br/>
                <span className="italic text-white/50">Sanctuary</span>
              </h1>
            </motion.div>
         </div>
      </section>

      {/* 2. MAIN CONTENT GRID */}
      <div className="w-[94vw] mx-auto py-12 md:py-[6vw] relative z-30 -mt-20 md:-mt-[5vw]">
         <div className="bg-[#0F0F0F] border border-white/5 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[800px]">
               
               {/* LEFT COLUMN: FORM */}
               <div className="lg:col-span-8 p-8 md:p-[4vw] lg:border-r border-white/5">
                  
                  {/* Progress Indicator */}
                  <div className="flex items-center gap-4 md:gap-[1vw] mb-16 md:mb-[4vw] text-[10px] md:text-[0.7vw] font-bold uppercase tracking-[0.2em]">
                     <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#C5A059]' : 'text-white/20'}`}>
                        <span className="border border-current w-6 h-6 md:w-[1.5vw] md:h-[1.5vw] flex items-center justify-center rounded-full">1</span>
                        <span>Itinerary</span>
                     </div>
                     <div className="w-8 md:w-[2vw] h-[1px] bg-white/10"></div>
                     <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#C5A059]' : 'text-white/20'}`}>
                        <span className="border border-current w-6 h-6 md:w-[1.5vw] md:h-[1.5vw] flex items-center justify-center rounded-full">2</span>
                        <span>Guest</span>
                     </div>
                     <div className="w-8 md:w-[2vw] h-[1px] bg-white/10"></div>
                     <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#C5A059]' : 'text-white/20'}`}>
                        <span className="border border-current w-6 h-6 md:w-[1.5vw] md:h-[1.5vw] flex items-center justify-center rounded-full">3</span>
                        <span>Confirm</span>
                     </div>
                  </div>

                  <form onSubmit={handleSubmit} className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                      
                      {/* STEP 1: ITINERARY */}
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-12 md:space-y-[3vw]"
                        >
                           <h2 className="font-serif text-4xl md:text-[3vw] text-white mb-8 md:mb-[2vw]">Select Dates & Room</h2>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[2vw]">
                              <div className="group">
                                 <label className="block text-[10px] md:text-[0.7vw] uppercase tracking-widest text-[#C5A059] mb-3 md:mb-[0.8vw] font-bold">Check In</label>
                                 <input 
                                   type="date" 
                                   name="checkIn" 
                                   required 
                                   value={formData.checkIn} 
                                   onChange={handleChange} 
                                   className="w-full bg-[#1A1A1A] border border-white/10 p-4 md:p-[1vw] text-white font-serif text-lg md:text-[1.2vw] focus:border-[#C5A059] focus:outline-none transition-colors" 
                                 />
                              </div>
                              <div className="group">
                                 <label className="block text-[10px] md:text-[0.7vw] uppercase tracking-widest text-[#C5A059] mb-3 md:mb-[0.8vw] font-bold">Check Out</label>
                                 <input 
                                   type="date" 
                                   name="checkOut" 
                                   required 
                                   value={formData.checkOut} 
                                   min={formData.checkIn}
                                   onChange={handleChange} 
                                   className="w-full bg-[#1A1A1A] border border-white/10 p-4 md:p-[1vw] text-white font-serif text-lg md:text-[1.2vw] focus:border-[#C5A059] focus:outline-none transition-colors" 
                                 />
                              </div>
                           </div>

                           <div className="space-y-6 md:space-y-[1.5vw]">
                              <label className="block text-[10px] md:text-[0.7vw] uppercase tracking-widest text-[#C5A059] mb-3 md:mb-[0.8vw] font-bold">Select Sanctuary</label>
                              <div className="grid grid-cols-1 gap-4 md:gap-[1vw]">
                                 {MOCK_ROOMS.filter(r => r.capacity >= formData.guests).map(room => (
                                   <div 
                                     key={room.id}
                                     onClick={() => setFormData({...formData, roomType: room.id})}
                                     className={`cursor-pointer group relative overflow-hidden transition-all duration-500 border ${
                                       formData.roomType === room.id ? 'border-[#C5A059] bg-[#C5A059]/5' : 'border-white/10 hover:border-white/30 bg-[#1A1A1A]'
                                     }`}
                                   >
                                      <div className="flex flex-col md:flex-row h-full">
                                         <div className="md:w-48 h-48 md:h-auto md:w-[15vw] relative overflow-hidden">
                                            <img src={room.imageUrl} alt={room.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                            {formData.roomType === room.id && (
                                               <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-overlay"></div>
                                            )}
                                         </div>
                                         <div className="flex-1 p-6 md:p-[1.5vw] flex flex-col justify-center">
                                            <div className="flex justify-between items-start mb-2 md:mb-[0.5vw]">
                                               <h3 className={`font-serif text-2xl md:text-[1.8vw] ${formData.roomType === room.id ? 'text-[#C5A059]' : 'text-white'}`}>{room.name}</h3>
                                               <span className="font-serif text-xl md:text-[1.5vw] text-white/60">${room.price}</span>
                                            </div>
                                            <p className="text-white/50 text-sm md:text-[0.9vw] font-light leading-relaxed mb-4 md:mb-[1vw] line-clamp-2">
                                               {room.description}
                                            </p>
                                            <div className="flex gap-4 md:gap-[1vw]">
                                               {room.features.slice(0, 3).map((f, i) => (
                                                  <span key={i} className="text-[9px] md:text-[0.7vw] uppercase tracking-wider text-white/30 border border-white/10 px-2 py-1">{f}</span>
                                               ))}
                                            </div>
                                         </div>
                                      </div>
                                   </div>
                                 ))}
                              </div>
                           </div>

                           <div>
                              <label className="block text-[10px] md:text-[0.7vw] uppercase tracking-widest text-[#C5A059] mb-3 md:mb-[0.8vw] font-bold">Number of Guests</label>
                              <div className="flex gap-2 md:gap-[0.5vw]">
                                 {[1, 2, 3, 4].map(num => (
                                   <button
                                     key={num}
                                     type="button"
                                     onClick={() => setFormData({...formData, guests: num})}
                                     className={`w-12 h-12 md:w-[3vw] md:h-[3vw] flex items-center justify-center border transition-all font-serif text-lg md:text-[1.2vw] ${
                                       formData.guests === num ? 'border-[#C5A059] text-[#C5A059] bg-[#C5A059]/10' : 'border-white/10 text-white/40 hover:border-white hover:text-white'
                                     }`}
                                   > {num} </button>
                                 ))}
                              </div>
                           </div>
                        </motion.div>
                      )}

                      {/* STEP 2: GUEST DETAILS */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-12 md:space-y-[3vw]"
                        >
                           <h2 className="font-serif text-4xl md:text-[3vw] text-white mb-8 md:mb-[2vw]">Guest Information</h2>
                           
                           <div className="space-y-8 md:space-y-[2vw]">
                              <div className="group">
                                 <label className="block text-[10px] md:text-[0.7vw] uppercase tracking-widest text-[#C5A059] mb-3 md:mb-[0.8vw] font-bold">Full Name</label>
                                 <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-4 md:py-[1vw] text-2xl md:text-[1.8vw] font-serif text-white focus:border-[#C5A059] outline-none transition-colors placeholder-white/10" placeholder="e.g. Jonathan Harker" />
                              </div>
                              <div className="group">
                                 <label className="block text-[10px] md:text-[0.7vw] uppercase tracking-widest text-[#C5A059] mb-3 md:mb-[0.8vw] font-bold">Email Address</label>
                                 <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-4 md:py-[1vw] text-2xl md:text-[1.8vw] font-serif text-white focus:border-[#C5A059] outline-none transition-colors placeholder-white/10" placeholder="email@address.com" />
                              </div>
                              <div className="group">
                                 <label className="block text-[10px] md:text-[0.7vw] uppercase tracking-widest text-[#C5A059] mb-3 md:mb-[0.8vw] font-bold">Special Requests</label>
                                 <textarea 
                                    name="specialRequests" 
                                    value={formData.specialRequests} 
                                    onChange={handleChange} 
                                    rows={4}
                                    className="w-full bg-[#1A1A1A] border border-white/10 p-6 md:p-[1.5vw] text-white font-serif text-lg md:text-[1.2vw] focus:border-[#C5A059] outline-none transition-colors placeholder-white/20 resize-none" 
                                    placeholder="Dietary restrictions, arrival time, etc..."
                                 />
                              </div>
                           </div>
                        </motion.div>
                      )}

                      {/* STEP 3: CONFIRMATION */}
                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-8 md:space-y-[2vw]"
                        >
                           <h2 className="font-serif text-4xl md:text-[3vw] text-white mb-8 md:mb-[2vw]">Confirm Details</h2>
                           
                           <div className="bg-[#1A1A1A] border border-white/5 p-8 md:p-[2vw] relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                 <Star className="w-24 h-24 md:w-[6vw] md:h-[6vw] text-[#C5A059]" />
                              </div>
                              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-[2vw] text-sm md:text-[0.9vw]">
                                 <div>
                                    <span className="block text-[10px] md:text-[0.7vw] uppercase tracking-widest text-white/40 mb-1">Guest</span>
                                    <span className="text-xl md:text-[1.5vw] font-serif text-white">{formData.name}</span>
                                 </div>
                                 <div>
                                    <span className="block text-[10px] md:text-[0.7vw] uppercase tracking-widest text-white/40 mb-1">Email</span>
                                    <span className="text-xl md:text-[1.5vw] font-serif text-white">{formData.email}</span>
                                 </div>
                                 <div>
                                    <span className="block text-[10px] md:text-[0.7vw] uppercase tracking-widest text-white/40 mb-1">Room</span>
                                    <span className="text-xl md:text-[1.5vw] font-serif text-white">{selectedRoom.name}</span>
                                 </div>
                                 <div>
                                    <span className="block text-[10px] md:text-[0.7vw] uppercase tracking-widest text-white/40 mb-1">Guests</span>
                                    <span className="text-xl md:text-[1.5vw] font-serif text-white">{formData.guests} Adult{formData.guests > 1 ? 's' : ''}</span>
                                 </div>
                                 <div className="md:col-span-2">
                                    <span className="block text-[10px] md:text-[0.7vw] uppercase tracking-widest text-white/40 mb-2">Special Requests</span>
                                    <p className="text-white/60 font-light italic">{formData.specialRequests || "None provided."}</p>
                                 </div>
                              </div>
                           </div>
                           
                           <div className="flex items-start gap-4 md:gap-[1vw] p-4 md:p-[1vw] bg-[#C5A059]/5 border border-[#C5A059]/20">
                              <div className="mt-1">
                                 <div className="w-4 h-4 md:w-[1vw] md:h-[1vw] rounded-full border border-[#C5A059] flex items-center justify-center">
                                    <div className="w-2 h-2 md:w-[0.5vw] md:h-[0.5vw] rounded-full bg-[#C5A059]"></div>
                                 </div>
                              </div>
                              <p className="text-[10px] md:text-[0.7vw] uppercase tracking-wider text-[#C5A059] leading-relaxed">
                                 By confirming, you agree to our terms of service. Payment will be collected upon arrival. Cancellation is free up to 24 hours before check-in.
                              </p>
                           </div>
                        </motion.div>
                      )}

                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-16 md:mt-[4vw] pt-8 md:pt-[2vw] border-t border-white/5">
                        {step > 1 ? (
                           <button 
                             type="button" 
                             onClick={() => setStep(step - 1)} 
                             className="flex items-center gap-2 text-xs md:text-[0.8vw] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
                           >
                              <ChevronLeft className="w-4 h-4 md:w-[1vw] md:h-[1vw]" /> Back
                           </button>
                        ) : <div></div>}
                        
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="flex items-center gap-4 md:gap-[1vw] bg-[#C5A059] text-[#0A0A0A] px-12 py-5 md:px-[3vw] md:py-[1.25vw] text-xs md:text-[0.8vw] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                           {isSubmitting ? 'Processing...' : step === 3 ? 'Confirm Reservation' : 'Continue'} 
                           {!isSubmitting && <ChevronRight className="w-4 h-4 md:w-[1vw] md:h-[1vw] group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </div>
                  </form>
               </div>

               {/* RIGHT COLUMN: SUMMARY STICKY */}
               <div className="lg:col-span-4 bg-[#141414] border-l border-white/5 relative">
                  <div className="sticky top-24 md:top-[6vw] p-8 md:p-[3vw]">
                     <span className="text-[#C5A059] text-[10px] md:text-[0.7vw] font-bold uppercase tracking-[0.2em] mb-6 md:mb-[1.5vw] block">Summary</span>
                     
                     {/* Room Image */}
                     <div className="relative aspect-[4/3] w-full overflow-hidden mb-8 md:mb-[2vw] border border-white/10">
                        <img 
                          src={selectedRoom.imageUrl} 
                          alt={selectedRoom.name} 
                          className="w-full h-full object-cover grayscale opacity-80"
                        />
                     </div>

                     <h3 className="font-serif text-3xl md:text-[2.2vw] text-white mb-2 md:mb-[0.5vw]">{selectedRoom.name}</h3>
                     <p className="text-white/40 text-xs md:text-[0.8vw] uppercase tracking-widest mb-8 md:mb-[2vw]">
                        {formData.checkIn} — {formData.checkOut}
                     </p>

                     {/* Price Breakdown */}
                     <div className="space-y-4 md:space-y-[1vw] border-t border-white/10 pt-8 md:pt-[2vw] mb-8 md:mb-[2vw]">
                        <div className="flex justify-between text-sm md:text-[0.9vw]">
                           <span className="text-white/40">${selectedRoom.price} × {nights} Nights</span>
                           <span className="text-white/80 font-serif">${subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm md:text-[0.9vw]">
                           <span className="text-white/40">Taxes & Fees (12%)</span>
                           <span className="text-white/80 font-serif">${tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between text-sm md:text-[0.9vw]">
                           <span className="text-white/40">Service (5%)</span>
                           <span className="text-white/80 font-serif">${service.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                     </div>

                     {/* Total */}
                     <div className="border-t border-white/10 pt-8 md:pt-[2vw] flex justify-between items-end">
                        <span className="text-[10px] md:text-[0.7vw] font-bold uppercase tracking-widest text-[#C5A059] mb-1">Total Estimate</span>
                        <span className="font-serif text-5xl md:text-[3.5vw] text-white leading-none">${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
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