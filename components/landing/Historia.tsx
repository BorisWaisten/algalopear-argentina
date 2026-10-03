'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { HISTORIA } from './content';
import s from './landing.module.css';
import { EASE, Eyebrow, Reveal, Titulo, useLang } from './ui';

export function Historia() {
  const { lang, t } = useLang();

  return (
    <section id="nosotros" className={`${s.section} ${s.clara}`}>
      <div className={`${s.wrap} ${s.historia}`}>
        <motion.figure
          className={s.historiaFoto}
          initial={{ clipPath: 'inset(100% 0% 0% 0% round 28px)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <Image src="/landing/laila-forum.webp" alt="Al Galope at the Santa Fe Business Forum" fill sizes="(max-width: 900px) 90vw, 40vw" />
          <figcaption>{t(HISTORIA.foro)}</figcaption>
        </motion.figure>

        <div>
          <Eyebrow>{t(HISTORIA.eyebrow)}</Eyebrow>
          <Titulo key={lang} className={`${s.display} ${s.h2}`} lineas={HISTORIA.titulo[lang]} />
          {HISTORIA.parrafos[lang].map((p, i) => (
            <Reveal key={`${lang}-${i}`} as="p" delay={0.15 + i * 0.1} className={s.parrafo}>
              {p}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
