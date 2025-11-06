'use client';

import { useEffect, useState } from 'react';

export default function ParallaxHero() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Austrian Alps - Background mountains */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[60%]"
        style={{
          transform: `translateY(${scrollY * 0.5}px) translateX(${mousePos.x * 0.5}px)`,
        }}
      >
        {/* Far mountain range */}
        <svg
          className="absolute bottom-0 w-full h-full opacity-[0.03]"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
        >
          <path
            d="M0,600 L0,300 L200,200 L400,350 L600,150 L800,250 L1000,200 L1200,300 L1200,600 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Mid mountain range */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[45%]"
        style={{
          transform: `translateY(${scrollY * 0.35}px) translateX(${mousePos.x * 0.8}px)`,
        }}
      >
        <svg
          className="absolute bottom-0 w-full h-full opacity-[0.05]"
          viewBox="0 0 1200 450"
          preserveAspectRatio="none"
        >
          <path
            d="M0,450 L0,250 L150,180 L300,280 L450,120 L600,200 L750,140 L900,220 L1050,180 L1200,250 L1200,450 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Front mountain range */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%]"
        style={{
          transform: `translateY(${scrollY * 0.2}px) translateX(${mousePos.x * 1.2}px)`,
        }}
      >
        <svg
          className="absolute bottom-0 w-full h-full opacity-[0.08]"
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
        >
          <path
            d="M0,300 L0,180 L200,100 L400,200 L600,80 L800,160 L1000,120 L1200,180 L1200,300 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Data visualization elements - floating points */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.15}px) translateX(${mousePos.x * 1.5}px)`,
        }}
      >
        {/* Scatter plot points */}
        <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-black/4 rounded-full" />
        <div className="absolute top-[35%] left-[25%] w-1.5 h-1.5 bg-black/5 rounded-full" />
        <div className="absolute top-[45%] left-[18%] w-1 h-1 bg-black/4 rounded-full" />
        <div className="absolute top-[25%] right-[20%] w-1 h-1 bg-black/4 rounded-full" />
        <div className="absolute top-[40%] right-[28%] w-1.5 h-1.5 bg-black/5 rounded-full" />
        <div className="absolute top-[55%] right-[22%] w-1 h-1 bg-black/4 rounded-full" />
      </div>

      {/* Graph lines - subtle */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.1}px) translateX(${-mousePos.x * 0.5}px)`,
        }}
      >
        <svg className="w-full h-full opacity-[0.02]" viewBox="0 0 1200 800">
          <polyline
            points="100,400 200,350 300,380 400,320 500,340 600,300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <polyline
            points="700,500 800,450 900,480 1000,440 1100,460"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Hidden chicken - very subtle, top right area */}
      <div
        className="absolute top-[15%] right-[12%] opacity-[0.015] hover:opacity-[0.15] transition-opacity duration-500 cursor-pointer"
        style={{
          transform: `translateY(${scrollY * 0.25}px) translateX(${mousePos.x * 2}px) rotate(${mousePos.x * 0.5}deg)`,
        }}
        title="🐔 You found the Austrian chicken!"
      >
        <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor">
          {/* Chicken body */}
          <ellipse cx="50" cy="60" rx="25" ry="20" />
          {/* Chicken head */}
          <circle cx="45" cy="40" r="15" />
          {/* Beak */}
          <path d="M35,38 L28,40 L35,42 Z" />
          {/* Comb */}
          <path d="M42,28 Q45,22 48,28 Q51,22 54,28" fill="none" stroke="currentColor" strokeWidth="2" />
          {/* Eye */}
          <circle cx="42" cy="38" r="2" />
          {/* Legs */}
          <line x1="45" y1="80" x2="45" y2="90" stroke="currentColor" strokeWidth="2" />
          <line x1="55" y1="80" x2="55" y2="90" stroke="currentColor" strokeWidth="2" />
          {/* Feet */}
          <path d="M40,90 L45,90 L50,90" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M50,90 L55,90 L60,90" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Subtle data grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      >
        <div className="w-full h-full" 
          style={{
            backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </div>
  );
}
