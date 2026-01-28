
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash || '#home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#home');
      window.scrollTo(0, 0); // Reset scroll position on navigation
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navLinks = [
    { name: 'Home', hash: '#home', icon: 'fa-house' },
    { name: 'About', hash: '#about', icon: 'fa-user' },
    { name: 'Projects', hash: '#projects', icon: 'fa-layer-group' },
    { name: 'Skills', hash: '#skills', icon: 'fa-code' },
    { name: 'AI Twin', hash: '#ai-twin', icon: 'fa-robot' },
    { name: 'Contact', hash: '#contact', icon: 'fa-paper-plane' },
  ];

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-500 ${
        isScrolled || isMobileMenuOpen ? 'py-4 glass-card shadow-2xl' : 'py-8 bg-transparent'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={() => navigateTo('#home')}
            className="text-2xl font-bold font-heading tracking-tighter text-indigo-500 group flex items-center gap-1"
          >
            <span className="group-hover:translate-x-[-2px] transition-transform text-xl md:text-2xl uppercase">RYAN</span>
            <span className="text-white text-xl md:text-2xl">.DEV</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-1 p-1 bg-white/5 rounded-full border border-white/10">
            {navLinks.map((link) => (
              <button
                key={link.hash}
                onClick={() => navigateTo(link.hash)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full flex items-center gap-2 ${
                  activeHash === link.hash 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <i className={`fas ${link.icon} text-[10px]`}></i>
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigateTo('#contact')}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/20 active:scale-95 hidden sm:block"
            >
              Let's Talk
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden w-10 h-10 flex items-center justify-center text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars-staggered'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 glass-card border-t border-white/5 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[500px] py-6 opacity-100' : 'max-h-0 py-0 opacity-0'
        }`}>
          <div className="flex flex-col px-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.hash}
                onClick={() => navigateTo(link.hash)}
                className={`text-left py-3 text-xs font-black uppercase tracking-[0.3em] transition-all flex items-center gap-4 ${
                  activeHash === link.hash ? 'text-indigo-500' : 'text-gray-400'
                }`}
              >
                <i className={`fas ${link.icon} w-5`}></i>
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => navigateTo('#contact')}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-[0.3em] mt-4 flex items-center justify-center gap-3"
            >
              <i className="fas fa-handshake"></i>
              Start Collaboration
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
