'use client';

import { MotionConfig } from 'framer-motion';

import { Contacto, Footer, WhatsAppFlotante } from './Cierre';
import { Header } from './Header';
import { Hero } from './Hero';
import { Historia } from './Historia';
import { Reels } from './Marca';
import { Productos } from './Productos';
import s from './landing.module.css';
import { LangProvider } from './ui';

export function Landing({ fontClassName }: { fontClassName: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <div className={`${s.root} ${fontClassName}`}>
          <Header />
          <main>
            <Hero />
            <Reels />
            <Historia />
            <Productos />
            <Contacto />
          </main>
          <Footer />
          <WhatsAppFlotante />
        </div>
      </LangProvider>
    </MotionConfig>
  );
}
