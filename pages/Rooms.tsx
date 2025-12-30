import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Crown, Calendar, Users, ArrowRight, ChevronDown, Star } from 'lucide-react';
import { MOCK_ROOMS } from '../constants';

const Rooms: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'room' | 'suite' | 'club'>('all');

  // Search State
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || "");
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || "");
  const [guests, setGuests] = useState(searchParams.get('guests') || "2");

  // Filter Logic
  const filteredRooms = MOCK_ROOMS.filter(room => {
    const matchesCategory = filter === 'all' || room.category === filter;
    const matchesCapacity = room.capacity >= parseInt(guests);
    return matchesCategory && matchesCapacity;
  });

  const handleBookNow = (roomId: string) => {
    const params = new URLSearchParams();
    params.set('room', roomId);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    params.set('guests', guests);
    navigate(`/reserve?${params.toString()}`);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if(checkIn) params.set('checkIn', checkIn);
    if(checkOut) params.set('checkOut', checkOut);
    params.set('guests', guests);
    navigate(`/rooms?${params.toString()}`, { replace: true });
  };

  return (
    <main ref={containerRef} className="bg-[#0A0A0A] min-h-screen text-[#E5E5E5] selection:bg-[#C5A059] selection:text-black overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] flex flex-col justify-center items-center overflow-hidden">
         <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale opacity-60"
              alt="Rooms Hero"
            />
         </motion.div>
         
         <div className="relative z-20 text-center px-4 md:px-8 pt-24">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-[#C5A059] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-6 block">The Collection</span>
              <h1 className="font-serif text-[12vw] md:text-[8vw] leading-[0.8] text-white tracking-tighter mix-blend-overlay">
                Silent <br/>
                <span className="italic text-white/80">Sanctuaries</span>
              </h1>
            </motion.div>
         </div>
      </section>

      {/* 2. SEARCH BAR (HOME STYLE) */}
      <div className="relative z-30 w-full px-4 md:px-8 -mt-20 md:-mt-24 pb-20 flex justify-center pointer-events-auto">
         <div className="w-full max-w-6xl bg-[#1A1A1A]/80 backdrop-blur-2xl border border-white/10 p-2 shadow-2xl flex flex-col md:flex-row items-center gap-1 md:gap-0">
            
            {/* Input Group */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 w-full divide-y md:divide-y-0 md:divide-x divide-white/10">
                <div className="px-3 md:px-6 py-4 hover:bg-white/5 transition-colors group cursor-pointer w-full">
                   <label className="block text-[9px] uppercase tracking-widest text-[#C5A059] mb-1 font-bold">Arrival</label>
                   <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#C5A059]" />
                      <input 
                        type="date" 
                        value={checkIn} 
                        onChange={(e) => setCheckIn(e.target.value)} 
                        className="bg-transparent text-white w-full outline-none font-serif text-lg placeholder-white/50 [color-scheme:dark]" 
                      />
                   </div>
                </div>

                <div className="px-3 md:px-6 py-4 hover:bg-white/5 transition-colors group cursor-pointer w-full">
                   <label className="block text-[9px] uppercase tracking-widest text-[#C5A059] mb-1 font-bold">Departure</label>
                   <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#C5A059]" />
                      <input 
                        type="date" 
                        value={checkOut} 
                        onChange={(e) => setCheckOut(e.target.value)} 
                        className="bg-transparent text-white w-full outline-none font-serif text-lg placeholder-white/50 [color-scheme:dark]" 
                      />
                   </div>
                </div>

                <div className="px-3 md:px-6 py-4 hover:bg-white/5 transition-colors group cursor-pointer w-full relative">
                   <label className="block text-[9px] uppercase tracking-widest text-[#C5A059] mb-1 font-bold">Guests</label>
                   <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#C5A059]" />
                      <select onChange={(e) => setGuests(e.target.value)} value={guests} className="bg-transparent text-white w-full outline-none font-serif text-lg appearance-none cursor-pointer [color-scheme:dark]">
                        <option value="1" className="bg-zinc-900">1 Guest</option>
                        <option value="2" className="bg-zinc-900">2 Guests</option>
                        <option value="3" className="bg-zinc-900">3 Guests</option>
                        <option value="4" className="bg-zinc-900">4 Guests</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-[#C5A059] absolute right-6 pointer-events-none" />
                   </div>
                </div>
            </div>

            {/* Action Button */}
            <button onClick={handleSearch} className="w-full md:w-auto px-10 py-6 md:py-0 h-full min-h-[80px] bg-[#C5A059] hover:bg-white text-[#0A0A0A] uppercase font-bold tracking-[0.2em] text-xs transition-colors group flex items-center justify-center gap-3">
               Update
               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
         </div>
      </div>

      {/* 3. FILTERS */}
      <section className="container mx-auto px-4 md:px-8 mb-24">
         <div className="flex flex-wrap justify-center gap-8 border-b border-white/5 pb-8">
            {[
              { label: 'View All', value: 'all' },
              { label: 'Guest Rooms', value: 'room' },
              { label: 'Suites', value: 'suite' },
              { label: 'Club Floor', value: 'club' }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value as any)}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative py-2 ${
                  filter === tab.value ? 'text-[#C5A059]' : 'text-white/40 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
         </div>
      </section>

      {/* 4. ROOM LISTING (Redesigned Asymmetrical) */}
      <section className="container mx-auto px-4 md:px-8 pb-40 max-w-[1600px]">
        <div className="space-y-40">
           <AnimatePresence mode='wait'>
           {filteredRooms.map((room, index) => (
             <motion.div 
               key={room.id}
               initial={{ opacity: 0, y: 100 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="group"
             >
               <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${index % 2 === 1 ? 'direction-rtl' : ''}`}>
                 
                  {/* Image Block */}
                  <div className={`lg:col-span-8 relative h-[60vh] md:h-[80vh] overflow-hidden ${index % 2 === 1 ? 'lg:col-start-5' : ''}`}>
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                     <img 
                       src={room.imageUrl} 
                       alt={room.name} 
                       className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 filter grayscale contrast-125 group-hover:grayscale-0"
                     />
                     <div className="absolute bottom-0 left-0 p-8 z-20">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 border border-white/20 px-3 py-1 bg-black/50 backdrop-blur">
                           {room.capacity * 25} SQM
                        </span>
                     </div>
                  </div>

                  {/* Content Block (Overlapping) */}
                  <div className={`lg:col-span-5 relative z-20 ${index % 2 === 1 ? 'lg:col-start-2 lg:row-start-1 lg:-mr-24 lg:text-right' : 'lg:col-start-8 lg:row-start-1 lg:-ml-24'}`}>
                     <div className={`bg-[#0F0F0F] p-10 md:p-14 border border-white/5 shadow-2xl relative ${index % 2 === 1 ? 'lg:pr-20' : 'lg:pl-20'}`}>
                        {/* Decorative Line */}
                        <div className={`absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent ${index % 2 === 1 ? 'right-0' : 'left-0'}`}></div>

                        <div className={`flex items-center gap-3 mb-6 ${index % 2 === 1 ? 'justify-end' : ''}`}>
                           {room.category === 'club' && <Crown className="w-4 h-4 text-[#C5A059]" />}
                           <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.25em]">
                              {room.category === 'club' ? 'Club Level' : room.category}
                           </span>
                        </div>

                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-none">
                           {room.name}
                        </h2>

                        <div className={`flex items-baseline gap-2 mb-8 ${index % 2 === 1 ? 'justify-end' : ''}`}>
                           <span className="text-2xl font-serif text-white/80">${room.price}</span>
                           <span className="text-[10px] text-white/40 uppercase tracking-widest">/ Night</span>
                        </div>

                        <p className={`text-white/60 font-light leading-relaxed mb-10 text-sm md:text-base ${index % 2 === 1 ? 'text-right' : 'text-left'}`}>
                           {room.description}
                        </p>

                        <div className={`grid grid-cols-2 gap-4 mb-10 ${index % 2 === 1 ? 'justify-items-end text-right' : ''}`}>
                           {room.features.slice(0,4).map((f, i) => (
                              <div key={i} className={`flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/40 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                                 <Star className="w-3 h-3 text-[#C5A059]" />
                                 <span>{f}</span>
                              </div>
                           ))}
                        </div>

                        <div className={`flex ${index % 2 === 1 ? 'justify-end' : 'justify-start'}`}>
                           <button 
                             onClick={() => handleBookNow(room.id)}
                             className="group/btn inline-flex items-center gap-3 text-white text-xs font-bold uppercase tracking-[0.2em] hover:text-[#C5A059] transition-colors"
                           >
                              Reserve Key
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                           </button>
                        </div>
                     </div>
                  </div>

               </div>
             </motion.div>
           ))}
           </AnimatePresence>
           
           {filteredRooms.length === 0 && (
             <div className="py-20 text-center border border-white/10 bg-white/5 mx-auto max-w-2xl">
                <p className="font-serif text-2xl text-white/50 italic mb-4">No sanctuaries match your criteria.</p>
                <button onClick={() => { setFilter('all'); setGuests("1"); }} className="text-[#C5A059] uppercase tracking-widest text-[10px] hover:text-white transition-colors">
                   Reset Filters
                </button>
             </div>
           )}
        </div>
      </section>

    </main>
  );
};

export default Rooms;