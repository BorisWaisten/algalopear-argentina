'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

import { PILARES, REELS, UI } from './content';
import s from './landing.module.css';
import { Contador, EASE, Eyebrow, Icono, Reveal, Titulo, comprarHref, useLang } from './ui';

export function Pilares() {
  const { t } = useLang();
  return (
    <section id="pilares" className={s.pilares}>
      <motion.div
        className={`${s.wrap} ${s.pilaresGrid}`}
        initial="oculto"
        whileInView="visible"
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ staggerChildren: 0.15 }}
      >
        {PILARES.map((p) => (
          <motion.article
            key={p.icono}
            className={s.pilar}
            variants={{ oculto: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <motion.span
              className={s.pilarIcono}
              variants={{ oculto: { scale: 0, rotate: -40 }, visible: { scale: 1, rotate: 0 } }}
              transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.2 }}
            >
              <Icono nombre={p.icono} size={26} />
            </motion.span>
            <h3 className={s.pilarTitulo}>
              {p.numero ? (
                <span className={`${s.display} ${s.pilarNumero} ${s.plataOscura}`}>
                  {p.prefijo}
                  <Contador value={p.numero} />
                </span>
              ) : null}
              {t(p.titulo)}
            </h3>
            <p>{t(p.texto)}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

export function Reels() {
  const { lang, t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const desplazamientos = [
    useTransform(scrollYProgress, [0, 1], [60, -60]),
    useTransform(scrollYProgress, [0, 1], [140, -140]),
    useTransform(scrollYProgress, [0, 1], [30, -30]),
    useTransform(scrollYProgress, [0, 1], [110, -110]),
  ];

  return (
    <section ref={ref} className={`${s.section} ${s.oscura} ${s.reels}`}>
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
            <VideoVertical key={v.src} src={v.src} label={t(v.label)} y={desplazamientos[i]} indice={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoVertical({ src, label, y, indice }: { src: string; label: string; y: MotionValue<number>; indice: number }) {
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
      style={{ y }}
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
