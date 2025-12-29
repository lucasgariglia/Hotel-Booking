import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Wind, Droplets, Hexagon, Calendar, Users, ChevronDown, Key } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
   const navigate = useNavigate();
   const containerRef = useRef(null);
   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
   });

   const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
   const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

   // Search State
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
               <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop"
                  alt="Obsidian Interior"
                  className="w-full h-full object-cover opacity-60 scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
            </motion.div>

            <div className="relative z-10 flex-1 flex flex-col justify-center px-6 pointer-events-none pt-32 md:pt-0">
               <div className="container mx-auto">
                  <motion.div
                     initial={{ opacity: 0, y: 100 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                     <div className="flex items-center gap-4 mb-4 md:mb-8 ml-2">
                        <span className="h-[1px] w-8 md:w-16 bg-[#C5A059]"></span>
                        <span className="text-[#C5A059] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">Est. MCMXXIV</span>
                     </div>

                     <h1 className="font-serif text-[15vw] md:text-[11vw] leading-[0.8] text-white tracking-tighter mix-blend-overlay">
                        Sanctuary <br />
                        <span className="text-transparent stroke-text italic ml-[10vw]">Shadows</span>
                     </h1>
                  </motion.div>
               </div>
            </div>

            <div className="relative z-30 w-full px-6 pb-12 md:pb-16 flex justify-center pointer-events-auto">
               <div className="w-full max-w-6xl bg-[#1A1A1A]/70 backdrop-blur-2xl border border-white/10 p-2 shadow-2xl flex flex-col md:flex-row items-center gap-1 md:gap-0">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 w-full divide-y md:divide-y-0 md:divide-x divide-white/10">

                     {/* Arrival */}
                     <div className="px-6 py-4 hover:bg-white/5 transition-colors group cursor-pointer w-full">
                        <label className="block text-[9px] uppercase tracking-widest text-[#C5A059] mb-1 font-bold">Arrival</label>
                        <div className="flex items-center gap-2">
                           <Calendar className="w-4 h-4 text-[#C5A059]" />
                           <input
                              type="date"
                              onChange={(e) => setCheckIn(e.target.value)}
                              className="bg-transparent text-white w-full outline-none font-serif text-lg [color-scheme:dark]"
                           />
                        </div>
                     </div>

                     {/* Departure */}
                     <div className="px-6 py-4 hover:bg-white/5 transition-colors group cursor-pointer w-full">
                        <label className="block text-[9px] uppercase tracking-widest text-[#C5A059] mb-1 font-bold">Departure</label>
                        <div className="flex items-center gap-2">
                           <Calendar className="w-4 h-4 text-[#C5A059]" />
                           <input
                              type="date"
                              onChange={(e) => setCheckOut(e.target.value)}
                              className="bg-transparent text-white w-full outline-none font-serif text-lg [color-scheme:dark]"
                           />
                        </div>
                     </div>

                     {/* Guests - FIXED SECTION */}
                     <div className="px-6 py-4 hover:bg-white/5 transition-colors group cursor-pointer w-full relative">
                        <label className="block text-[9px] uppercase tracking-widest text-[#C5A059] mb-1 font-bold">Guests</label>
                        <div className="flex items-center gap-2">
                           <Users className="w-4 h-4 text-[#C5A059]" />
                           <select
                              onChange={(e) => setGuests(e.target.value)}
                              value={guests}
                              className="bg-transparent text-white w-full outline-none font-serif text-lg appearance-none cursor-pointer [color-scheme:dark]"
                           >
                              <option value="1" className="bg-[#0A0A0A] text-white">1 Guest</option>
                              <option value="2" className="bg-[#0A0A0A] text-white">2 Guests</option>
                              <option value="3" className="bg-[#0A0A0A] text-white">3 Guests</option>
                              <option value="4" className="bg-[#0A0A0A] text-white">4 Guests</option>
                           </select>
                           <ChevronDown className="w-3 h-3 text-[#C5A059] absolute right-6 pointer-events-none" />
                        </div>
                     </div>
                  </div>

                  <button onClick={handleSearch} className="w-full md:w-auto px-10 py-6 md:py-0 h-full min-h-[80px] bg-[#C5A059] hover:bg-white text-[#0A0A0A] uppercase font-bold tracking-[0.2em] text-xs transition-colors group flex items-center justify-center gap-3">
                     Check Availability
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
         </section>

         {/* SECTION 2: ASYMMETRICAL OVERLAP */}
         <section className="relative py-32 md:py-48 px-6 bg-[#0A0A0A] overflow-hidden">
            <div className="container mx-auto max-w-[1600px]">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
                  <div className="lg:col-span-5 relative z-20 pt-12">
                     <h2 className="font-serif text-5xl md:text-7xl text-white mb-8 leading-[1.1]">
                        Brutalism <br />
                        <span className="italic text-[#C5A059] ml-12">Meets Velvet</span>
                     </h2>
                     <div className="w-12 h-[1px] bg-[#C5A059] mb-8 ml-1"></div>
                     <p className="text-white/60 font-light text-lg leading-relaxed text-justify mb-12">
                        We didn't just restore a building; we resurrected a soul.
                        The Obsidian Retreat stands as a testament to the city's industrial past,
                        polished into a gem of modern hospitality.
                     </p>
                     <Link to="/about" className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-[#C5A059] transition-colors group">
                        Read Our Heritage
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                     </Link>
                  </div>

                  <div className="lg:col-span-8 lg:col-start-6 lg:-mt-24 relative z-10">
                     <motion.div style={{ y: yParallax }} className="relative aspect-[4/5] md:aspect-[16/9] w-full overflow-hidden">
                        <img
                           src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
                           alt="Architecture"
                           className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
                        />
                     </motion.div>
                  </div>
               </div>
            </div>
         </section>

         {/* SECTION 3: CURATED COLLECTIONS */}
         <section className="py-24 bg-[#0F0F0F] border-t border-white/5">
            <div className="container mx-auto px-6 max-w-[1600px]">
               <div className="flex flex-col md:flex-row justify-between items-end mb-32">
                  <div>
                     <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Accommodation</span>
                     <h3 className="font-serif text-5xl md:text-6xl text-white">Curated <span className="text-[#C5A059] italic">Spaces</span></h3>
                  </div>
               </div>

               <div className="space-y-40">
                  <div className="group relative">
                     <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-8 relative h-[60vh] overflow-hidden bg-zinc-900">
                           <img
                              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop"
                              alt="Executive Room"
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                           />
                        </div>
                        <div className="md:col-span-4 md:-ml-24 relative z-20 bg-[#111] p-12 border border-white/5 shadow-2xl">
                           <h4 className="font-serif text-3xl text-white mb-6">Industrial Elegance</h4>
                           <Link to="/rooms?room=1" className="text-white text-xs uppercase tracking-widest flex items-center gap-3 hover:text-[#C5A059] transition-colors">
                              Reserve Key <ArrowRight className="w-3 h-3" />
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* SECTION 4: SENSORY JOURNAL */}
         <section className="py-40 bg-[#1C1B19] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 max-w-[1400px]">
               <div className="text-center mb-24">
                  <Star className="w-4 h-4 text-[#C5A059] mx-auto mb-6" fill="#C5A059" />
                  <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">A Sensory Journal</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
                  <div className="bg-[#1C1B19] p-12">
                     <Wind className="w-10 h-10 text-[#C5A059] mb-8" />
                     <h3 className="font-serif text-2xl text-white mb-2">Scent</h3>
                     <p className="text-white/40 text-sm font-light">Oud, Leather & Bergamot</p>
                  </div>
                  <div className="bg-[#1C1B19] p-12">
                     <Droplets className="w-10 h-10 text-[#C5A059] mb-8" />
                     <h3 className="font-serif text-2xl text-white mb-2">Sound</h3>
                     <p className="text-white/40 text-sm font-light">Analog & Ambient</p>
                  </div>
                  <div className="bg-[#1C1B19] p-12">
                     <Hexagon className="w-10 h-10 text-[#C5A059] mb-8" />
                     <h3 className="font-serif text-2xl text-white mb-2">Touch</h3>
                     <p className="text-white/40 text-sm font-light">Concrete & Cashmere</p>
                  </div>
               </div>
            </div>
         </section>

      {/* ----------------------------------------------------------------------------------
          SECTION 5: FOOTER PRE-AMBLE (BOOKING CTA)
      ---------------------------------------------------------------------------------- */}
         <section className="h-[60vh] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               <img 
                  src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop" 
                  className="w-full h-full object-cover opacity-30 grayscale" 
                  alt="City" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"></div>
            </div>
            <div className="relative z-10 text-center px-6">
               <Key className="w-8 h-8 text-[#C5A059] mx-auto mb-8" strokeWidth={1} />
               <h2 className="font-serif text-5xl md:text-8xl text-white mb-6">Begin Your Journey</h2>
               <p className="text-white/60 font-light max-w-lg mx-auto mb-12 text-lg">
                  The shadows are waiting. Secure your sanctuary in the heart of the metropolis.
               </p>
               <Link to="/reserve" className="px-12 py-5 bg-[#C5A059] text-[#0A0A0A] hover:bg-white transition-all uppercase text-xs font-bold tracking-[0.25em]">
                  Uncover The Obsidian
               </Link>
            </div>
         </section>

      </main>
   );
};

export default Home;