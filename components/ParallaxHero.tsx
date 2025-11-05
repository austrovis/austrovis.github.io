'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ParallaxHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="absolute inset-0 z-0"
      style={{
        transform: `translateY(${scrollY * 0.3}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <Image
        src="/hero-placeholder.svg"
        alt="AustroVis Hero"
        fill
        priority
        className="object-cover opacity-5"
      />
    </div>
  );
}
