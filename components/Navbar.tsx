import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gem } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// We define the links here directly to bypass the broken constants file
const LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Rooms', path: '/rooms' }
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          <Link to="/" className="group flex items-center gap-3 z-50">
            <div className="bg-white/5 p-2 rounded-full border border-white/10 group-hover:border-[#C5A059]/50 transition-colors">
               <Gem className="w-6 h-6 text-[#C5A059]" strokeWidth={1.5} />
            </div>
            <span className="font-serif text-3xl tracking-[0.15em] uppercase text-[#F5F5F0]">
              Obsidian
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-12">
            {LINKS.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all ${
                  location.pathname === link.path ? 'text-[#C5A059]' : 'text-white/60 hover:text-white'
                }`}
              >
                {/* We use String() here to be 100% safe against Error #31 */}
                {String(link.name)}
              </Link>
            ))}
            <Link 
              to="/reserve" 
              className="px-8 py-3 bg-white/5 border border-white/10 text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-[#C5A059] hover:text-black transition-all"
            >
              Book Stay
            </Link>
          </div>

          <button onClick={() => setIsOpen(true)} className="xl:hidden text-white z-50">
            <Menu className="w-8 h-8" strokeWidth={1} />
          </button>
        </div>

        <motion.div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C5A059] origin-left" style={{ scaleX }} />
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0A0A0A] flex flex-col items-center justify-center"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-6 text-[#C5A059] p-4">
              <X className="w-8 h-8" strokeWidth={1} />
            </button>
            <div className="flex flex-col gap-10 text-center">
              {LINKS.map((link) => (
                <Link key={link.name} to={link.path} className="font-serif text-5xl text-white hover:text-[#C5A059] italic">
                  {String(link.name)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;