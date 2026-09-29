'use client';

import { MotionConfig } from 'framer-motion';

import { Footer, Pendientes, Tienda } from './Cierre';
import { Diferencia } from './Diferencia';
import { Efectos } from './Efectos';
import { Hero } from './Hero';
import { Opciones } from './Opciones';
import { Pedidos } from './Pedidos';
import s from './propuesta.module.css';

export function Propuesta({ fontClassName }: { fontClassName: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className={`${s.root} ${fontClassName}`}>
        <Hero />
        <main>
          <Pedidos />
          <Diferencia />
          <Efectos />
          <Opciones />
          <Tienda />
          <Pendientes />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
