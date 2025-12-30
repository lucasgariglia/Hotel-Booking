import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Crown, Wine, Car, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const services = [
    { id: '01', title: 'The Onyx Spa', subtitle: 'Wellness & Restoration', description: 'A subterranean sanctuary featuring thermal baths and cryotherapy chambers.', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop', icon: Sparkles },
    { id: '02', title: 'Alchemy Rooftop', subtitle: 'Michelin Star Gastronomy', description: 'Avant-garde culinary artistry led by Chef Marco Pierre.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop', icon: Wine },
    { id: '03', title: 'The Vault', subtitle: 'Private Members Lounge', description: 'Hidden behind the library walls. A speakeasy explicitly for residents.', image: 'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?q=80&w=2070&auto=format&fit=crop', icon: Crown },
    { id: '04', title: 'Phantom Fleet', subtitle: 'Bespoke Transport', description: 'Chauffeur service available 24/7. Move through the shadows in absolute comfort.', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop', icon: Car }
  ];

  return (
    <main ref={containerRef} className="bg-[#0A0A0A] min-h-screen text-[#E5E5E5] overflow-x-hidden">
      
      {/* HERO SECTION: REPOSITIONED TO CLEAR NAVBAR */}
      <section className="relative h-[85vh] w-full overflow-hidden flex flex-col justify-center">
         <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
           <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 grayscale" alt="Service Hero" />
           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0A0A0A]"></div>
         </motion.div>

         <div className="relative z-10 w-[88vw] mx-auto pt-[clamp(8rem,15vh,12rem)]">
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
               <span className="text-[#C5A059] text-[clamp(10px,0.75vw,14px)] font-bold uppercase tracking-[0.4em] mb-[3vh] block">The Experience</span>
               <h1 className="font-serif text-[clamp(3rem,10vw,12rem)] leading-[0.85] text-white tracking-tighter mix-blend-overlay">
                 Curated <br/>
                 <span className="ml-[10vw] italic text-white/80">Rituals</span>
               </h1>
            </motion.div>
         </div>
      </section>

      {/* SERVICE STRIPS WITH PROPORTIONAL SCALING */}
      <div className="flex flex-col">
        {services.map((service) => (
          <section key={service.id} className="group relative min-h-[85vh] w-full overflow-hidden flex items-end border-t border-white/5">
             <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10 group-hover:bg-black/30 transition-colors duration-1000"></div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A0A0A] via-black/60 to-transparent"></div>
                <img src={service.image} alt={service.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
             </div>

             <div className="relative z-20 w-[88vw] mx-auto pb-24 lg:pb-[6vw]">
                <div className="flex flex-col md:flex-row items-end justify-between gap-[4vw]">
                   <div className="max-w-[1500px] md:max-w-[45vw]">
                      <div className="flex items-center gap-[1.5vw] mb-[2vw]">
                         <span className="font-serif text-[clamp(1.5rem,2.5vw,3.5rem)] text-[#C5A059]">{service.id}</span>
                         <div className="w-[4vw] h-[1px] bg-[#C5A059]"></div>
                         <span className="text-[clamp(10px,0.7vw,12px)] font-bold uppercase tracking-[0.2em] text-white">{service.subtitle}</span>
                      </div>
                      <h2 className="font-serif text-[clamp(2.5rem,6vw,8rem)] text-white mb-[2vw] leading-none">{service.title}</h2>
                      <p className="text-base md:text-[clamp(1rem,1.1vw,1.4rem)] text-white/80 font-light leading-relaxed max-w-[40vw]">{service.description}</p>
                   </div>
                   <div className="md:mb-[1vw] self-start md:self-end">
                      <div className="w-24 h-24 lg:w-[6vw] lg:h-[6vw] rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#C5A059] transition-all duration-500 backdrop-blur-md">
                         <service.icon className="w-8 h-8 lg:w-[2vw] lg:h-[2vw] text-white group-hover:text-[#0A0A0A]" strokeWidth={1} />
                      </div>
                   </div>
                </div>
             </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default Services;