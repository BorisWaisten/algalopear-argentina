'use client';

import { MotionConfig } from 'framer-motion';

import { Certificaciones, Contacto, Footer, Tienda, WhatsAppFlotante } from './Cierre';
import { Header } from './Header';
import { Hero } from './Hero';
import { Historia, Proceso } from './Historia';
import { Pilares, Reels } from './Marca';
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
            <Pilares />
            <Reels />
            <Historia />
            <Proceso />
            <Productos />
            <Certificaciones />
            <Tienda />
            <Contacto />
          </main>
          <Footer />
          <WhatsAppFlotante />
        </div>
      </LangProvider>
    </MotionConfig>
  );
}
