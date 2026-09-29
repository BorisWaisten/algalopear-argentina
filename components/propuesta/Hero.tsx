'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';

import { ESTUDIO } from './data';
import s from './propuesta.module.css';
import { EASE, GuardaPampa, Titulo } from './ui';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textoY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const opacidad = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Inclinación de la tarjeta siguiendo el mouse.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 16 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 16 });

  const alMover = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <header ref={ref} className={s.hero}>
      <div className={`${s.wrap} ${s.heroTop}`}>
        <GuardaPampa duracion={3} />
        <motion.div
          className={s.heroBar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span>Al Galope · Propuesta web</span>
          <span>{ESTUDIO.nombre}</span>
        </motion.div>
      </div>

      <div className={`${s.wrap} ${s.heroGrid}`}>
        <motion.div style={{ y: textoY, opacity: opacidad }}>
          <Titulo
            as="h1"
            className={s.heroTitle}
            delay={0.2}
            lineas={['Tu marca,', <em key="g">al galope.</em>]}
          />
          <motion.p
            className={s.heroSub}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
          >
            Tu landing en español e inglés ya está confirmada. Leímos todo lo que nos mandaste y te mostramos cómo llevarla
            más lejos: la diferencia está en cuánto <strong>se mueve</strong> y en cómo se siente tu marca.
          </motion.p>
          <motion.div
            className={s.heroActions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9, ease: EASE }}
          >
            <motion.a href="#opciones" className={`${s.btn} ${s.btnClaro}`} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Ver las opciones →
            </motion.a>
            <motion.a href="#diferencia" className={`${s.btn} ${s.btnLinea}`} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Ver la diferencia
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className={s.heroVisual}
          style={{ y: visualY }}
          onPointerMove={alMover}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          <motion.div
            className={s.heroCard}
            style={{ rotateX: rotX, rotateY: rotY }}
            initial={{ opacity: 0, scale: 0.9, clipPath: 'inset(100% 0% 0% 0% round 28px)' }}
            animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
            transition={{ duration: 1.3, delay: 0.3, ease: EASE }}
          >
            <Image src="/propuesta/lifestyle.webp" alt="Yerba Al Galope con mate y peluche" fill priority sizes="(max-width: 960px) 90vw, 40vw" />
          </motion.div>
          <motion.div
            className={s.heroBadge}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: EASE }}
          >
            <strong>+18 meses</strong>
            estacionamiento natural
          </motion.div>
        </motion.div>
      </div>

      <div className={s.horsesTrack} aria-hidden>
        <motion.img
          src="/propuesta/caballos.png"
          alt=""
          className={s.horses}
          initial={{ left: '-30%' }}
          animate={{ left: '105%', y: [0, -5, 0, -5, 0] }}
          transition={{
            left: { duration: 14, repeat: Infinity, ease: 'linear' },
            y: { duration: 0.55, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      </div>

      <div className={s.scrollCue} aria-hidden>
        Scroll
        <motion.span
          className={s.scrollDot}
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </header>
  );
}
