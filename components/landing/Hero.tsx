'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';

import { HERO, UI } from './content';
import s from './landing.module.css';
import { Caballos, EASE, Guarda, Icono, Titulo, comprarHref, useLang } from './ui';

export function Hero() {
  const { lang, t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const fondoY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textoY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const opacidad = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const cajaY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 110, damping: 16 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 110, damping: 16 });
  const brilloX = useTransform(mx, [-0.5, 0.5], ['-40%', '140%']);

  return (
    <section
      id="inicio"
      ref={ref}
      className={s.hero}
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <motion.div className={s.heroFondo} style={{ y: fondoY }}>
        <motion.div
          className={s.heroFondoImg}
          initial={{ scale: 1.25 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 3.2, ease: EASE }}
        >
          <Image src="/landing/hero-iguazu.webp" alt="Iguazú Falls, Misiones, Argentina" fill priority sizes="100vw" />
        </motion.div>
      </motion.div>
      <div className={s.heroVelo} />
      <motion.div
        className={s.heroBruma}
        animate={{ x: ['-10%', '10%', '-10%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className={`${s.wrap} ${s.heroGrid}`}>
        <motion.div className={s.heroTexto} style={{ y: textoY, opacity: opacidad }}>
          <motion.p
            className={s.heroEyebrow}
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.28em' }}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          >
            {t(HERO.eyebrow)}
          </motion.p>
          <motion.p
            className={`${s.heroMarca} ${s.plata}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: EASE }}
          >
            Al Galope
          </motion.p>
          <Titulo
            key={lang}
            as="h1"
            animarAlMontar
            className={`${s.display} ${s.heroTitulo}`}
            delay={0.6}
            lineas={HERO.lineas[lang]}
          />
          <motion.p
            key={`b-${lang}`}
            className={s.heroBajada}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
          >
            {t(HERO.bajada)}
          </motion.p>
          <motion.div
            className={s.heroCtas}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
          >
            <motion.a
              href={comprarHref(lang)}
              target="_blank"
              rel="noreferrer"
              className={`${s.btn} ${s.btnPlata} ${s.btnGrande}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Icono nombre="bolsa" size={18} />
              {t(UI.comprar)}
              <span className={s.btnBrillo} />
            </motion.a>
            <motion.a href="#productos" className={`${s.btn} ${s.btnLinea} ${s.btnGrande}`} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              {t(HERO.secundario)}
              <Icono nombre="flecha" size={18} />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div className={s.heroProducto} style={{ y: cajaY }}>
          <motion.div
            className={s.heroCaja}
            style={{ rotateX: rotX, rotateY: rotY }}
            initial={{ opacity: 0, y: 120, rotateZ: -6 }}
            animate={{ opacity: 1, y: 0, rotateZ: 0 }}
            transition={{ duration: 1.6, delay: 0.5, ease: EASE }}
          >
            <motion.div
              className={s.heroCajaFlota}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image src="/landing/caja.png" alt="Al Galope Yerba Mate box" fill priority sizes="(max-width: 900px) 60vw, 30vw" />
              <motion.span className={s.heroCajaBrillo} style={{ left: brilloX }} />
            </motion.div>
          </motion.div>
          <div className={s.heroSombra} />
          <motion.div
            className={s.heroSello}
            initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, delay: 1.5, ease: EASE }}
          >
            <motion.svg viewBox="0 0 120 120" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
              <defs>
                <path id="sello-circulo" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
              </defs>
              <text>
                <textPath href="#sello-circulo">
                  {lang === 'en' ? 'NATURALLY AGED · EXPORT QUALITY · ' : 'ESTACIONADA · CALIDAD EXPORTACIÓN · '}
                </textPath>
              </text>
            </motion.svg>
            <strong>18+</strong>
            <span>{lang === 'en' ? 'months' : 'meses'}</span>
          </motion.div>
        </motion.div>
      </div>

      <div className={s.heroPie}>
        <Caballos duracion={18} delay={1.5} />
        <div className={s.wrap}>
          <Guarda duracion={3} delay={0.8} />
        </div>
      </div>

    </section>
  );
}
