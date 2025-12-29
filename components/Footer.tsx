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
    <footer className="bg-[#0A0A0A] border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      {/* Decorative large text */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
        <span className="text-[20vw] font-serif leading-none whitespace-nowrap text-white">
          OBSIDIAN
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          <div className="md:col-span-4 space-y-6">
             <h3 className="font-serif text-3xl text-[#C5A059] italic">The Obsidian Retreat</h3>
             <p className="text-white/60 font-light leading-relaxed max-w-sm">
               A sanctuary of shadow and light in the heart of the city. 
               Where heritage meets modern brutalist elegance.
             </p>
          </div>

          <div className="md:col-span-3 md:col-start-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Explore</h4>
            <ul className="space-y-4">
              {footerLinks.map(item => (
                <li key={String(item.name)}>
                  <Link to={item.path} className="text-white/60 hover:text-[#C5A059] transition-colors text-sm">
                    {String(item.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Contact</h4>
            <div className="space-y-4 text-white/60 text-sm">
              <p className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-[#C5A059]" />
                1001 Shadow Lane<br/>Metropolis, NY 10012
              </p>
              <p>+1 (555) 000-0000</p>
              <p>concierge@obsidian.com</p>
              <div className="flex gap-4 pt-4">
                <Instagram className="w-5 h-5 hover:text-[#C5A059] cursor-pointer" />
                <Facebook className="w-5 h-5 hover:text-[#C5A059] cursor-pointer" />
                <Twitter className="w-5 h-5 hover:text-[#C5A059] cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
          {/* REMOVED new Date() TO PREVENT ERROR #31 */}
          <p>© 2025 The Obsidian Retreat. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
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