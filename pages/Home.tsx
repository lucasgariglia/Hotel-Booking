import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Star, Wind, Droplets, Hexagon, Calendar, Users, ChevronDown, Key, ArrowUpRight, Compass } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
   const navigate = useNavigate();
   const containerRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

   // Parallax for Hero Background
   const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
   
   // Parallax for Section 2 (Philosophy) Text
   // As user scrolls down, text moves slightly up relative to container, creating depth against the image
   const textParallax1 = useTransform(scrollYProgress, [0.1, 0.4], ["10%", "-10%"]);
   
   // Parallax for Section 3 (Accommodation) Text
   const textParallax2 = useTransform(scrollYProgress, [0.3, 0.6], ["10%", "-10%"]);

   // State for Search
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

   const fadeInUp = {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
   };

   return (
      <main ref={containerRef} className="w-full bg-[#0A0A0A] text-[#E5E5E5] overflow-x-hidden selection:bg-[#C5A059] selection:text-black">

         {/* 
            SECTION 1: HERO 
            - Added 'bg-noise' texture overlay
            - Staggered text entrance
         */}
         <section className="relative min-h-[650px] h-screen w-full flex flex-col justify-between pb-8 md:pb-0 overflow-hidden">
            
            {/* Background Parallax */}
            <div className="absolute inset-0 z-0">
               <motion.div style={{ y: yHero }} className="w-full h-[120%] relative -top-[10%]">
                  <img 
                     src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop" 
                     className="w-full h-full object-cover opacity-50 grayscale" 
                     alt="Hero Background" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-black/60"></div>
                  <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>
               </motion.div>
            </div>

            {/* Hero Text */}
            <div className="relative z-10 w-[92%] max-w-[1800px] mx-auto pt-[20vh] md:pt-[22vh]">
               <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                     visible: { transition: { staggerChildren: 0.15 } }
                  }}
               >
                  <motion.div variants={fadeInUp} className="flex items-center gap-4 md:gap-6 mb-4">
                     <span className="h-[1px] w-8 md:w-16 bg-[#C5A059]"></span>
                     <span className="text-[#C5A059] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">Est. MCMXXIV</span>
                  </motion.div>
                  
                  <div className="relative">
                     <motion.h1 variants={fadeInUp} className="font-serif text-[clamp(4.5rem,15vw,12rem)] leading-[0.85] text-white tracking-tighter mix-blend-overlay">
                        Sanctuary
                     </motion.h1>
                     <motion.h1 variants={fadeInUp} className="font-serif text-[clamp(4.5rem,15vw,12rem)] leading-[0.85] text-transparent stroke-text italic ml-[10vw] md:ml-[12vw] mt-[-2vw] md:mt-[-1vw]">
                        Shadows
                     </motion.h1>
                  </div>
               </motion.div>
            </div>

            {/* Search Bar */}
            <div className="relative z-20 w-[92%] max-w-[1800px] mx-auto mb-8 md:mb-12">
               <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.8, duration: 1 }}
                  className="w-full lg:max-w-5xl bg-[#1A1A1A]/80 backdrop-blur-2xl border border-white/10 flex flex-col md:flex-row shadow-2xl relative overflow-hidden group"
               >
                  <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
                  
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 relative z-10">
                     <div className="p-5 md:p-6 hover:bg-white/5 transition-colors group/input">
                        <label className="block text-[9px] uppercase tracking-[0.25em] text-[#C5A059] mb-3 font-bold group-hover/input:text-white transition-colors">Arrival</label>
                        <div className="flex items-center gap-3">
                           <Calendar className="w-4 h-4 text-[#C5A059] group-hover/input:text-white transition-colors" />
                           <input type="date" onChange={(e) => setCheckIn(e.target.value)} className="bg-transparent text-white w-full outline-none font-serif text-sm md:text-base [color-scheme:dark] cursor-pointer placeholder-white/30" />
                        </div>
                     </div>
                     <div className="p-5 md:p-6 hover:bg-white/5 transition-colors group/input">
                        <label className="block text-[9px] uppercase tracking-[0.25em] text-[#C5A059] mb-3 font-bold group-hover/input:text-white transition-colors">Departure</label>
                        <div className="flex items-center gap-3">
                           <Calendar className="w-4 h-4 text-[#C5A059] group-hover/input:text-white transition-colors" />
                           <input type="date" onChange={(e) => setCheckOut(e.target.value)} className="bg-transparent text-white w-full outline-none font-serif text-sm md:text-base [color-scheme:dark] cursor-pointer" />
                        </div>
                     </div>
                     <div className="p-5 md:p-6 hover:bg-white/5 transition-colors col-span-2 md:col-span-1 group/input">
                        <label className="block text-[9px] uppercase tracking-[0.25em] text-[#C5A059] mb-3 font-bold group-hover/input:text-white transition-colors">Guests</label>
                        <div className="flex items-center gap-3 relative">
                           <Users className="w-4 h-4 text-[#C5A059] group-hover/input:text-white transition-colors" />
                           <select onChange={(e) => setGuests(e.target.value)} value={guests} className="bg-transparent text-white w-full outline-none font-serif text-sm md:text-base appearance-none cursor-pointer relative z-10">
                              <option value="1" className="bg-[#0A0A0A]">1 Guest</option>
                              <option value="2" className="bg-[#0A0A0A]">2 Guests</option>
                              <option value="3" className="bg-[#0A0A0A]">3 Guests</option>
                              <option value="4" className="bg-[#0A0A0A]">4 Guests</option>
                           </select>
                           <ChevronDown className="w-3 h-3 text-[#C5A059] absolute right-2 pointer-events-none group-hover/input:text-white transition-colors" />
                        </div>
                     </div>
                  </div>
                  <button onClick={handleSearch} className="relative z-10 w-full md:w-auto px-10 py-6 md:py-0 bg-[#C5A059] hover:bg-white text-[#0A0A0A] uppercase font-bold tracking-[0.25em] text-[10px] transition-all duration-300 flex items-center justify-center gap-3">
                     Check <ArrowRight className="w-4 h-4" />
                  </button>
               </motion.div>
            </div>
         </section>

         {/* 
            SECTION 2: PHILOSOPHY 
            ENHANCEMENT: Forced Overlap via Negative Margins & Parallax Text
            - Image spans cols 4-12
            - Text spans cols 1-6
            - Added -mr-20 on tablet/desktop to FORCE overlap physically
            - Added 'bg-noise' to text card
         */}
         <section className="py-20 md:py-32 lg:py-40 bg-[#0A0A0A] relative overflow-hidden">
            <div className="w-[92%] max-w-[1800px] mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
                  
                  {/* Image: Right Side */}
                  <div className="md:col-span-9 md:col-start-4 lg:col-span-8 lg:col-start-5 md:row-start-1 relative h-[50vh] md:h-[65vh] lg:h-[85vh] w-full z-10">
                     <div className="absolute inset-0 bg-[#0A0A0A]/20 z-10 mix-blend-multiply"></div>
                     <motion.div 
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full"
                     >
                        <img 
                           src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop" 
                           alt="Architecture" 
                           className="w-full h-full object-cover grayscale contrast-125" 
                        />
                     </motion.div>
                  </div>

                  {/* Text: Left Side Overlap */}
                  {/* Added -mr-12 md:-mr-24 to force it on top of image */}
                  <div className="md:col-span-6 md:col-start-1 md:row-start-1 relative z-20 mt-[-15vh] md:mt-0 px-4 md:px-0 md:mr-[-50px] lg:mr-[-100px] pointer-events-none">
                     <motion.div 
                        style={{ y: textParallax1 }}
                        className="bg-[#0A0A0A]/95 backdrop-blur-3xl border border-white/10 p-8 md:p-12 lg:p-20 shadow-2xl pointer-events-auto relative overflow-hidden"
                     >
                        <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
                        <div className="flex items-center gap-4 mb-6 md:mb-10">
                           <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[9px] md:text-[10px]">01 — Philosophy</span>
                           <div className="h-[1px] w-12 bg-[#C5A059]"></div>
                        </div>
                        
                        <h2 className="font-serif text-4xl md:text-[clamp(2.5rem,4vw,4.5rem)] lg:text-7xl leading-[0.9] text-white mb-8">
                           Brutalism Meets <br/>
                           <span className="italic text-[#C5A059]">Velvet Silence</span>
                        </h2>
                        
                        <p className="text-white/60 font-light text-sm md:text-base lg:text-lg leading-relaxed mb-10 text-justify border-l border-white/10 pl-6">
                           The Obsidian Retreat stands as a testament to the city's industrial past, polished into a gem of modern hospitality. Where others saw concrete, we saw canvas.
                        </p>
                        
                        <Link to="/about" className="inline-flex items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-white hover:text-[#C5A059] transition-colors group">
                           Our Heritage <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </Link>
                     </motion.div>
                  </div>

               </div>
            </div>
         </section>

         {/* 
            SECTION 3: ACCOMMODATION
            ENHANCEMENT: Reversed Logic
            - Added -ml-12 md:-ml-24 to force overlap
         */}
         <section className="py-20 md:py-32 lg:py-40 bg-[#0F0F0F] relative">
            <div className="w-[92%] max-w-[1800px] mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
                  
                  {/* Image: Left Side */}
                  <div className="md:col-span-9 md:col-start-1 lg:col-span-8 lg:col-start-1 md:row-start-1 relative z-10 h-[50vh] md:h-[65vh] lg:h-[85vh] w-full">
                     <div className="absolute inset-0 bg-[#0A0A0A]/20 z-10 mix-blend-multiply"></div>
                     <motion.div 
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full"
                     >
                        <img 
                           src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop" 
                           alt="Executive Suite" 
                           className="w-full h-full object-cover grayscale" 
                        />
                     </motion.div>
                  </div>

                  {/* Text: Right Side Overlap */}
                  <div className="md:col-span-6 md:col-start-7 lg:col-start-7 md:row-start-1 relative z-20 mt-[-15vh] md:mt-0 px-4 md:px-0 md:ml-[-50px] lg:ml-[-100px] pointer-events-none">
                     <motion.div 
                        style={{ y: textParallax2 }}
                        className="bg-[#0A0A0A]/95 backdrop-blur-3xl border border-white/10 p-8 md:p-12 lg:p-20 shadow-2xl pointer-events-auto relative overflow-hidden"
                     >
                        <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
                        <div className="flex items-center justify-start md:justify-end gap-4 mb-6 md:mb-10">
                           <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[9px] md:text-[10px]">02 — Accommodation</span>
                           <div className="h-[1px] w-12 bg-[#C5A059]"></div>
                        </div>

                        <h2 className="font-serif text-4xl md:text-[clamp(2.5rem,4vw,4.5rem)] lg:text-7xl leading-[0.9] text-white text-left md:text-right mb-8">
                           Industrial <br/>
                           <span className="italic text-[#C5A059]">Elegance</span>
                        </h2>

                        <p className="text-white/60 font-light text-sm md:text-base lg:text-lg leading-relaxed mb-10 text-left md:text-right border-l md:border-l-0 md:border-r border-white/10 pl-6 md:pl-0 md:pr-6">
                           Rooms of 35m², spacious and elegant, characterized by an exclusive interior design that combines original decorative elements with a contemporary brutalist aesthetic.
                        </p>

                        <div className="flex justify-start md:justify-end">
                           <Link to="/rooms" className="inline-flex items-center gap-4 h-12 md:h-16 px-8 md:px-10 border border-white/20 hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-[#0A0A0A] transition-all duration-300 group">
                              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em]">Reserve Key</span>
                              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                           </Link>
                        </div>
                     </motion.div>
                  </div>

               </div>
            </div>
         </section>

         {/* 
            SECTION 4: SENSORY JOURNAL 
            ENHANCEMENT: Refined grid and hover effects
         */}
         <section className="py-24 md:py-32 lg:py-48 bg-[#1C1B19] relative">
            <div className="w-[92%] max-w-[1800px] mx-auto relative z-10">
               <div className="flex flex-col items-center justify-center text-center mb-20 md:mb-32">
                  <Star className="w-6 h-6 text-[#C5A059] mb-8 animate-spin-slow" strokeWidth={1} />
                  <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl text-white mb-6">A Sensory Journal</h2>
                  <p className="text-white/40 max-w-lg text-sm md:text-base font-light tracking-wide">
                     Curated experiences designed to awaken the dormant senses.
                  </p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
                  {[
                     { icon: Wind, title: "Scent", desc: "Oud, Leather & Bergamot", sub: "Signature Fragrance" },
                     { icon: Droplets, title: "Sound", desc: "Analog & Rain Ambient", sub: "Acoustic Treatment" },
                     { icon: Hexagon, title: "Touch", desc: "Concrete & Cashmere", sub: "Material Contrast" }
                  ].map((item, i) => (
                     <div key={i} className="group p-12 lg:p-20 hover:bg-white/[0.02] transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-noise opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                        
                        <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:border-[#C5A059] transition-all duration-500">
                           <item.icon className="w-8 h-8 text-white/40 group-hover:text-[#C5A059] transition-colors duration-500" strokeWidth={0.5} />
                        </div>
                        
                        <span className="text-[#C5A059] text-[9px] uppercase tracking-[0.3em] font-bold mb-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">{item.sub}</span>
                        <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">{item.title}</h3>
                        <p className="text-white/40 text-[10px] font-light uppercase tracking-[0.2em]">{item.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* SECTION 5: CTA */}
         <section className="min-h-[60vh] md:min-h-[80vh] relative flex items-center justify-center overflow-hidden py-24">
            <div className="absolute inset-0 z-0">
               <motion.div 
                   style={{ y: useTransform(scrollYProgress, [0.8, 1], ["0%", "20%"]) }} 
                   className="w-full h-[120%]"
               >
                  <img 
                     src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop" 
                     className="w-full h-full object-cover opacity-20 grayscale" 
                     alt="City" 
                  />
               </motion.div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent"></div>
               <div className="absolute inset-0 bg-noise opacity-10"></div>
            </div>
            
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
               >
                  <Key className="w-12 h-12 text-[#C5A059] mx-auto mb-10" strokeWidth={0.5} />
                  <h2 className="font-serif text-5xl md:text-7xl lg:text-9xl text-white mb-10">Begin Your Journey</h2>
                  <Link to="/reserve" className="inline-block px-12 md:px-16 py-5 md:py-6 bg-[#C5A059] text-[#0A0A0A] hover:bg-white hover:scale-105 transition-all duration-300 uppercase text-[11px] font-bold tracking-[0.3em]">
                     Uncover The Obsidian
                  </Link>
               </motion.div>
            </div>
         </section>

      </main>
   );
};

export default Home;