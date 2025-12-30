import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Crown, Wine, Car, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  { 
    id: '01', 
    title: 'The Onyx Spa', 
    subtitle: 'Wellness', 
    description: 'A subterranean sanctuary featuring thermal baths, cryotherapy chambers, and ancient mineral treatments designed to reset the body\'s natural rhythm.', 
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop', 
    icon: Sparkles 
  },
  { 
    id: '02', 
    title: 'Alchemy Rooftop', 
    subtitle: 'Dining', 
    description: 'Avant-garde culinary artistry led by Chef Marco Pierre. Dining under the stars in a glass atrium overlooking the metropolis skyline.', 
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop', 
    icon: Wine 
  },
  { 
    id: '03', 
    title: 'The Vault', 
    subtitle: 'Lounge', 
    description: 'Hidden behind the library walls. A speakeasy explicitly for residents, offering rare vintages and absolute privacy.', 
    image: 'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?q=80&w=2070&auto=format&fit=crop', 
    icon: Crown 
  },
  { 
    id: '04', 
    title: 'Phantom Fleet', 
    subtitle: 'Transport', 
    description: 'Chauffeur service available 24/7. Move through the shadows in absolute comfort with our fleet of matte-black Phantoms.', 
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop', 
    icon: Car 
  }
];

const Services: React.FC = () => {
  return (
    <main className="bg-[#0A0A0A] w-full min-h-screen text-[#E5E5E5] selection:bg-[#C5A059] selection:text-black">
      
      {/* Header */}
      <div className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-bold block mb-2">The Collection</span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-none">Curated Rituals</h1>
         </motion.div>
      </div>

      {/* Vertical Stack - No Accordion, Just Tall Strips */}
      <div className="flex flex-col w-full">
        {SERVICES.map((service, index) => (
             <motion.div 
               key={service.id}
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.8 }}
               className="relative w-full h-[60vh] md:h-[75vh] min-h-[500px] border-t border-white/10 group overflow-hidden"
             >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                   <img 
                      src={service.image} 
                      className="w-full h-full object-cover object-center transition-all duration-[1.5s] grayscale group-hover:grayscale-0 group-hover:scale-105 opacity-50 group-hover:opacity-60" 
                      alt={service.title} 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-90" />
                   <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-12 lg:p-20 flex flex-col justify-end z-10">
                    <div className="max-w-[1800px] w-full mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-20">
                            
                            {/* Number & Icon */}
                            <div className="hidden md:flex flex-col justify-between h-full min-h-[150px]">
                                <span className="text-white/20 font-serif text-6xl md:text-8xl leading-none">
                                    {service.id}
                                </span>
                            </div>

                            {/* Main Text */}
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4 md:mb-6">
                                    <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.3em] font-bold border border-[#C5A059] px-3 py-1 rounded-full">
                                        {service.subtitle}
                                    </span>
                                </div>
                                
                                <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl text-white mb-6 md:mb-8 leading-none group-hover:translate-x-2 transition-transform duration-500">
                                    {service.title}
                                </h2>

                                <div className="flex flex-col md:flex-row gap-8 md:items-end border-l border-white/20 pl-6 md:pl-10">
                                    <p className="text-white/70 text-sm md:text-lg font-light leading-relaxed max-w-xl">
                                        {service.description}
                                    </p>
                                    <Link to="/reserve" className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white hover:text-[#C5A059] transition-colors group/link whitespace-nowrap py-2">
                                         Reserve <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                            
                            {/* Corner Icon */}
                            <div className="hidden lg:block">
                                <service.icon className="w-24 h-24 text-white/5 group-hover:text-[#C5A059] transition-colors duration-700" strokeWidth={0.5} />
                            </div>

                        </div>
                    </div>
                </div>
             </motion.div>
        ))}
      </div>
      
      {/* Footer Space/Link */}
      <div className="py-20 text-center bg-[#0A0A0A] border-t border-white/10">
         <p className="text-white/40 text-xs uppercase tracking-widest mb-6">Experience the Exceptional</p>
         <Link to="/reserve" className="inline-block px-10 py-4 bg-[#C5A059] text-black font-bold uppercase tracking-[0.25em] text-[10px] hover:bg-white transition-colors">
            Book Appointment
         </Link>
      </div>

    </main>
  );
};

export default Services;