'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import s from './propuesta.module.css';
import { EASE, Eyebrow, Reveal, Titulo } from './ui';

// Textos del documento de la clienta.
const COPY = {
  es: {
    nav: ['Inicio', 'Nosotros', 'Productos', 'Contacto'],
    titulo: ['Tradición que se', 'toma despacio.'],
    texto: 'Tradición, estacionamiento natural y calidad de exportación, para los paladares más exigentes.',
    cta: 'Conocé nuestra yerba',
  },
  en: {
    nav: ['Home', 'About', 'Products', 'Contact'],
    titulo: ['Tradition worth', 'savoring slowly.'],
    texto: 'Tradition, natural aging, and export-grade quality, for the most demanding palates.',
    cta: 'Discover our yerba',
  },
};

type Modo = 'estatica' | 'animada';
type Idioma = keyof typeof COPY;

export function Diferencia() {
  const [modo, setModo] = useState<Modo>('animada');
  const [idioma, setIdioma] = useState<Idioma>('es');
  const [replay, setReplay] = useState(0);

  return (
    <section id="diferencia" className={`${s.section} ${s.sectionDark}`}>
      <div className={s.wrap}>
        <Eyebrow>02 · Mirá la diferencia</Eyebrow>
        <Titulo lineas={['Mismo contenido.', 'Otra marca.']} className={s.h2} />
        <Reveal delay={0.2}>
          <p className={s.lead}>
            Este es el inicio de tu página con tu foto y tu texto. Cambiá entre estática y animada, y probá el cambio de
            idioma. Las animaciones no son decoración: hacen que una yerba de exportación se sienta premium.
          </p>
        </Reveal>

        <div className={s.controls}>
          <Segmentado
            opciones={[
              ['estatica', 'Estática'],
              ['animada', 'Animada'],
            ]}
            valor={modo}
            onChange={(v) => {
              setModo(v as Modo);
              setReplay((r) => r + 1);
            }}
            id="modo"
          />
          <Segmentado
            opciones={[
              ['es', '🇦🇷 ES'],
              ['en', '🇺🇸 EN'],
            ]}
            valor={idioma}
            onChange={(v) => setIdioma(v as Idioma)}
            id="idioma"
          />
          <button type="button" className={s.ghostBtn} onClick={() => setReplay((r) => r + 1)} disabled={modo === 'estatica'}>
            ↻ Repetir
          </button>
        </div>

        <Reveal y={50}>
          <div className={s.browser}>
            <div className={s.browserBar}>
              <i />
              <i />
              <i />
              <span className={s.browserUrl}>algalopeargentina.com</span>
            </div>
            <Mock key={`${modo}-${replay}`} animada={modo === 'animada'} idioma={idioma} />
          </div>
        </Reveal>

        <div className={s.demoCaption}>
          <span>
            <strong>Estática</strong> es lo que incluye el plan Esencial.
          </span>
          <span>
            <strong>Animada + inglés</strong> es lo que incluyen los planes Animada y Premium.
          </span>
        </div>
      </div>
    </section>
  );
}

function Segmentado({
  opciones,
  valor,
  onChange,
  id,
}: {
  opciones: [string, string][];
  valor: string;
  onChange: (v: string) => void;
  id: string;
}) {
  return (
    <div className={s.segmented} role="group">
      {opciones.map(([v, label]) => (
        <button
          key={v}
          type="button"
          aria-pressed={valor === v}
          className={`${s.segBtn} ${valor === v ? s.segBtnOn : ''}`}
          onClick={() => onChange(v)}
        >
          {valor === v && <motion.span layoutId={`pill-${id}`} className={s.segPill} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
          {label}
        </button>
      ))}
    </div>
  );
}

function Mock({ animada, idioma }: { animada: boolean; idioma: Idioma }) {
  const t = COPY[idioma];
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bgX = useSpring(useTransform(mx, [-0.5, 0.5], ['1.5%', '-1.5%']), { stiffness: 80, damping: 20 });
  const bgY = useSpring(useTransform(my, [-0.5, 0.5], ['1.5%', '-1.5%']), { stiffness: 80, damping: 20 });

  // En modo estático todo aparece de golpe: sin transición.
  const tr = (delay: number, dur = 0.9) => (animada ? { duration: dur, delay, ease: EASE } : { duration: 0 });

  return (
    <div
      className={s.mock}
      onPointerMove={(e) => {
        if (!animada) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      <motion.div
        className={s.mockBg}
        style={animada ? { x: bgX, y: bgY } : undefined}
        initial={animada ? { scale: 1.25, filter: 'blur(8px)' } : false}
        animate={{ scale: 1, filter: 'blur(0px)' }}
        transition={tr(0, 1.8)}
      >
        <Image src="/propuesta/lifestyle.webp" alt="" fill sizes="(max-width: 1160px) 100vw, 1100px" />
      </motion.div>
      <div className={s.mockShade} />

      <motion.nav className={s.mockNav} initial={animada ? { opacity: 0, y: -20 } : false} animate={{ opacity: 1, y: 0 }} transition={tr(0.3)}>
        <span className={s.mockLogo}>AL GALOPE</span>
        <span className={s.mockLinks}>
          {t.nav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </span>
      </motion.nav>

      <div className={s.mockBody}>
        <AnimatePresence mode="wait" initial={animada}>
          <motion.div
            key={idioma}
            initial="oculto"
            animate="visible"
            exit="salida"
            transition={{ staggerChildren: animada ? 0.12 : 0, delayChildren: animada ? 0.5 : 0 }}
          >
            <h3 className={`${s.display} ${s.mockTitle}`}>
              {t.titulo.map((l) => (
                <span key={l} className={s.line}>
                  <motion.span
                    className={s.lineInner}
                    variants={
                      animada
                        ? { oculto: { y: '110%' }, visible: { y: '0%' }, salida: { y: '-110%' } }
                        : { oculto: { y: 0 }, visible: { y: 0 }, salida: { y: 0 } }
                    }
                    transition={tr(0, 0.8)}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </h3>
            <motion.p
              className={s.mockText}
              variants={animada ? { oculto: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 }, salida: { opacity: 0 } } : undefined}
              transition={tr(0, 0.7)}
            >
              {t.texto}
            </motion.p>
            <motion.span
              className={s.mockCta}
              variants={animada ? { oculto: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 }, salida: { opacity: 0 } } : undefined}
              transition={tr(0, 0.6)}
            >
              {t.cta} →
              {animada && (
                <motion.span
                  className={s.shine}
                  initial={{ x: '-120%' }}
                  animate={{ x: '120%' }}
                  transition={{ duration: 1.4, delay: 2, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
                />
              )}
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>

      {animada && (
        <motion.img
          src="/propuesta/caballos.png"
          alt=""
          className={s.mockHorses}
          initial={{ left: '-25%' }}
          animate={{ left: '110%', y: [0, -4, 0] }}
          transition={{ left: { duration: 9, delay: 1, repeat: Infinity, ease: 'linear' }, y: { duration: 0.5, repeat: Infinity } }}
        />
      )}
    </div>
  );
}
