'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';

import { CONTACTO, TIENDA_URL, type Lang, type T } from './content';
import s from './landing.module.css';

export const EASE = [0.22, 1, 0.36, 1] as const;

// ---------- Idioma ----------

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'en', setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    try {
      const guardado = localStorage.getItem('algalope-lang');
      if (guardado === 'en' || guardado === 'es') setLangState(guardado);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('algalope-lang', l);
    } catch {}
  };

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(LangCtx);
  const t = (txt: T) => txt[lang];
  return { lang, setLang, t };
}

// ---------- Links ----------

export function whatsappHref(mensaje: string) {
  return `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export function comprarHref(lang: Lang, producto?: string) {
  if (TIENDA_URL) return TIENDA_URL;
  const msg =
    lang === 'en'
      ? `Hi! I'd like to buy ${producto ?? 'Al Galope products'}.`
      : `¡Hola! Quiero comprar ${producto ?? 'productos Al Galope'}.`;
  return whatsappHref(msg);
}

// El ítem "Tienda" del menú lleva a la compra (MercadoLibre o WhatsApp); el resto son anclas.
export function navHref(item: { id: string; externo?: boolean }, lang: Lang) {
  return item.externo ? { href: comprarHref(lang), target: '_blank', rel: 'noreferrer' } : { href: `#${item.id}` };
}

// ---------- Animaciones ----------

export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'p';
}) {
  const Tag = as === 'li' ? motion.li : as === 'p' ? motion.p : motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

// Título que sube línea por línea detrás de una máscara. Se re-anima al cambiar de idioma.
export function Titulo({
  lineas,
  className,
  as = 'h2',
  delay = 0,
  animarAlMontar = false,
}: {
  lineas: React.ReactNode[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  delay?: number;
  animarAlMontar?: boolean;
}) {
  const Tag = as === 'h1' ? motion.h1 : as === 'h3' ? motion.h3 : motion.h2;
  const disparo = animarAlMontar ? { animate: 'visible' } : { whileInView: 'visible', viewport: { once: true, margin: '-10% 0px' } };
  return (
    <Tag className={className} initial="oculto" {...disparo} transition={{ staggerChildren: 0.12, delayChildren: delay }}>
      {lineas.map((linea, i) => (
        <span key={i} className={s.line}>
          <motion.span
            className={s.lineInner}
            variants={{ oculto: { y: '115%', rotate: 2 }, visible: { y: '0%', rotate: 0 } }}
            transition={{ duration: 1, ease: EASE }}
          >
            {linea}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, claro }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <Reveal y={12}>
      <p className={`${s.eyebrow} ${claro ? s.eyebrowClaro : ''}`}>{children}</p>
    </Reveal>
  );
}

export function Contador({ value, duracion = 1.8, formato = (n: number) => String(Math.round(n)) }: { value: number; duracion?: number; formato?: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true, margin: '-10% 0px' });
  const mv = useMotionValue(0);
  const texto = useTransform(mv, formato);
  useEffect(() => {
    if (!enVista) return;
    const c = animate(mv, value, { duration: duracion, ease: EASE });
    return () => c.stop();
  }, [enVista, value, mv, duracion]);
  return <motion.span ref={ref}>{texto}</motion.span>;
}

// ---------- Guarda pampa ----------

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

export function Guarda({ unidades = 48, className, duracion = 2.6, delay = 0 }: { unidades?: number; className?: string; duracion?: number; delay?: number }) {
  const { d, total } = guardaPath(unidades);
  return (
    <svg className={`${s.guarda} ${className ?? ''}`} viewBox={`0 0 ${total} 26`} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ pathLength: { duration: duracion, delay, ease: 'easeInOut' }, opacity: { duration: 0.3, delay } }}
      />
    </svg>
  );
}

// ---------- Caballos al galope ----------

export function Caballos({ duracion = 16, className, delay = 0 }: { duracion?: number; className?: string; delay?: number }) {
  return (
    <div className={`${s.caballosPista} ${className ?? ''}`} aria-hidden>
      <motion.img
        src="/landing/caballos.png"
        alt=""
        className={s.caballos}
        initial={{ left: '-35%' }}
        animate={{ left: '110%', y: [0, -5, 0] }}
        transition={{
          left: { duration: duracion, delay, repeat: Infinity, ease: 'linear' },
          y: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
    </div>
  );
}

// ---------- Íconos de línea ----------

const ICONOS: Record<string, React.ReactNode> = {
  hoja: <path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15Zm0 0 7-7" />,
  reloj: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  llama: <path d="M12 21c-4 0-6.5-2.6-6.5-6 0-4 3.5-5.5 3.5-10 3 1.5 5 4 5 6.5 1-1 1.5-2.2 1.5-3.5 2 1.8 3 4.3 3 7 0 3.4-2.5 6-6.5 6Z" />,
  medalla: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" />
    </>
  ),
  brillo: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />,
  escudo: (
    <>
      <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  material: (
    <>
      <path d="M6 9h12l-1.5 10a2 2 0 0 1-2 1.7h-5A2 2 0 0 1 7.5 19L6 9Z" />
      <path d="M5 9h14M9 9V6a3 3 0 0 1 6 0" />
    </>
  ),
  regla: (
    <>
      <rect x="3" y="8" width="18" height="8" rx="1.5" />
      <path d="M7 8v3M11 8v4M15 8v3M19 8v2" />
    </>
  ),
  whatsapp: (
    <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5 5 16a8.4 8.4 0 1 1 15.5-4.4ZM9 8.5c.3 2.6 3.3 5.8 6.4 6.6l1.4-1.5-2-1-1 .8c-1.1-.5-2.2-1.6-2.8-2.7l.8-1-1-2L9 8.5Z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r=".9" fill="currentColor" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 6.5 9 6.5 9-6.5" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </>
  ),
  taza: (
    <>
      <path d="M6 10h12l-1.2 7.2A3 3 0 0 1 13.8 20h-3.6a3 3 0 0 1-3-2.8L6 10Z" />
      <path d="M14 10l3-6" />
    </>
  ),
  aroma: <path d="M8 20c-2-2.5 2-4.5 0-7s2-4.5 0-7M12 20c-2-2.5 2-4.5 0-7s2-4.5 0-7M16 20c-2-2.5 2-4.5 0-7s2-4.5 0-7" />,
  paleta: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.9 1.5-2-.4-1.4.4-2.5 1.9-2.5H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3Z" />
      <circle cx="7.5" cy="11" r="1.1" />
      <circle cx="10.5" cy="7.2" r="1.1" />
      <circle cx="15" cy="7.8" r="1.1" />
    </>
  ),
  filtro: (
    <>
      <path d="M4 5h16l-6 7.5V19l-4 1.5v-8L4 5Z" />
    </>
  ),
  flecha: <path d="M5 12h14m-5-5 5 5-5 5" />,
  bolsa: (
    <>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
};

// Banderas en SVG: los emojis de bandera no se ven en Windows (aparecen como "US" / "AR").
export function Bandera({ pais }: { pais: 'us' | 'ar' }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={s.bandera} src={`/landing/flag-${pais}.svg`} alt="" width={20} height={14} />;
}

export function Icono({ nombre, size = 22, className }: { nombre: string; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {ICONOS[nombre]}
    </svg>
  );
}
