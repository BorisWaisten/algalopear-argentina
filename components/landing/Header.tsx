'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';

import { UI, type Lang } from './content';
import s from './landing.module.css';
import { Bandera, EASE, comprarHref, navHref, useLang } from './ui';

export function Header() {
  const { lang, t } = useLang();
  const { scrollY } = useScroll();
  const [oculto, setOculto] = useState(false);
  const [solido, setSolido] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const activo = useSeccionActiva(UI.nav.map((n) => n.id));

  // Se oculta al bajar, reaparece al subir y se vuelve sólido después de la portada.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setOculto(y > prev && y > 240 && !abierto);
    setSolido(y > 80);
  });

  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [abierto]);

  return (
    <>
      <motion.header
        className={`${s.header} ${solido || abierto ? s.headerSolido : ''}`}
        animate={{ y: oculto ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <Marquee frases={UI.marquee[lang]} />
        <div className={`${s.wrap} ${s.nav}`}>
          <a href="#inicio" className={s.marca} onClick={() => setAbierto(false)}>
            <motion.span className={s.marcaLogo} whileHover={{ rotate: -8, scale: 1.06 }}>
              <Image src="/landing/logo.png" alt="" fill sizes="52px" priority />
            </motion.span>
            <span className={s.marcaTexto}>
              <strong>Al Galope</strong>
              <span>Yerba Mate</span>
            </span>
          </a>

          <nav className={s.navLinks} aria-label="Main">
            {UI.nav.map((n) => (
              <a key={n.id} {...navHref(n, lang)} className={activo === n.id ? s.navActivo : ''}>
                {t(n.label)}
                {activo === n.id && <motion.span layoutId="nav-indicador" className={s.navIndicador} />}
              </a>
            ))}
          </nav>

          <div className={s.navDerecha}>
            <SelectorIdioma />
            <button
              type="button"
              className={`${s.hamburguesa} ${abierto ? s.hamburguesaOn : ''}`}
              aria-label="Menu"
              aria-expanded={abierto}
              onClick={() => setAbierto((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {abierto && (
          <motion.div
            className={s.menuMovil}
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <motion.nav initial="oculto" animate="visible" transition={{ staggerChildren: 0.07, delayChildren: 0.25 }}>
              {UI.nav.map((n, i) => (
                <motion.a
                  key={n.id}
                  {...navHref(n, lang)}
                  onClick={() => setAbierto(false)}
                  variants={{ oculto: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <small>0{i + 1}</small>
                  {t(n.label)}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Marquee({ frases }: { frases: string[] }) {
  // Se duplica la tira para que el loop sea continuo.
  const tira = [...frases, ...frases];
  return (
    <div className={s.marquee} aria-label={frases.join(' · ')}>
      <motion.div
        className={s.marqueeTrack}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      >
        {[...tira, ...tira].map((f, i) => (
          <span key={i}>
            {f}
            <i>◆</i>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SelectorIdioma() {
  const { lang, setLang } = useLang();
  const opciones: [Lang, 'us' | 'ar', string][] = [
    ['en', 'us', 'English'],
    ['es', 'ar', 'Español'],
  ];
  return (
    <div className={s.idiomas} role="group" aria-label="Language">
      {opciones.map(([l, bandera, nombre]) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          title={nombre}
          className={lang === l ? s.idiomaOn : ''}
        >
          {lang === l && <motion.span layoutId="idioma-pill" className={s.idiomaPill} transition={{ type: 'spring', stiffness: 500, damping: 34 }} />}
          <Bandera pais={bandera} />
          <span>{l.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}

function useSeccionActiva(ids: string[]) {
  const [activo, setActivo] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setActivo(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  return activo;
}
