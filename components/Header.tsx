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
          className="p-2 rounded-lg hover:bg-black/5 transition-all duration-300 group"
          aria-label="Join Discord"
          title="Join Discord"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="transition-all duration-500 group-hover:text-[#5865F2] group-hover:animate-[flip_0.5s_ease-in-out]">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
        </a>
      </div>
    </header>
  );
}
