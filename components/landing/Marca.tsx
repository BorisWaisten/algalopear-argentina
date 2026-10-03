'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { REELS, UI } from './content';
import s from './landing.module.css';
import { EASE, Eyebrow, Icono, Reveal, Titulo, comprarHref, useLang } from './ui';

export function Reels() {
  const { lang, t } = useLang();

  return (
    <section className={`${s.section} ${s.oscura} ${s.reels}`}>
      <div className={s.wrap}>
        <div className={s.reelsCabecera}>
          <div>
            <Eyebrow claro>{t(REELS.eyebrow)}</Eyebrow>
            <Titulo key={lang} className={`${s.display} ${s.h2}`} lineas={REELS.titulo[lang]} />
          </div>
          <Reveal delay={0.2} className={s.reelsTexto}>
            <p className={s.lead}>{t(REELS.texto)}</p>
            <motion.a
              href={comprarHref(lang)}
              target="_blank"
              rel="noreferrer"
              className={`${s.btn} ${s.btnPlata}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Icono nombre="bolsa" size={18} />
              {t(UI.comprar)}
            </motion.a>
          </Reveal>
        </div>

        <div className={s.reelsGrid}>
          {REELS.videos.map((v, i) => (
            <VideoVertical key={v.src} src={v.src} label={t(v.label)} indice={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoVertical({ src, label, indice }: { src: string; label: string; indice: number }) {
  const video = useRef<HTMLVideoElement>(null);

  // Solo reproduce mientras está en pantalla.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.figure
      className={s.reel}
      initial={{ opacity: 0, clipPath: 'inset(30% 0% 30% 0% round 24px)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.2, delay: indice * 0.12, ease: EASE }}
    >
      <video
        ref={video}
        src={`/landing/video/${src}.mp4`}
        poster={`/landing/video/${src}.webp`}
        muted
        loop
        playsInline
        preload="none"
      />
      <figcaption>
        <span className={s.reelPunto} />
        {label}
      </figcaption>
    </motion.figure>
  );
}
