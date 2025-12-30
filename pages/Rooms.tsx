import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Users, ChevronDown, ArrowRight, Crown, ArrowUpRight, MapPin } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MOCK_ROOMS } from '../constants';

// Individual Room Component for Independent Parallax
interface RoomCardProps {
  room: any;
  index: number;
  handleBook: (id: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, index, handleBook }) => {
   const isEven = index % 2 !== 0; 
   const containerRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
   
   // Parallax: Text moves opposite to scroll, Image moves slightly with scroll
   const yText = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
   const yImage = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

   return (
      <div ref={containerRef} className="relative py-12 md:py-24 w-full">
         <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
            
            {/* IMAGE BACKGROUND */}
            {/* Even: Left Side (1-9) | Odd: Right Side (4-12) */}
            <div className={`md:col-span-9 relative z-10 h-[50vh] md:h-[70vh] lg:h-[85vh] w-full overflow-hidden ${isEven ? 'md:col-start-1' : 'md:col-start-4'}`}>
               <div className="absolute inset-0 bg-[#0A0A0A]/20 z-10 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"></div>
               <motion.div style={{ y: yImage }} className="w-full h-[120%] -top-[10%] relative">
                  <img 
                     src={room.imageUrl} 
                     alt={room.name} 
                     className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s]" 
                  />
               </motion.div>
            </div>

            {/* CONTENT CARD - FORCED OVERLAP */}
            {/* Even: Right Side (Overlap Left) | Odd: Left Side (Overlap Right) */}
            <div className={`md:col-span-6 relative z-20 mt-[-10vh] md:mt-0 px-4 md:px-0 pointer-events-none ${isEven ? 'md:col-start-7 md:ml-[-80px] lg:ml-[-120px]' : 'md:col-start-1 md:row-start-1 md:mr-[-80px] lg:mr-[-120px]'}`}>
               <motion.div 
                  style={{ y: yText }}
                  className="bg-[#0A0A0A]/95 backdrop-blur-3xl border border-white/10 p-8 md:p-12 lg:p-16 shadow-2xl relative overflow-hidden pointer-events-auto group"
               >
                  <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
                  
                  {/* Ghost Number Background */}
                  <span className="absolute -top-6 -right-6 text-[10rem] md:text-[15rem] font-serif text-white/[0.02] leading-none select-none pointer-events-none">
                     0{index + 1}
                  </span>

                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative z-10">
                     <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[9px] md:text-[10px]">
                        {room.category}
                     </span>
                     <div className="h-[1px] w-8 bg-[#C5A059]"></div>
                     {room.category === 'club' && <Crown className="w-4 h-4 text-[#C5A059]" />}
                  </div>

                  <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-6 md:mb-8 relative z-10 leading-[0.9]">
                     {room.name}
                  </h2>

                  <p className="text-white/60 font-light text-sm md:text-base leading-relaxed mb-8 md:mb-10 text-justify border-l border-white/10 pl-6 relative z-10">
                     {room.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8 md:mb-10 relative z-10">
                     {room.features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 text-white/50 group-hover:text-white/80 transition-colors">
                           <div className="w-1 h-1 bg-[#C5A059] rounded-full"></div>
                           <span className="text-[9px] md:text-[10px] uppercase tracking-widest">{feature}</span>
                        </div>
                     ))}
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-white/10 relative z-10">
                     <div>
                        <span className="block font-serif text-2xl md:text-3xl text-white">${room.price}</span>
                        <span className="text-[9px] uppercase tracking-widest text-white/40">Per Night</span>
                     </div>
                     <button 
                        onClick={() => handleBook(room.id)}
                        className="px-6 md:px-8 py-3 md:py-4 bg-[#C5A059] text-black hover:bg-white transition-all uppercase font-bold tracking-[0.2em] text-[10px] flex items-center gap-3"
                     >
                        Reserve <ArrowUpRight className="w-4 h-4" />
                     </button>
                  </div>
               </motion.div>
            </div>

         </div>
      </div>
   );
};

