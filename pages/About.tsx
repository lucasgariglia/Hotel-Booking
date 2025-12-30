import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Scroll, Zap, Droplets, Mic2, Shield, ArrowDown, Clock } from 'lucide-react';

const About: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0.1, 0.4], ["20%", "-20%"]);
  const ghostTextMove = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const history = [
    { year: '1924', title: 'The Monolith', desc: 'Commissioned by the Obsidian Mining Corp. Designed to cast a shadow over the stock exchange.' },
    { year: '1952', title: 'Velvet Underground', desc: 'The basement vaults were converted into the city’s most exclusive jazz cellar. Miles played here.' },
    { year: '1989', title: 'The Great Silence', desc: 'Abandoned following the market crash. The building slept for three decades, preserving its soul in dust.' },
    { year: '2024', title: 'The Awakening', desc: 'Reopened not as a hotel, but as a habitable art piece. A dialogue between the past and the avant-garde.' }
  ];

  return (
    <main ref={containerRef} className="bg-[#0A0A0A] min-h-screen text-[#E5E5E5] overflow-x-hidden selection:bg-[#C5A059] selection:text-black">
      
      {/* SECTION 1: HERO */}
      <section className="relative h-[85vh] lg:h-screen w-full overflow-hidden flex flex-col justify-end pb-20 md:pb-32">
         {/* Background with Parallax & Noise */}
         <div className="absolute inset-0 z-0">
             <motion.div style={{ y: yHero }} className="w-full h-[120%] relative -top-[10%]">
               <img 
                 src="https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=2515&auto=format&fit=crop" 
                 className="w-full h-full object-cover opacity-40 grayscale contrast-125" 
                 alt="Architecture Detail" 
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0A0A0A]"></div>
               <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>
             </motion.div>
         </div>

         {/* Hero Content */}
         <div className="relative z-10 w-[92%] max-w-[1800px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
               <div className="flex items-center gap-6 mb-6">
                  <span className="h-[1px] w-12 bg-[#C5A059]"></span>
                  <span className="text-[#C5A059] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">The Heritage</span>
               </div>
               
               <h1 className="font-serif text-[clamp(4rem,13vw,11rem)] leading-[0.85] text-white tracking-tighter">
                 Timeless <br/>
                 <span className="ml-[12vw] italic text-white/40 block mt-[-2vw] mix-blend-overlay">Echoes</span>
               </h1>
            </motion.div>
         </div>

         {/* Scroll Indicator */}
         <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 right-10 hidden md:flex items-center gap-4 text-white/30"
         >
            <span className="text-[9px] uppercase tracking-widest">Scroll</span>
            <div className="h-12 w-[1px] bg-white/20 overflow-hidden">
               <motion.div 
                  animate={{ y: ["0%", "100%"] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }} 
                  className="h-1/2 w-full bg-[#C5A059]"
               />
            </div>
         </motion.div>
      </section>

      {/* SECTION 2: NARRATIVE - OVERLAP LAYOUT */}
      <section className="relative py-24 md:py-40 bg-[#0A0A0A] overflow-hidden">
         {/* Ghost Typography Background */}
         <motion.div style={{ x: ghostTextMove }} className="absolute top-20 left-0 w-full whitespace-nowrap pointer-events-none opacity-[0.03] select-none z-0">
            <span className="font-serif text-[25vw] leading-none text-white">OBSIDIAN 1924</span>
         </motion.div>

         <div className="w-[92%] max-w-[1800px] mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
               
               {/* Image: Spans Left Side (Cols 1-8) */}
               <div className="md:col-span-8 md:col-start-1 md:row-start-1 relative">
                  <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000">
                     <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-overlay z-10"></div>
                     <img 
                       src="https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop" 
                       alt="Vintage Hallway" 
                       className="w-full h-full object-cover opacity-80"
                     />
                  </div>
                  <p className="mt-4 text-[9px] uppercase tracking-widest text-[#C5A059] flex items-center gap-2">
                     <Clock className="w-3 h-3" /> Fig 1. The Original Lobby, 1925
                  </p>
               </div>

               {/* Text: Spans Right Side (Cols 6-12) - Overlaps Image */}
               <div className="md:col-span-6 md:col-start-7 md:row-start-1 relative z-20 mt-[-10vh] md:mt-0 px-4 md:px-0 md:ml-[-80px] pointer-events-none">
                  <motion.div 
                     style={{ y: yText }}
                     className="bg-[#0A0A0A]/95 backdrop-blur-3xl border border-white/10 p-10 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden pointer-events-auto"
                  >
                     <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
                     
                     <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white mb-8 leading-[0.9]">
                        Beauty in the <br/>
                        <span className="italic text-[#C5A059]">Imperfections.</span>
                     </h2>
                     
                     <div className="w-12 h-[1px] bg-[#C5A059] mb-8"></div>
                     
                     <p className="text-white/60 font-light text-sm md:text-base lg:text-lg leading-relaxed mb-8 text-justify border-l border-white/10 pl-6">
                        We didn't just restore a building; we preserved its scars. 
                        The Obsidian Retreat stands as a testament to the city's industrial past. 
                        Where others saw cracks in the concrete, we saw veins of gold.
                     </p>
                  </motion.div>
               </div>

            </div>
         </div>
      </section>

      {/* SECTION 3: PHILOSOPHY - CENTERED EDITORIAL */}
      <section className="py-32 md:py-48 bg-[#1C1B19] relative overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
         
         <div className="w-[85%] max-w-5xl mx-auto relative z-10 text-center">
            <div className="mb-12 flex justify-center">
               <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-[#C5A059] to-transparent"></div>
            </div>
            
            <span className="text-[#C5A059] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-8 block">Our Philosophy</span>
            
            <blockquote className="font-serif text-3xl md:text-5xl lg:text-7xl leading-tight text-white italic relative">
               <span className="absolute -top-12 -left-4 md:-left-12 text-[#C5A059]/10 text-9xl font-serif">"</span>
               Luxury is not about abundance. It is about the absence of vulgarity and the presence of silence.
               <span className="absolute -bottom-12 -right-4 md:-right-12 text-[#C5A059]/10 text-9xl font-serif">"</span>
            </blockquote>
            
            <div className="mt-12 flex justify-center">
               <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-[#C5A059] to-transparent"></div>
            </div>
         </div>
      </section>

      {/* SECTION 4: THE TIMELINE */}
      <section className="py-24 md:py-32 bg-[#0A0A0A] border-t border-white/5 relative">
         <div className="w-[92%] max-w-[1800px] mx-auto">
            <h2 className="font-serif text-5xl md:text-8xl text-white mb-20 md:mb-32">
               A Century of <span className="italic text-[#C5A059]">Secrets</span>
            </h2>
            
            <div className="relative border-l border-white/10 ml-4 md:ml-0 md:border-l-0">
               {history.map((item, index) => (
                  <div 
                    key={index} 
                    className="group border-b border-white/5 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-baseline hover:bg-white/[0.02] transition-all duration-500 pl-8 md:pl-0 relative"
                  >
                     {/* Mobile Timeline Dot */}
                     <div className="absolute left-[-5px] top-16 w-2 h-2 rounded-full bg-[#C5A059] md:hidden"></div>

                     <div className="md:col-span-3">
                        <span className="font-serif text-6xl md:text-8xl text-white/10 group-hover:text-[#C5A059] transition-colors duration-500 block relative top-2">
                           {item.year}
                        </span>
                     </div>
                     <div className="md:col-span-3">
                        <h3 className="font-bold text-white uppercase tracking-[0.2em] text-xs md:text-sm group-hover:translate-x-2 transition-transform duration-300">
                           {item.title}
                        </h3>
                     </div>
                     <div className="md:col-span-6">
                        <p className="text-white/50 font-light text-base md:text-xl leading-relaxed max-w-xl group-hover:text-white/80 transition-colors">
                           {item.desc}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* SECTION 5: THE CANVAS (AMENITIES) - OVERLAP REVERSE */}
      <section className="relative py-24 md:py-40 bg-[#0F0F0F] overflow-hidden">
         <div className="w-[92%] max-w-[1800px] mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
               
               {/* Content: Left Side (Cols 1-6) */}
               <div className="md:col-span-6 md:col-start-1 md:row-start-1 relative z-20 mb-[-10vh] md:mb-0 px-4 md:px-0 md:mr-[-80px] pointer-events-none">
                  <div className="bg-[#0A0A0A]/95 backdrop-blur-3xl border border-white/10 p-10 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden pointer-events-auto">
                     <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
                     
                     <h3 className="font-serif text-4xl md:text-6xl text-white mb-8">The Canvas</h3>
                     <p className="text-white/60 font-light mb-12 text-base md:text-lg max-w-md">
                        We provide the essentials for a life well-lived, focusing on quality and silence.
                     </p>
                     
                     <ul className="space-y-8">
                        {[
                           { icon: Scroll, text: "1000-Thread Count Egyptian Cotton" },
                           { icon: Droplets, text: "Rainfall Showers with Aesop Amenities" },
                           { icon: Mic2, text: "Soundproofed by Acoustic Engineers" },
                           { icon: Zap, text: "Hyper-fast Connectivity, Invisible Tech" },
                           { icon: Shield, text: "Discrete Private Entrance" },
                        ].map((amenity, i) => (
                           <li key={i} className="flex items-center gap-6 group cursor-default">
                              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#C5A059] group-hover:bg-[#C5A059] transition-all duration-300">
                                 <amenity.icon className="w-5 h-5 text-white/50 group-hover:text-black transition-colors" strokeWidth={1} />
                              </div>
                              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-white/70 group-hover:text-white transition-colors">
                                 {amenity.text}
                              </span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
               
               {/* Image: Right Side (Cols 5-12) */}
               <div className="md:col-span-8 md:col-start-5 md:row-start-1 relative">
                  <div className="relative aspect-[4/5] md:aspect-[4/3] w-full overflow-hidden border border-white/5">
                     <div className="absolute inset-0 bg-[#0A0A0A]/20 z-10 mix-blend-multiply"></div>
                     <motion.div 
                        whileInView={{ scale: 1.05 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full"
                     >
                        <img 
                          src="https://images.unsplash.com/photo-1551516594-56cb78394645?q=80&w=2030&auto=format&fit=crop" 
                          alt="Interior Detail" 
                          className="w-full h-full object-cover grayscale contrast-125"
                        />
                     </motion.div>
                  </div>
               </div>

            </div>
         </div>
      </section>

    </main>
  );
};

export default About;