import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, ChevronDown, ArrowRight, Filter, Star, Crown, ArrowUpRight } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MOCK_ROOMS } from '../constants';

const Rooms: React.FC = () => {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   
   const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || "");
   const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || "");
   const [guests, setGuests] = useState(searchParams.get('guests') || "2");

   // Simple filter logic to make the search bar somewhat functional
   const filteredRooms = MOCK_ROOMS.filter(room => room.capacity >= parseInt(guests));

   const handleBook = (id: string) => {
      navigate(`/reserve?room=${id}&guests=${guests}&checkIn=${checkIn}&checkOut=${checkOut}`);
   }

   return (
      <main className="w-full bg-[#0A0A0A] text-[#E5E5E5] min-h-screen selection:bg-[#C5A059] selection:text-black">
         
         {/* SECTION 1: HERO (Preserving the Spacing Fix) */}
         <section className="relative h-[90vh] min-h-[700px] w-full overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 z-0">
               <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop" 
                  className="w-full h-full object-cover opacity-40 grayscale" 
                  alt="Rooms Hero" 
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#0A0A0A]"></div>
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center w-[88vw] mx-auto pointer-events-none pt-[clamp(8rem,15vh,12rem)]">
               <motion.div 
                  initial={{ opacity: 0, y: 50 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 1 }}
                  className="mb-[clamp(4rem,10vh,8rem)]"
               >
                  <span className="text-[#C5A059] text-[clamp(10px,0.7vw,14px)] font-bold uppercase tracking-[0.4em] mb-[2vh] block">The Collection</span>
                  <h1 className="font-serif text-[clamp(3.5rem,9vw,11rem)] leading-[0.8] text-white tracking-tighter">
                     Silent <br />
                     <span className="italic text-white/80 ml-[8vw]">Sanctuaries</span>
                  </h1>
               </motion.div>
            </div>

            {/* SEARCH BAR */}
            <div className="relative z-30 w-[88vw] mx-auto pb-12 lg:pb-[5vw] flex justify-center pointer-events-auto">
               <div className="w-full max-w-[1500px] bg-[#1A1A1A]/95 backdrop-blur-3xl border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center overflow-hidden">
                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 w-full divide-y lg:divide-y-0 lg:divide-x divide-white/10">
                     <div className="px-6 lg:px-[2.5vw] py-6 lg:py-[2vw]">
                        <label className="block text-[clamp(9px,0.6vw,11px)] uppercase tracking-[0.25em] text-[#C5A059] mb-3 font-bold">Arrival</label>
                        <div className="flex items-center gap-[0.7vw]">
                           <Calendar className="w-4 h-4 lg:w-[1.2vw] lg:h-[1.2vw] text-[#C5A059]" />
                           <input type="date" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} className="bg-transparent text-white w-full outline-none font-serif text-sm lg:text-[1.1vw] [color-scheme:dark]" />
                        </div>
                     </div>
                     <div className="px-6 lg:px-[2.5vw] py-6 lg:py-[2vw]">
                        <label className="block text-[clamp(9px,0.6vw,11px)] uppercase tracking-[0.25em] text-[#C5A059] mb-3 font-bold">Departure</label>
                        <div className="flex items-center gap-[0.7vw]">
                           <Calendar className="w-4 h-4 lg:w-[1.2vw] lg:h-[1.2vw] text-[#C5A059]" />
                           <input type="date" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} className="bg-transparent text-white w-full outline-none font-serif text-sm lg:text-[1.1vw] [color-scheme:dark]" />
                        </div>
                     </div>
                     <div className="px-6 lg:px-[2.5vw] py-6 lg:py-[2vw] relative">
                        <label className="block text-[clamp(9px,0.6vw,11px)] uppercase tracking-[0.25em] text-[#C5A059] mb-3 font-bold">Guests</label>
                        <div className="flex items-center gap-[0.7vw]">
                           <Users className="w-4 h-4 lg:w-[1.2vw] lg:h-[1.2vw] text-[#C5A059]" />
                           <select value={guests} onChange={(e)=>setGuests(e.target.value)} className="bg-transparent text-white w-full outline-none font-serif text-sm lg:text-[1.1vw] appearance-none cursor-pointer">
                              <option value="1" className="bg-[#0A0A0A]">1 Guest</option>
                              <option value="2" className="bg-[#0A0A0A]">2 Guests</option>
                              <option value="3" className="bg-[#0A0A0A]">3 Guests</option>
                              <option value="4" className="bg-[#0A0A0A]">4 Guests</option>
                           </select>
                           <ChevronDown className="w-3 h-3 text-[#C5A059] absolute right-6" />
                        </div>
                     </div>
                  </div>
                  <button className="w-full lg:w-auto px-10 lg:px-[4vw] py-8 lg:py-0 lg:h-full lg:self-stretch bg-[#C5A059] hover:bg-white text-[#0A0A0A] uppercase font-bold tracking-[0.25em] text-[clamp(10px,0.8vw,13px)] transition-all flex items-center justify-center gap-[1vw] whitespace-nowrap">
                     Check Availability <ArrowRight className="w-4 h-4 lg:w-[1.1vw] lg:h-[1.1vw]" />
                  </button>
               </div>
            </div>
         </section>

         {/* SECTION 2: ASYMMETRICAL ROOM LISTINGS */}
         <section className="py-20 lg:py-[10vw] bg-[#0A0A0A] relative">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>

            <div className="w-[88vw] mx-auto space-y-32 lg:space-y-[15vw]">
               {filteredRooms.map((room, index) => {
                  const isEven = index % 2 === 0;
                  return (
                     <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8 }}
                        key={room.id} 
                        className="group relative"
                     >
                        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                           
                           {/* IMAGE CONTAINER */}
                           {/* Even: Cols 1-8 | Odd: Cols 5-12 */}
                           <div className={`relative h-[60vh] lg:h-[80vh] w-full overflow-hidden ${isEven ? 'lg:col-span-8 lg:col-start-1' : 'lg:col-span-8 lg:col-start-5'}`}>
                              <div className="absolute inset-0 bg-[#0A0A0A]/20 group-hover:bg-transparent transition-all duration-700 z-10 mix-blend-multiply"></div>
                              <img 
                                 src={room.imageUrl} 
                                 alt={room.name} 
                                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] scale-105 group-hover:scale-100" 
                              />
                              {/* Floating Badge */}
                              <div className={`absolute bottom-8 z-20 ${isEven ? 'left-8' : 'right-8'}`}>
                                 <span className="text-white/60 text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 bg-black/40 backdrop-blur-md">
                                    {room.category === 'club' ? 'Club Level Access' : `${room.capacity * 25} Square Meters`}
                                 </span>
                              </div>
                           </div>

                           {/* CONTENT CONTAINER - OVERLAPPING */}
                           {/* Even: Cols 7-12 (Overlap Right) | Odd: Cols 1-6 (Overlap Left) */}
                           <div className={`relative z-20 mt-[-10vh] lg:mt-0 lg:row-start-1 ${isEven ? 'lg:col-span-6 lg:col-start-7 lg:text-left' : 'lg:col-span-6 lg:col-start-1 lg:text-right'}`}>
                              <div className={`bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 p-8 lg:p-[4vw] shadow-2xl transition-transform duration-700 hover:border-[#C5A059]/30 ${isEven ? 'lg:-ml-[10vw]' : 'lg:-mr-[10vw]'}`}>
                                 
                                 {/* Header Info */}
                                 <div className={`flex items-center gap-4 mb-6 lg:mb-[2vw] ${isEven ? 'justify-start' : 'justify-end'}`}>
                                    <span className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-xs lg:text-[0.8vw]">
                                       {index + 1 < 10 ? `0${index + 1}` : index + 1} — {room.category}
                                    </span>
                                    {room.category === 'club' && <Crown className="w-4 h-4 text-[#C5A059]" />}
                                 </div>

                                 {/* Title */}
                                 <h2 className="font-serif text-4xl lg:text-[clamp(3rem,4.5vw,6rem)] leading-[0.9] text-white mb-6 lg:mb-[2vw]">
                                    {room.name}
                                 </h2>

                                 {/* Divider */}
                                 <div className={`w-[60px] h-[1px] bg-[#C5A059] mb-8 lg:mb-[2vw] ${!isEven && 'ml-auto'}`}></div>

                                 {/* Description */}
                                 <p className={`text-white/60 font-light text-sm lg:text-[clamp(0.9rem,1vw,1.1rem)] leading-relaxed mb-8 lg:mb-[3vw] max-w-md ${!isEven && 'ml-auto'}`}>
                                    {room.description}
                                 </p>

                                 {/* Amenities Grid */}
                                 <div className={`grid grid-cols-2 gap-4 mb-10 lg:mb-[3vw] ${!isEven && 'justify-items-end text-right'}`}>
                                    {room.features.slice(0, 4).map((feature, i) => (
                                       <div key={i} className={`flex items-center gap-3 text-[10px] lg:text-[0.7vw] uppercase tracking-wider text-white/40 ${!isEven && 'flex-row-reverse'}`}>
                                          <Star className="w-3 h-3 text-[#C5A059]" />
                                          <span>{feature}</span>
                                       </div>
                                    ))}
                                 </div>

                                 {/* Action & Price */}
                                 <div className={`flex items-center gap-8 ${!isEven ? 'flex-row-reverse justify-start' : 'justify-between'}`}>
                                    <div className={`text-right ${!isEven && 'text-left'}`}>
                                       <span className="block text-2xl lg:text-[2vw] font-serif text-white">${room.price}</span>
                                       <span className="text-[9px] lg:text-[0.6vw] uppercase tracking-widest text-white/40">Per Night</span>
                                    </div>
                                    <button 
                                       onClick={() => handleBook(room.id)}
                                       className="group/btn h-12 lg:h-[3.5vw] px-8 lg:px-[2.5vw] border border-white/20 hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-[#0A0A0A] transition-all flex items-center gap-4"
                                    >
                                       <span className="uppercase font-bold tracking-[0.2em] text-[10px] lg:text-[0.7vw]">Reserve</span>
                                       <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </button>
                                 </div>

                              </div>
                           </div>

                        </div>
                     </motion.div>
                  );
               })}
               
               {filteredRooms.length === 0 && (
                  <div className="text-center py-20 border border-white/10">
                     <p className="text-white/40 font-serif italic text-xl">No sanctuaries available for this party size.</p>
                     <button onClick={() => setGuests("1")} className="mt-4 text-[#C5A059] text-xs uppercase tracking-widest hover:text-white transition-colors">Reset Search</button>
                  </div>
               )}
            </div>
         </section>
      </main>
   );
};

export default Rooms;