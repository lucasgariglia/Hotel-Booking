import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Crown, Wine, Car, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const services = [
    {
      id: '01',
      title: 'The Onyx Spa',
      subtitle: 'Wellness & Restoration',
      description: 'A subterranean sanctuary featuring thermal baths, cryotherapy chambers, and ancient mineral treatments designed to reset the body\'s natural rhythm.',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop',
      icon: Sparkles
    },
    {
      id: '02',
      title: 'Alchemy Rooftop',
      subtitle: 'Michelin Star Gastronomy',
      description: 'Avant-garde culinary artistry led by Chef Marco Pierre. Dining under the stars in a glass atrium overlooking the metropolis skyline.',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop',
      icon: Wine
    },
    {
      id: '03',
      title: 'The Vault',
      subtitle: 'Private Members Lounge',
      description: 'Hidden behind the library walls. A speakeasy explicitly for residents, serving rare whiskies and silence. No cameras allowed.',
      image: 'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?q=80&w=2070&auto=format&fit=crop',
      icon: Crown
    },
    {
      id: '04',
      title: 'Phantom Fleet',
      subtitle: 'Bespoke Transport',
      description: 'Chauffeur service available 24/7. Whether it is an airport transfer or a night out in the city, move through the shadows in absolute comfort.',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop',
      icon: Car
    }
  ];

  return (
    <main ref={containerRef} className="bg-[#0A0A0A] min-h-screen text-[#E5E5E5] overflow-x-hidden selection:bg-[#C5A059] selection:text-black">
      
      {/* HERO */}
      <section className="relative h-[80vh] w-full overflow-hidden flex flex-col justify-center">
         <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop" 
             className="w-full h-full object-cover opacity-40 grayscale" 
             alt="Service Hero" 
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0A0A0A]"></div>
         </motion.div>

         <div className="relative z-10 container mx-auto px-6 pt-32 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
               <span className="text-[#C5A059] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4 block">The Experience</span>
               <h1 className="font-serif text-[15vw] md:text-[10vw] leading-[0.8] text-white tracking-tighter mix-blend-overlay">
                 Curated <br/>
                 <span className="ml-[10vw] italic text-white/80">Rituals</span>
               </h1>
            </motion.div>
         </div>
      </section>

      {/* SERVICES STRIPS */}
      <div className="flex flex-col">
        {services.map((service, index) => (
          <section key={service.id} className="group relative min-h-[80vh] w-full overflow-hidden flex items-end border-t border-white/5">
             {/* Background Image with Zoom & Color Reveal Effect */}
             <div className="absolute inset-0 z-0 overflow-hidden">
                {/* 1. Base Dark Overlay */}
                <div className="absolute inset-0 bg-black/50 z-10 group-hover:bg-black/30 transition-colors duration-1000"></div>
                
                {/* 2. Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A0A0A] via-black/60 to-transparent opacity-90"></div>

                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
             </div>

             {/* Content Overlay */}
             <div className="relative z-20 container mx-auto px-6 pb-24 md:pb-32">
                <div className="flex flex-col md:flex-row items-end justify-between gap-12">
                   
                   {/* Text Content */}
                   <div className="max-w-2xl">
                      <div className="flex items-center gap-4 mb-6">
                         <span className="font-serif text-3xl text-[#C5A059]">{service.id}</span>
                         <div className="w-12 h-[1px] bg-[#C5A059]"></div>
                         <span className="text-xs font-bold uppercase tracking-[0.2em] text-white drop-shadow-md">{service.subtitle}</span>
                      </div>
                      <h2 className="font-serif text-6xl md:text-8xl text-white mb-8 leading-none drop-shadow-lg">
                         {service.title}
                      </h2>
                      <p className="text-lg text-white/90 font-light leading-relaxed max-w-lg drop-shadow-md">
                         {service.description}
                      </p>
                   </div>

                   {/* Icon / Action */}
                   <div className="md:mb-4 self-start md:self-end">
                      <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#C5A059] group-hover:border-[#C5A059] transition-all duration-500 backdrop-blur-md">
                         <service.icon className="w-8 h-8 text-white group-hover:text-[#0A0A0A] transition-colors" strokeWidth={1} />
                      </div>
                   </div>

                </div>
             </div>
          </section>
        ))}
      </div>

      {/* EARTHY CTA SECTION */}
      <section className="py-40 bg-[#1C1B19] relative overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
         <div className="container mx-auto px-6 text-center relative z-10">
            <Crown className="w-12 h-12 text-[#C5A059] mx-auto mb-8 animate-pulse" strokeWidth={0.5} />
            <h2 className="font-serif text-5xl md:text-7xl text-white mb-8">Bespoke Arrangements</h2>
            <p className="text-white/50 font-light max-w-lg mx-auto mb-12">
               For requests that require discretion or specific attention to detail, our concierge team is available privately.
            </p>
            <Link to="/reserve" className="inline-flex items-center gap-4 px-12 py-5 border border-white/10 hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-[#0A0A0A] transition-all text-xs font-bold uppercase tracking-[0.25em] text-white">
               Contact Concierge <ArrowUpRight className="w-4 h-4" />
            </Link>
         </div>
      </section>

    </main>
  );
};

export default Services;