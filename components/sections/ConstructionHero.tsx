'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function ConstructionHero() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-copy"
        >
          <p className="eyebrow">Próximamente</p>
          <h1>Estamos trabajando en una nueva experiencia.</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hero-visual"
        >
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="construction-panel">
            <span>En construcción</span>
            <strong>Pronto llega algo increíble</strong>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
