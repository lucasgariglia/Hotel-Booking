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
    <footer className="bg-[#0A0A0A] border-t border-white/5 pt-16 md:pt-24 pb-8 md:pb-12 relative overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none">
        <span className="text-[18vw] font-serif leading-none text-white opacity-[0.02] absolute -top-10 left-0">
          OBSIDIAN
        </span>
      </div>

      <div className="max-w-[1800px] w-[92%] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-24 mb-16 md:mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
             <h3 className="font-serif text-2xl md:text-3xl text-[#C5A059] italic">The Obsidian Retreat</h3>
             <p className="text-white/60 font-light leading-relaxed max-w-sm text-sm md:text-base">
               A sanctuary of shadow and light in the heart of the city. 
               Where heritage meets modern brutalist elegance.
             </p>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white mb-6 md:mb-8">Explore</h4>
            <ul className="space-y-3 md:space-y-4">
              {footerLinks.map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-white/60 hover:text-[#C5A059] transition-colors text-xs md:text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white mb-6 md:mb-8">Contact</h4>
            <div className="space-y-3 md:space-y-4 text-white/60 text-xs md:text-sm">
              <p className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-[#C5A059]" />
                1001 Shadow Lane<br/>Metropolis, NY 10012
              </p>
              <p>+1 (555) 000-0000</p>
              <p className="hover:text-white transition-colors cursor-pointer">concierge@obsidian.com</p>
              
              <div className="flex gap-6 pt-4 md:pt-6">
                <Instagram className="w-5 h-5 hover:text-[#C5A059] cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 hover:text-[#C5A059] cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 hover:text-[#C5A059] cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-white/40 gap-4">
          <p>© 2025 The Obsidian Retreat. All rights reserved.</p>
          <div className="flex gap-6 md:gap-8">
            <Link to="/admin" className="hover:text-[#C5A059] transition-colors">Admin Login</Link>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;