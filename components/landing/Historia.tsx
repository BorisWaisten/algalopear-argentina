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
        <div className={s.historiaCollage}>
          <motion.figure
            className={s.historiaFoto}
            initial={{ clipPath: 'inset(100% 0% 0% 0% round 28px)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.3, ease: EASE }}
          >
            <Image src="/landing/forum-laila-mate.webp" alt="Laila sharing Al Galope yerba mate at the Santa Fe Business Forum" fill sizes="(max-width: 900px) 80vw, 34vw" />
          </motion.figure>

          <motion.figure
            className={s.historiaInset}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1, delay: 0.6, ease: EASE }}
          >
            <Image src="/landing/forum-productos.webp" alt="Al Galope yerba mate, mate and plush on display" fill sizes="(max-width: 900px) 60vw, 26vw" />
          </motion.figure>
        </div>

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
