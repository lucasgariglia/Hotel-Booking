import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Wind, Droplets, Hexagon, Calendar, Users, ChevronDown, Key } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
   const navigate = useNavigate();
   const containerRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

   const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
   const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

   const [checkIn, setCheckIn] = useState("");
   const [checkOut, setCheckOut] = useState("");
   const [guests, setGuests] = useState("2");

   const handleSearch = () => {
      const params = new URLSearchParams();
      if (checkIn) params.set('checkIn', checkIn);
      if (checkOut) params.set('checkOut', checkOut);
      params.set('guests', guests);
      navigate(`/rooms?${params.toString()}`);
   }

   return (
      <main ref={containerRef} className="w-full bg-[#0A0A0A] text-[#E5E5E5] overflow-x-hidden selection:bg-[#C5A059] selection:text-black">

         {/* SECTION 1: HERO */}
         <section className="relative h-screen w-full overflow-hidden flex flex-col justify-between">
            <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
               <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 scale-105" alt="Hero" />
               <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
            </motion.div>

            {/* HERO TEXT: FIXED SPACING TO CLEAR NAVBAR */}
            <div className="relative z-10 flex-1 flex flex-col justify-center w-[88vw] mx-auto pointer-events-none pt-[clamp(8rem,15vh,12rem)]">
               <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
                  <div className="flex items-center gap-[1.5vw] mb-[clamp(2rem,4vh,5rem)] ml-2">
                     <span className="h-[1px] w-[3vw] bg-[#C5A059]"></span>
                     <span className="text-[#C5A059] text-[clamp(10px,0.7vw,14px)] font-bold uppercase tracking-[0.4em]">Est. MCMXXIV</span>
                  </div>
                  <h1 className="font-serif text-[clamp(2.8rem,9.5vw,11rem)] leading-[0.82] text-white tracking-tighter mix-blend-overlay">
                     Sanctuary <br />
                     <span className="text-transparent stroke-text italic ml-[12vw]">Shadows</span>
                  </h1>
               </motion.div>
            </div>

            {/* SEARCH BAR: ELASTIC PADDING FOR CHROMEBOOKS */}
            <div className="relative z-30 w-[88vw] mx-auto pb-8 lg:pb-[3vw] flex justify-center pointer-events-auto">
               <div className="w-full max-w-[1500px] bg-[#1A1A1A]/80 backdrop-blur-3xl border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center overflow-hidden">
                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 w-full divide-y lg:divide-y-0 lg:divide-x divide-white/10">
                     <div className="px-5 lg:px-[2vw] py-5 lg:py-[1.8vw] hover:bg-white/5 transition-colors group">
                        <label className="block text-[clamp(9px,0.6vw,11px)] uppercase tracking-[0.25em] text-[#C5A059] mb-2 font-bold">Arrival</label>
                        <div className="flex items-center gap-[0.7vw]">
                           <Calendar className="w-4 h-4 lg:w-[1.1vw] lg:h-[1.1vw] text-[#C5A059]" />
                           <input type="date" onChange={(e) => setCheckIn(e.target.value)} className="bg-transparent text-white w-full outline-none font-serif text-sm lg:text-[1vw] [color-scheme:dark]" />
                        </div>
                     </div>
                     <div className="px-5 lg:px-[2vw] py-5 lg:py-[1.8vw] hover:bg-white/5 transition-colors group">
                        <label className="block text-[clamp(9px,0.6vw,11px)] uppercase tracking-[0.25em] text-[#C5A059] mb-2 font-bold">Departure</label>
                        <div className="flex items-center gap-[0.7vw]">
                           <Calendar className="w-4 h-4 lg:w-[1.1vw] lg:h-[1.1vw] text-[#C5A059]" />
                           <input type="date" onChange={(e) => setCheckOut(e.target.value)} className="bg-transparent text-white w-full outline-none font-serif text-sm lg:text-[1vw] [color-scheme:dark]" />
                        </div>
                     </div>
                     <div className="px-5 lg:px-[2vw] py-5 lg:py-[1.8vw] hover:bg-white/5 transition-colors group relative">
                        <label className="block text-[clamp(9px,0.6vw,11px)] uppercase tracking-[0.25em] text-[#C5A059] mb-2 font-bold">Guests</label>
                        <div className="flex items-center gap-[0.7vw]">
                           <Users className="w-4 h-4 lg:w-[1.1vw] lg:h-[1.1vw] text-[#C5A059]" />
                           <select onChange={(e) => setGuests(e.target.value)} value={guests} className="bg-transparent text-white w-full outline-none font-serif text-sm lg:text-[1vw] appearance-none cursor-pointer [color-scheme:dark]">
                              <option value="1" className="bg-[#0A0A0A]">1 Guest</option>
                              <option value="2" className="bg-[#0A0A0A]">2 Guests</option>
                              <option value="3" className="bg-[#0A0A0A]">3 Guests</option>
                              <option value="4" className="bg-[#0A0A0A]">4 Guests</option>
                           </select>
                           <ChevronDown className="w-3 h-3 lg:w-[0.8vw] lg:h-[0.8vw] text-[#C5A059] absolute right-6 lg:right-[2vw] pointer-events-none" />
                        </div>
                     </div>
                  </div>
                  <button onClick={handleSearch} className="w-full lg:w-auto px-10 lg:px-[3.5vw] py-8 lg:py-0 lg:h-full lg:self-stretch bg-[#C5A059] hover:bg-white text-[#0A0A0A] uppercase font-bold tracking-[0.3em] text-[clamp(10px,0.75vw,13px)] transition-all flex items-center justify-center gap-[1vw]">
                     Check Availability <ArrowRight className="w-4 h-4 lg:w-[1.1vw] lg:h-[1.1vw]" />
                  </button>
               </div>
            </div>
         </section>

         {/* SECTION 2: ASYMMETRICAL OVERLAP */}
         <section className="relative py-32 md:py-[10vw] bg-[#0A0A0A] overflow-hidden">
            <div className="w-[90vw] mx-auto max-w-[1600px]">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-[4vw] relative">
                  <div className="lg:col-span-5 relative z-20 pt-[2vw]">
                     <h2 className="font-serif text-4xl md:text-[clamp(2.5rem,5vw,6rem)] text-white mb-[2vw] leading-[1.1]">
                        Brutalism <br />
                        <span className="italic text-[#C5A059] ml-[4vw]">Meets Velvet</span>
                     </h2>
                     <div className="w-[4vw] h-[1px] bg-[#C5A059] mb-[2vw]"></div>
                     <p className="text-white/60 font-light text-base md:text-[clamp(1rem,1.2vw,1.4rem)] leading-relaxed mb-[3vw]">
                        We didn't just restore a building; we resurrected a soul.
                        The Obsidian Retreat stands as a testament to the city's industrial past.
                     </p>
                     <Link to="/about" className="inline-flex items-center gap-[1vw] text-xs md:text-[0.8vw] font-bold uppercase tracking-[0.2em] text-white hover:text-[#C5A059] group">
                        Read Our Heritage <ArrowRight className="w-4 h-4 md:w-[1vw] md:h-[1vw] group-hover:translate-x-2 transition-transform" />
                     </Link>
                  </div>
                  <div className="lg:col-span-8 lg:col-start-6 lg:-mt-[5vw] relative z-10">
                     <motion.div style={{ y: yParallax }} className="relative aspect-[16/10] w-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop" alt="Architecture" className="w-full h-full object-cover grayscale contrast-125" />
                     </motion.div>
                  </div>
               </div>
            </div>
         </section>
      </main>
   );
};

export default Home;