import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gem } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Rooms', path: '/rooms' },
  { name: 'Services', path: '/services' }
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled 
            ? 'bg-[#0A0A0A]/95 backdrop-blur-xl py-3 border-white/10' 
            : 'bg-transparent py-4 md:py-6 border-transparent'
        }`}
      >
        <div className="max-w-[1800px] w-[92%] mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3 relative z-50">
            <div className={`p-1.5 md:p-2 rounded-full border transition-colors duration-500 ${scrolled ? 'bg-white/5 border-white/10' : 'bg-transparent border-transparent'}`}>
               <Gem className="w-4 h-4 md:w-5 md:h-5 text-[#C5A059]" strokeWidth={1.5} />
            </div>
            <span className="font-serif text-xl md:text-2xl tracking-[0.1em] uppercase text-[#F5F5F0]">
              Obsidian
            </span>
          </Link>

          {/* Desktop/Laptop Links (Visible on MD and up) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-12">
            {LINKS.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-[#C5A059]' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link 
              to="/reserve" 
              className="ml-4 lg:ml-8 px-6 lg:px-8 py-2.5 lg:py-3 bg-[#C5A059] text-[#0A0A0A] text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-white transition-colors"
            >
              Book Stay
            </Link>
          </div>

          {/* Mobile Menu Toggle (Hidden on MD and up) */}
          <button 
            onClick={() => setIsOpen(true)} 
            className="md:hidden text-white p-2 hover:text-[#C5A059] transition-colors relative z-50"
          >
            <Menu className="w-6 h-6" strokeWidth={1} />
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C5A059] origin-left" style={{ scaleX }} />
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-[#0A0A0A] flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-6 right-[4%] p-4 text-white/50 hover:text-[#C5A059] transition-colors"
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>

            <div className="flex flex-col gap-8 text-center">
              {LINKS.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="font-serif text-4xl sm:text-5xl text-white hover:text-[#C5A059] italic transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/reserve" 
                className="mt-8 px-10 py-4 border border-white/20 text-[#C5A059] text-xs font-bold uppercase tracking-[0.25em]"
              >
                Reserve Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;