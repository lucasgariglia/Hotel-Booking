import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Wind, Droplets, Hexagon, Calendar, Users, ChevronDown, Key, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
   const navigate = useNavigate();
   const containerRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

   const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
   const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

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

         {/* SECTION 1: HERO - UNTOUCHED */}
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

         {/* SECTION 2: PHILOSOPHY - ASYMMETRICAL OVERLAP (RIGHT IMAGE) */}
         <section className="py-32 lg:py-[12vw] bg-[#0A0A0A] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
            
            <div className="w-[88vw] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-0">
               
               {/* Content Box - Overlapping Right */}
               <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1 relative z-20 order-2 lg:order-1">
                  <motion.div 
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8 }}
                     className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 p-10 lg:p-[4vw] shadow-2xl lg:-mr-[10vw]"
                  >
                     <div className="flex items-center gap-4 mb-8 lg:mb-[2vw]">
                        <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[10px] lg:text-[0.7vw]">01 — Philosophy</span>
                        <div className="h-[1px] w-12 bg-[#C5A059]"></div>
                     </div>
                     
                     <h2 className="font-serif text-4xl lg:text-[clamp(3rem,4.5vw,5.5rem)] leading-[0.95] text-white mb-8 lg:mb-[2vw]">
                        Brutalism Meets <br/>
                        <span className="italic text-[#C5A059]">Velvet Silence</span>
                     </h2>
                     
                     <p className="text-white/60 font-light text-base lg:text-[clamp(0.9rem,1.1vw,1.3rem)] leading-relaxed mb-10 lg:mb-[3vw] max-w-xl text-justify">
                        We didn't just restore a building; we resurrected a soul. The Obsidian Retreat stands as a testament to the city's industrial past, polished into a gem of modern hospitality. Where others saw concrete, we saw canvas.
                     </p>
                     
                     <Link to="/about" className="inline-flex items-center gap-4 lg:gap-[1vw] text-xs lg:text-[0.8vw] font-bold uppercase tracking-[0.2em] text-white hover:text-[#C5A059] transition-colors group">
                        Our Heritage <ArrowRight className="w-4 h-4 lg:w-[1vw] lg:h-[1vw] group-hover:translate-x-2 transition-transform" />
                     </Link>
                  </motion.div>
               </div>

               {/* Image - Right Side */}
               <div className="lg:col-span-8 lg:col-start-5 lg:row-start-1 relative z-10 h-[60vh] lg:h-[90vh] w-full order-1 lg:order-2">
                  <div className="absolute inset-0 bg-[#0A0A0A]/20 z-10 mix-blend-multiply"></div>
                  <motion.div style={{ y: yParallax }} className="h-full w-full">
                     <img 
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop" 
                        alt="Architecture" 
                        className="w-full h-full object-cover grayscale contrast-125" 
                     />
                  </motion.div>
               </div>
            </div>
         </section>

         {/* SECTION 3: CURATED SPACES - ASYMMETRICAL OVERLAP (LEFT IMAGE) */}
         <section className="py-20 lg:py-[10vw] bg-[#0F0F0F] relative">
            <div className="w-[88vw] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-0">
               
               {/* Image - Left Side */}
               <div className="lg:col-span-8 lg:col-start-1 lg:row-start-1 relative z-10 h-[60vh] lg:h-[90vh] w-full">
                  <div className="absolute inset-0 bg-[#0A0A0A]/20 z-10 mix-blend-multiply"></div>
                   <motion.div 
                     initial={{ scale: 1.1 }}
                     whileInView={{ scale: 1 }}
                     transition={{ duration: 1.5 }}
                     className="h-full w-full overflow-hidden"
                  >
                     <img 
                        src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop" 
                        alt="Executive Suite" 
                        className="w-full h-full object-cover grayscale" 
                     />
                  </motion.div>
               </div>

               {/* Content Box - Overlapping Left */}
               <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 relative z-20">
                  <motion.div 
                     initial={{ opacity: 0, x: 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8 }}
                     className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 p-10 lg:p-[4vw] shadow-2xl lg:-ml-[10vw]"
                  >
                     <div className="flex items-center justify-end gap-4 mb-8 lg:mb-[2vw]">
                        <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[10px] lg:text-[0.7vw]">02 — Accommodation</span>
                        <div className="h-[1px] w-12 bg-[#C5A059]"></div>
                     </div>

                     <h2 className="font-serif text-4xl lg:text-[clamp(3rem,4.5vw,5.5rem)] leading-[0.95] text-white text-right mb-8 lg:mb-[2vw]">
                        Industrial <br/>
                        <span className="italic text-[#C5A059]">Elegance</span>
                     </h2>

                     <p className="text-white/60 font-light text-base lg:text-[clamp(0.9rem,1.1vw,1.3rem)] leading-relaxed mb-10 lg:mb-[3vw] max-w-xl ml-auto text-right">
                        Rooms of 35m², spacious and elegant, characterized by an exclusive interior design that combines original decorative elements with a contemporary brutalist aesthetic.
                     </p>

                     <div className="flex justify-end">
                        <Link to="/rooms?room=1" className="inline-flex items-center gap-4 lg:gap-[1vw] h-12 lg:h-[3.5vw] px-8 lg:px-[2.5vw] border border-white/20 hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-[#0A0A0A] transition-all group">
                           <span className="text-xs lg:text-[0.75vw] font-bold uppercase tracking-[0.2em]">Reserve Key</span>
                           <ArrowUpRight className="w-4 h-4 lg:w-[1vw] lg:h-[1vw] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* SECTION 4: SENSORY JOURNAL */}
         <section className="py-32 lg:py-[12vw] bg-[#1C1B19] relative overflow-hidden">
            <div className="w-[88vw] mx-auto relative z-10">
               <div className="text-center mb-20 lg:mb-[6vw]">
                  <Star className="w-6 h-6 lg:w-[1.5vw] lg:h-[1.5vw] text-[#C5A059] mx-auto mb-6 lg:mb-[1.5vw]" fill="#C5A059" />
                  <h2 className="font-serif text-4xl lg:text-[clamp(3rem,5vw,6rem)] text-white">A Sensory Journal</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
                  {[
                     { icon: Wind, title: "Scent", desc: "Oud, Leather & Bergamot" },
                     { icon: Droplets, title: "Sound", desc: "Analog & Rain Ambient" },
                     { icon: Hexagon, title: "Touch", desc: "Concrete & Cashmere" }
                  ].map((item, i) => (
                     <div key={i} className="group p-12 lg:p-[4vw] hover:bg-white/[0.02] transition-colors duration-500 flex flex-col items-center text-center">
                        <div className="w-16 h-16 lg:w-[4vw] lg:h-[4vw] rounded-full border border-white/10 flex items-center justify-center mb-8 lg:mb-[2vw] group-hover:border-[#C5A059] transition-colors">
                           <item.icon className="w-6 h-6 lg:w-[1.5vw] lg:h-[1.5vw] text-white/50 group-hover:text-[#C5A059] transition-colors" strokeWidth={1} />
                        </div>
                        <h3 className="font-serif text-2xl lg:text-[2vw] text-white mb-2 lg:mb-[0.5vw]">{item.title}</h3>
                        <p className="text-white/40 text-sm lg:text-[0.9vw] font-light uppercase tracking-widest">{item.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* SECTION 5: FOOTER PRE-AMBLE */}
         <section className="h-[70vh] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               <img 
                  src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop" 
                  className="w-full h-full object-cover opacity-20 grayscale" 
                  alt="City" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent"></div>
            </div>
            <div className="relative z-10 text-center px-4">
               <Key className="w-8 h-8 lg:w-[2.5vw] lg:h-[2.5vw] text-[#C5A059] mx-auto mb-8 lg:mb-[2vw]" strokeWidth={1} />
               <h2 className="font-serif text-5xl lg:text-[clamp(3.5rem,7vw,9rem)] text-white mb-8 lg:mb-[2vw]">Begin Your Journey</h2>
               <p className="text-white/60 font-light max-w-lg lg:max-w-[30vw] mx-auto mb-12 lg:mb-[4vw] text-lg lg:text-[1.2vw] leading-relaxed">
                  The shadows are waiting. Secure your sanctuary in the heart of the metropolis.
               </p>
               <Link to="/reserve" className="inline-block px-12 lg:px-[4vw] py-5 lg:py-[1.5vw] bg-[#C5A059] text-[#0A0A0A] hover:bg-white transition-all uppercase text-xs lg:text-[0.8vw] font-bold tracking-[0.25em]">
                  Uncover The Obsidian
               </Link>
            </div>
         </section>

      </main>
   );
};

export default Home;