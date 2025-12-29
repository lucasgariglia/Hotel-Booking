import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Scroll, Zap, Droplets, Mic2, Shield } from 'lucide-react';

const About: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const history = [
    { year: '1924', title: 'The Monolith', desc: 'Commissioned by the Obsidian Mining Corp. Designed to cast a shadow over the stock exchange.' },
    { year: '1952', title: 'Velvet Underground', desc: 'The basement vaults were converted into the city’s most exclusive jazz cellar. Miles played here.' },
    { year: '1989', title: 'The Great Silence', desc: 'Abandoned following the market crash. The building slept for three decades, preserving its soul in dust.' },
    { year: '2024', title: 'The Awakening', desc: 'Reopened not as a hotel, but as a habitable art piece. A dialogue between the past and the avant-garde.' }
  ];

  return (
    <main ref={containerRef} className="bg-[#0A0A0A] min-h-screen text-[#E5E5E5] overflow-x-hidden selection:bg-[#C5A059] selection:text-black">
      
      {/* ----------------------------------------------------------------------------------
          SECTION 1: HERO (The Architect's Dream)
      ---------------------------------------------------------------------------------- */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center">
         <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=2515&auto=format&fit=crop" 
             className="w-full h-full object-cover opacity-50 grayscale contrast-125" 
             alt="Architecture Detail" 
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0A0A0A]"></div>
         </motion.div>

         <div className="relative z-10 container mx-auto px-6 pt-32 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
               <span className="text-[#C5A059] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4 block">The Heritage</span>
               <h1 className="font-serif text-[15vw] md:text-[12vw] leading-[0.8] text-white tracking-tighter mix-blend-overlay">
                 Timeless <br/>
                 <span className="ml-[15vw] italic text-white/80">Echoes</span>
               </h1>
            </motion.div>
         </div>
      </section>

      {/* ----------------------------------------------------------------------------------
          SECTION 2: NARRATIVE (Asymmetrical Text)
      ---------------------------------------------------------------------------------- */}
      <section className="relative py-32 md:py-48 px-6 bg-[#0A0A0A]">
         <div className="container mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start">
               {/* Left Column: Image */}
               <div className="md:col-span-5 relative z-10">
                  <div className="relative aspect-[3/4] overflow-hidden">
                     <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-overlay z-10"></div>
                     <img 
                       src="https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop" 
                       alt="Vintage Hallway" 
                       className="w-full h-full object-cover grayscale opacity-80"
                     />
                  </div>
                  <p className="mt-4 text-[10px] uppercase tracking-widest text-[#C5A059] text-right">Fig 1. The Original Lobby, 1925</p>
               </div>

               {/* Right Column: Narrative */}
               <div className="md:col-span-6 md:col-start-7 pt-12 md:pt-32">
                  <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
                     Beauty in the <br/>
                     <span className="italic text-[#C5A059]">Imperfections.</span>
                  </h2>
                  <div className="w-16 h-[1px] bg-white/20 mb-8"></div>
                  <p className="text-white/60 font-light text-lg leading-relaxed mb-8 text-justify">
                     We didn't just restore a building; we preserved its scars. 
                     The Obsidian Retreat stands as a testament to the city's industrial past. 
                     Where others saw cracks in the concrete, we saw veins of gold. 
                     Where others heard silence, we heard the potential for peace.
                  </p>
                  <p className="text-white/60 font-light text-lg leading-relaxed text-justify">
                     It is a place where the grandeur of the Roaring Twenties meets 
                     the stripped-back honesty of modern brutalism. A sanctuary for those 
                     who find comfort in the shadows.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* ----------------------------------------------------------------------------------
          SECTION 3: PHILOSOPHY (Earthy Tone)
      ---------------------------------------------------------------------------------- */}
      <section className="py-40 bg-[#1C1B19] relative overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
         
         <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
            <div className="w-[1px] h-20 bg-[#C5A059] mx-auto mb-8"></div>
            <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Our Philosophy</span>
            <blockquote className="font-serif text-4xl md:text-6xl leading-tight text-white italic">
               "Luxury is not about abundance. <br/>It is about the absence of vulgarity and the presence of silence."
            </blockquote>
            <div className="w-[1px] h-20 bg-[#C5A059] mx-auto mt-8"></div>
         </div>
      </section>

      {/* ----------------------------------------------------------------------------------
          SECTION 4: THE TIMELINE (Broken Grid)
      ---------------------------------------------------------------------------------- */}
      <section className="py-32 bg-[#0A0A0A] border-t border-white/5">
         <div className="container mx-auto px-6 max-w-[1400px]">
            <h2 className="font-serif text-5xl text-white mb-24">A Century of <span className="italic text-[#C5A059]">Secrets</span></h2>
            
            <div className="space-y-0">
               {history.map((item, index) => (
                  <div 
                    key={index} 
                    className="group border-t border-white/10 py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline hover:bg-white/[0.02] transition-colors duration-500"
                  >
                     <div className="md:col-span-3">
                        <span className="font-serif text-6xl text-white/10 group-hover:text-[#C5A059] transition-colors duration-500">
                           {item.year}
                        </span>
                     </div>
                     <div className="md:col-span-3">
                        <h3 className="font-bold text-white uppercase tracking-[0.2em] text-sm pt-4">
                           {item.title}
                        </h3>
                     </div>
                     <div className="md:col-span-6">
                        <p className="text-white/50 font-light text-lg leading-relaxed max-w-xl group-hover:text-white/80 transition-colors">
                           {item.desc}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ----------------------------------------------------------------------------------
          SECTION 5: THE CANVAS (Amenities Redefined)
      ---------------------------------------------------------------------------------- */}
      <section className="relative py-32 bg-[#0F0F0F] overflow-hidden">
         <div className="absolute right-0 top-0 h-full w-1/3 bg-[#C5A059]/5 skew-x-12 pointer-events-none"></div>
         
         <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
               <div>
                  <h3 className="font-serif text-4xl text-white mb-12">The Canvas</h3>
                  <p className="text-white/60 font-light mb-12 max-w-md">
                     We provide the essentials for a life well-lived, stripping away the unnecessary to focus on quality, texture, and silence.
                  </p>
                  <ul className="space-y-8">
                     {[
                        { icon: Scroll, text: "1000-Thread Count Egyptian Cotton" },
                        { icon: Droplets, text: "Rainfall Showers with Aesop Amenities" },
                        { icon: Mic2, text: "Soundproofed by Acoustic Engineers" },
                        { icon: Zap, text: "Hyper-fast Connectivity, Invisible Tech" },
                        { icon: Shield, text: "Discrete Private Entrance for VIPs" },
                     ].map((amenity, i) => (
                        <li key={i} className="flex items-center gap-6 group">
                           <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#C5A059] transition-colors">
                              <amenity.icon className="w-4 h-4 text-white group-hover:text-[#C5A059]" strokeWidth={1} />
                           </div>
                           <span className="text-sm font-bold uppercase tracking-[0.1em] text-white/70 group-hover:text-white transition-colors">
                              {amenity.text}
                           </span>
                        </li>
                     ))}
                  </ul>
               </div>
               
               <div className="relative mt-12 md:mt-0">
                  <motion.div style={{ y: yParallax }} className="relative h-[600px] w-full overflow-hidden">
                     <img 
                       src="https://images.unsplash.com/photo-1551516594-56cb78394645?q=80&w=2030&auto=format&fit=crop" 
                       alt="Interior Detail" 
                       className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                     />
                     <div className="absolute bottom-0 left-0 bg-[#0A0A0A] p-6 border-t border-r border-white/10">
                        <span className="text-[#C5A059] text-[10px] uppercase tracking-widest">The Library</span>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
};

export default About;