'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <ThemeToggle />
    </>
  );
}
