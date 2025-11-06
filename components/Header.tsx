'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? 'w-auto' : 'w-auto'
      }`}
    >
      <div 
        className={`flex items-center gap-4 px-6 py-3 rounded-full bg-white border border-black/10 shadow-lg transition-all duration-300 ${
          scrolled ? 'shadow-xl' : ''
        }`}
      >
        <Link 
          href="/" 
          className="flex items-center gap-2 text-lg font-bold tracking-tight hover:opacity-70 transition-opacity"
        >
            <img src="/logo.svg" alt="AustroVis Logo" width="28" height="28" className="inline-block" />
          AustroVis
        </Link>
        <div className="w-px h-6 bg-black/10" />
        <a 
          href="https://discord.gg/rbkSzsxP47" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-1.5 bg-black text-white text-sm font-medium rounded-full hover:bg-black/80 transition-colors"
        >
          Join Discord
        </a>
      </div>
    </header>
  );
}
