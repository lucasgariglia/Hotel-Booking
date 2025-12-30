import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = [
    { name: 'About', path: '/about' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Dining', path: '/services' },
    { name: 'Wellness', path: '/services' },
    { name: 'Reserve', path: '/reserve' }
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 pt-24 md:pt-[6vw] pb-12 md:pb-[3vw] relative overflow-hidden">
      {/* Decorative large text */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
        <span className="text-[20vw] font-serif leading-none whitespace-nowrap text-white">
          OBSIDIAN
        </span>
      </div>

      <div className="w-[94vw] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-[3vw] mb-20 md:mb-[5vw]">
          
          <div className="md:col-span-4 space-y-6 md:space-y-[1.5vw]">
             <h3 className="font-serif text-3xl md:text-[2vw] text-[#C5A059] italic">The Obsidian Retreat</h3>
             <p className="text-white/60 font-light leading-relaxed max-w-sm md:text-[1vw]">
               A sanctuary of shadow and light in the heart of the city. 
               Where heritage meets modern brutalist elegance.
             </p>
          </div>

          <div className="md:col-span-3 md:col-start-6">
            <h4 className="text-xs md:text-[0.75vw] font-bold uppercase tracking-widest text-white mb-6 md:mb-[1.5vw]">Explore</h4>
            <ul className="space-y-4 md:space-y-[1vw]">
              {footerLinks.map(item => (
                <li key={String(item.name)}>
                  <Link to={item.path} className="text-white/60 hover:text-[#C5A059] transition-colors text-sm md:text-[0.9vw]">
                    {String(item.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <h4 className="text-xs md:text-[0.75vw] font-bold uppercase tracking-widest text-white mb-6 md:mb-[1.5vw]">Contact</h4>
            <div className="space-y-4 md:space-y-[1vw] text-white/60 text-sm md:text-[0.9vw]">
              <p className="flex items-start gap-3 md:gap-[0.75vw]">
                <MapPin className="w-4 h-4 md:w-[1vw] md:h-[1vw] mt-1 text-[#C5A059]" />
                1001 Shadow Lane<br/>Metropolis, NY 10012
              </p>
              <p>+1 (555) 000-0000</p>
              <p>concierge@obsidian.com</p>
              <div className="flex gap-4 md:gap-[1vw] pt-4 md:pt-[1vw]">
                <Instagram className="w-5 h-5 md:w-[1.25vw] md:h-[1.25vw] hover:text-[#C5A059] cursor-pointer" />
                <Facebook className="w-5 h-5 md:w-[1.25vw] md:h-[1.25vw] hover:text-[#C5A059] cursor-pointer" />
                <Twitter className="w-5 h-5 md:w-[1.25vw] md:h-[1.25vw] hover:text-[#C5A059] cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 md:pt-[2vw] flex flex-col md:flex-row justify-between items-center text-xs md:text-[0.8vw] text-white/40">
          <p>© 2025 The Obsidian Retreat. All rights reserved.</p>
          <div className="flex gap-6 md:gap-[1.5vw] mt-4 md:mt-0">
            <Link to="/admin" className="hover:text-[#C5A059]">Admin Login</Link>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;