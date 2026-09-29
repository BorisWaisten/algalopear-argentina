'use client';

import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';

import s from './propuesta.module.css';

export const EASE = [0.22, 1, 0.36, 1] as const;

export const formatoARS = (n: number) => `$${Math.round(n).toLocaleString('es-AR')}`;

// Guarda pampa: rombos escalonados entre dos líneas, trazada como un solo path para poder "dibujarla".
function guardaPath(unidades: number) {
  const w = 40;
  const total = unidades * w;
  let d = `M0 2 H${total} M0 24 H${total} M0 6 H${total} M0 20 H${total}`;
  for (let i = 0; i < unidades; i++) {
    const x = i * w;
    const c = x + w / 2;
    d += ` M${x + 4} 13 L${c - 4} 9 L${c - 4} 7 L${c} 7 L${c + 4} 9 L${x + w - 4} 13 L${c + 4} 17 L${c + 4} 19 L${c - 4} 19 L${c - 4} 17 Z`;
    d += ` M${c - 3} 13 L${c} 10 L${c + 3} 13 L${c} 16 Z`;
  }
  return { d, total };
}

type GuardaProps = { unidades?: number; className?: string; delay?: number; duracion?: number; replayKey?: number };

export function GuardaPampa({ unidades = 40, className, delay = 0, duracion = 2.4, replayKey = 0 }: GuardaProps) {
  const { d, total } = guardaPath(unidades);
  return (
    <svg
      className={`${s.guarda} ${className ?? ''}`}
      viewBox={`0 0 ${total} 26`}
      preserveAspectRatio="xMinYMid slice"
      aria-hidden
    >
      <motion.path
        key={replayKey}
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ pathLength: { duration: duracion, delay, ease: 'easeInOut' }, opacity: { duration: 0.3, delay } }}
      />
    </svg>
  );
}

export function AnimatedNumber({ value, formato = formatoARS, duracion = 1.1 }: { value: number; formato?: (n: number) => string; duracion?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true, margin: '-10% 0px' });
  const mv = useMotionValue(0);
  const texto = useTransform(mv, formato);

  useEffect(() => {
    if (!enVista) return;
    const control = animate(mv, value, { duration: duracion, ease: EASE });
    return () => control.stop();
  }, [enVista, value, mv, duracion]);

  return <motion.span ref={ref}>{texto}</motion.span>;
}

export function Reveal({ children, delay = 0, y = 28, className }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Título que sube línea por línea detrás de una máscara.
export function Titulo({ lineas, className, as = 'h2', delay = 0 }: { lineas: React.ReactNode[]; className?: string; as?: 'h1' | 'h2'; delay?: number }) {
  const Tag = as === 'h1' ? motion.h1 : motion.h2;
  return (
    <Tag
      className={`${s.display} ${className ?? ''}`}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ staggerChildren: 0.12, delayChildren: delay }}
    >
      {lineas.map((linea, i) => (
        <span key={i} className={s.line}>
          <motion.span
            className={s.lineInner}
            variants={{ oculto: { y: '110%' }, visible: { y: '0%' } }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {linea}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Reveal y={12}>
      <p className={s.eyebrow}>{children}</p>
    </Reveal>
  );
}
