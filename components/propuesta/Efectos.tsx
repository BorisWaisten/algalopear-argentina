'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';

import s from './propuesta.module.css';
import { AnimatedNumber, EASE, Eyebrow, GuardaPampa, Reveal, Titulo } from './ui';

const SLIDES = [
  { src: '/propuesta/caja.webp', label: 'Yerba Premium' },
  { src: '/propuesta/mate-algarrobo.webp', label: 'Mate de algarrobo' },
  { src: '/propuesta/campo.webp', label: 'Argentine Mate' },
  { src: '/propuesta/mates-imperial.webp', label: 'Imperial & Pampa' },
  { src: '/propuesta/peluches.webp', label: 'Mate plush toys' },
  { src: '/propuesta/peluche-nene.webp', label: 'Peluche mate' },
];

export function Efectos() {
  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <Eyebrow>03 · Lo que podemos sumarle</Eyebrow>
        <Titulo lineas={['Tocá, arrastrá,', 'pasá el mouse.']} className={s.h2} />
        <Reveal delay={0.2}>
          <p className={s.lead}>
            Cada tarjeta es un efecto real que podemos poner en tu página, hecho con tus productos. Así se siente una marca
            cuidada en cada detalle, como dice tu texto de Nosotros.
          </p>
        </Reveal>

        <div className={s.efectos}>
          <Card tag="Efecto avanzado" titulo="Producto en 3D" className={s.efectoAncho}>
            <Tilt />
          </Card>
          <Card tag="Animación" titulo="Datos que cuentan" className={s.efectoAncho}>
            <div>
              <div className={`${s.display} ${s.counterNum}`}>
                +<AnimatedNumber value={18} formato={(n) => String(Math.round(n))} duracion={2} />
              </div>
              <div className={s.counterLabel}>meses de estacionamiento natural</div>
            </div>
          </Card>
          <Card tag="Idiomas" titulo="Español · English">
            <Idiomas />
          </Card>
          <Card tag="Identidad" titulo="Guarda que se dibuja">
            <GuardaDemo />
          </Card>
          <Card tag="Microinteracción" titulo="Botones con vida">
            <BotonVivo />
          </Card>
          <Card tag="Slider" titulo="Galería para arrastrar" className={s.efectoFull}>
            <Carrusel />
            <p className={s.hint}>← Arrastrá las fotos →</p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({ tag, titulo, className, children }: { tag: string; titulo: string; className?: string; children: React.ReactNode }) {
  return (
    <motion.article
      className={`${s.efecto} ${className ?? ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <span className={s.efectoTag}>{tag}</span>
      <h3 className={`${s.display} ${s.efectoTitle}`}>{titulo}</h3>
      <div className={s.efectoStage}>{children}</div>
    </motion.article>
  );
}

function Tilt() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotY = useSpring(useTransform(mx, [0, 1], [-22, 22]), { stiffness: 150, damping: 15 });
  const rotX = useSpring(useTransform(my, [0, 1], [18, -18]), { stiffness: 150, damping: 15 });
  const gx = useTransform(mx, [0, 1], ['0%', '100%']);
  const gy = useTransform(my, [0, 1], ['0%', '100%']);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.9), transparent 55%)`;

  return (
    <div
      className={s.tiltStage}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ padding: 30 }}
    >
      <motion.div className={s.tiltCard} style={{ rotateX: rotX, rotateY: rotY }} whileHover={{ scale: 1.06 }}>
        <Image src="/propuesta/caja.webp" alt="Caja de Yerba Mate Al Galope" fill sizes="170px" />
        <motion.div className={s.tiltGlare} style={{ background: glare }} />
      </motion.div>
    </div>
  );
}

const PALABRAS = [
  ['Tradición', 'Tradition'],
  ['Calidad', 'Quality'],
  ['Origen', 'Origin'],
  ['Misiones', 'Misiones'],
];

function Idiomas() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => n + 1), 1600);
    return () => clearInterval(id);
  }, []);
  const palabra = PALABRAS[Math.floor(i / 2) % PALABRAS.length][i % 2];
  const bandera = i % 2 === 0 ? '🇦🇷' : '🇺🇸';

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={bandera + i}
          className={s.idiomaFlag}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {bandera}
        </motion.div>
      </AnimatePresence>
      <div className={`${s.display} ${s.idiomaBox}`}>
        <AnimatePresence initial={false}>
          <motion.span
            key={i}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {palabra}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

function GuardaDemo() {
  const [k, setK] = useState(0);
  return (
    <div className={s.guardaStage}>
      <GuardaPampa unidades={8} className={s.guardaTinta} replayKey={k} duracion={2.2} />
      <GuardaPampa unidades={8} className={s.guardaTinta} replayKey={k} duracion={2.2} delay={0.4} />
      <button type="button" className={s.replay} onClick={() => setK((n) => n + 1)}>
        ↻ Dibujar de nuevo
      </button>
    </div>
  );
}

function BotonVivo() {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 12 });
  const y = useSpring(0, { stiffness: 200, damping: 12 });

  return (
    <div
      style={{ padding: 40 }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.button
        ref={ref}
        type="button"
        className={`${s.btn} ${s.btnOscuro}`}
        style={{ x, y }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        Comprar yerba →
      </motion.button>
    </div>
  );
}

function Carrusel() {
  const contenedor = useRef<HTMLDivElement>(null);
  return (
    <div className={s.carousel} ref={contenedor} style={{ width: 'calc(100% + 48px)' }}>
      <motion.div className={s.carouselTrack} drag="x" dragConstraints={contenedor} dragElastic={0.12}>
        {SLIDES.map((sl, i) => (
          <motion.div
            key={sl.src}
            className={s.slide}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            whileHover={{ scale: 1.03 }}
          >
            <Image src={sl.src} alt={sl.label} fill sizes="300px" draggable={false} />
            <span className={s.slideLabel}>{sl.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