const Rooms: React.FC = () => {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   
   // Hero Parallax
   const containerRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
   const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
   const opacityHeroText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

   // Mouse Parallax State
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

   const handleMouseMove = (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 15; // Move 15px max
      const y = (clientY / window.innerHeight - 0.5) * 15;
      setMousePosition({ x, y });
   };

   const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || "");
   const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || "");
   const [guests, setGuests] = useState(searchParams.get('guests') || "2");

   const filteredRooms = MOCK_ROOMS.filter(room => room.capacity >= parseInt(guests));

   const handleBook = (id: string) => {
      navigate(`/reserve?room=${id}&guests=${guests}&checkIn=${checkIn}&checkOut=${checkOut}`);
   }

   const handleSearch = () => {
      // Re-filter logic or navigate logic if needed, currently state updates automatically filter
   }

   return (
      <main ref={containerRef} className="w-full bg-[#0A0A0A] text-[#E5E5E5] min-h-screen selection:bg-[#C5A059] selection:text-black">
         
         {/* SECTION 1: HERO - Enhanced Editorial Design with Safe Spacing */}
         <section 
            onMouseMove={handleMouseMove}
            className="relative min-h-screen w-full overflow-hidden flex flex-col justify-end pt-32 pb-24 md:pt-40 md:pb-32 lg:pb-40"
         >
            
            {/* Background Parallax */}
            <div className="absolute inset-0 z-0">
               <motion.div style={{ y: yHero, scale: 1.1 }} className="w-full h-[120%] relative -top-[10%]">
                  <img 
                     src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2500&auto=format&fit=crop" 
                     className="w-full h-full object-cover opacity-40 grayscale contrast-125" 
                     alt="Rooms Hero" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-black/70"></div>
                  <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay"></div>
               </motion.div>
            </div>

            {/* Vertical Editorial Text (Left Edge) */}
            <div className="absolute left-8 lg:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 z-20 text-white/40">
                <div className="w-[1px] h-32 bg-white/20"></div>
                <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.3em] font-light rotate-180">
                   The Collection — Vol. 02
                </span>
                <div className="w-[1px] h-32 bg-white/20"></div>
            </div>

            {/* Coordinates (Top Right) */}
            <div className="absolute top-32 lg:top-40 right-8 lg:right-16 z-20 hidden md:block text-right">
                <div className="flex items-center justify-end gap-3 text-[#C5A059] mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Floor 12 — 44</span>
                </div>
                <span className="text-white/40 text-[10px] uppercase tracking-widest block">Private Wings</span>
            </div>

            {/* Hero Text - Adjusted Spacing for Tablet/Mobile */}
            <div className="relative z-10 w-[92%] max-w-[1800px] mx-auto mb-16 md:mb-24 lg:mb-32">
               <motion.div 
                  style={{ opacity: opacityHeroText }}
                  initial={{ opacity: 0, y: 60 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
               >
                  <div className="flex items-center gap-6 mb-8 md:mb-12 lg:mb-16">
                     <span className="h-[1px] w-12 bg-[#C5A059]"></span>
                     <span className="text-[#C5A059] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">Accommodations</span>
                  </div>

                  {/* Cinematic Title with Mouse Parallax */}
                  <div className="relative mb-0 select-none">
                     <motion.h1 
                        style={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
                        className="font-serif text-[clamp(4.5rem,14vw,12rem)] leading-[0.85] text-white tracking-tighter mix-blend-overlay relative z-20"
                     >
                        Silent
                     </motion.h1>
                     <motion.h1 
                        style={{ x: mousePosition.x, y: mousePosition.y }}
                        className="font-serif text-[clamp(4.5rem,14vw,12rem)] leading-[0.85] text-transparent stroke-text italic ml-[6vw] mt-[-2vw] md:mt-[-1vw] relative z-10 opacity-70"
                     >
                        Sanctuaries
                     </motion.h1>
                  </div>

               </motion.div>
            </div>

            {/* SEARCH BAR - Refined Glassmorphism with More Separation */}
            <div className="relative z-30 w-[92%] max-w-[1800px] mx-auto">
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="w-full lg:max-w-5xl bg-[#1A1A1A]/80 backdrop-blur-2xl border border-white/10 flex flex-col md:flex-row shadow-2xl relative overflow-hidden group"
               >
                  <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>

                  <div className="flex-1 grid grid-cols-2 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 relative z-10">
                     <div className="p-6 md:p-8 hover:bg-white/5 transition-colors group/input">
                        <label className="block text-[9px] uppercase tracking-[0.25em] text-[#C5A059] mb-4 font-bold group-hover/input:text-white transition-colors">Arrival</label>
                        <div className="flex items-center gap-3">
                           <Calendar className="w-4 h-4 text-[#C5A059] group-hover/input:text-white transition-colors" />
                           <input type="date" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} className="bg-transparent text-white w-full outline-none font-serif text-sm md:text-base [color-scheme:dark] placeholder-white/30 cursor-pointer" />
                        </div>
                     </div>
                     <div className="p-6 md:p-8 hover:bg-white/5 transition-colors group/input">
                        <label className="block text-[9px] uppercase tracking-[0.25em] text-[#C5A059] mb-4 font-bold group-hover/input:text-white transition-colors">Departure</label>
                        <div className="flex items-center gap-3">
                           <Calendar className="w-4 h-4 text-[#C5A059] group-hover/input:text-white transition-colors" />
                           <input type="date" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} className="bg-transparent text-white w-full outline-none font-serif text-sm md:text-base [color-scheme:dark] cursor-pointer" />
                        </div>
                     </div>
                     <div className="p-6 md:p-8 hover:bg-white/5 transition-colors col-span-2 md:col-span-1 group/input">
                        <label className="block text-[9px] uppercase tracking-[0.25em] text-[#C5A059] mb-4 font-bold group-hover/input:text-white transition-colors">Guests</label>
                        <div className="flex items-center gap-3 relative">
                           <Users className="w-4 h-4 text-[#C5A059] group-hover/input:text-white transition-colors" />
                           <select value={guests} onChange={(e)=>setGuests(e.target.value)} className="bg-transparent text-white w-full outline-none font-serif text-sm md:text-base appearance-none cursor-pointer relative z-10">
                              <option value="1" className="bg-[#0A0A0A]">1 Guest</option>
                              <option value="2" className="bg-[#0A0A0A]">2 Guests</option>
                              <option value="3" className="bg-[#0A0A0A]">3 Guests</option>
                              <option value="4" className="bg-[#0A0A0A]">4 Guests</option>
                           </select>
                           <ChevronDown className="w-3 h-3 text-[#C5A059] absolute right-2 pointer-events-none group-hover/input:text-white transition-colors" />
                        </div>
                     </div>
                  </div>
                  <button onClick={handleSearch} className="relative z-10 w-full md:w-auto px-12 py-6 md:py-0 bg-[#C5A059] hover:bg-white text-[#0A0A0A] uppercase font-bold tracking-[0.25em] text-[10px] transition-all duration-300 flex items-center justify-center gap-3">
                     Update <ArrowRight className="w-4 h-4" />
                  </button>
               </motion.div>
            </div>
         </section>

         {/* SECTION 2: ROOM LISTINGS */}
         <section className="py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
            {/* Global Noise */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>

            <div className="w-[92%] max-w-[1800px] mx-auto space-y-24 lg:space-y-40">
               {filteredRooms.map((room, index) => (
                  <RoomCard key={room.id} room={room} index={index} handleBook={handleBook} />
               ))}
               
               {filteredRooms.length === 0 && (
                  <div className="text-center py-20">
                     <h3 className="font-serif text-4xl text-white mb-4">No Sanctuaries Available</h3>
                     <p className="text-white/40">Please adjust your search criteria.</p>
                  </div>
               )}
            </div>
         </section>
      </main>
   );
};

export default Rooms;