'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import { HISTORIA, PROCESO } from './content';
import s from './landing.module.css';
import { EASE, Eyebrow, Guarda, Reveal, Titulo, useLang } from './ui';

export function Historia() {
  const { lang, t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yGrande = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const yChica = useTransform(scrollYProgress, [0, 1], ['40%', '-40%']);
  const yTercera = useTransform(scrollYProgress, [0, 1], ['25%', '-25%']);

  return (
    <section id="nosotros" ref={ref} className={`${s.section} ${s.clara}`}>
      <div className={`${s.wrap} ${s.historia}`}>
        <div className={s.historiaFotos}>
          <motion.figure
            className={s.historiaFotoGrande}
            style={{ y: yGrande }}
            initial={{ clipPath: 'inset(100% 0% 0% 0% round 28px)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.4, ease: EASE }}
          >
            <Image src="/landing/laila-forum.webp" alt="Al Galope at the Santa Fe Business Forum" fill sizes="(max-width: 900px) 80vw, 34vw" />
            <figcaption>{t(HISTORIA.foro)}</figcaption>
          </motion.figure>
          <motion.figure
            className={s.historiaFotoChica}
            style={{ y: yChica }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
          >
            <Image src="/landing/stand-forum.webp" alt="" fill sizes="(max-width: 900px) 50vw, 20vw" />
          </motion.figure>
          <motion.figure
            className={s.historiaFotoTercera}
            style={{ y: yTercera }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: EASE }}
          >
            <Image src="/landing/mate-cataratas.webp" alt="" fill sizes="(max-width: 900px) 40vw, 14vw" />
          </motion.figure>
        </div>

        <div className={s.historiaTexto}>
          <Eyebrow>{t(HISTORIA.eyebrow)}</Eyebrow>
          <Titulo key={lang} className={`${s.display} ${s.h2}`} lineas={HISTORIA.titulo[lang]} />
          {HISTORIA.parrafos[lang].map((p, i) => (
            <Reveal key={`${lang}-${i}`} as="p" delay={0.15 + i * 0.1} className={s.parrafo}>
              {p}
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <blockquote className={s.cita}>
              <span className={`${s.display} ${s.citaMarca}`}>“</span>
              {t(HISTORIA.cita)}
            </blockquote>
          </Reveal>
          <motion.dl
            className={s.datos}
            initial="oculto"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.12, delayChildren: 0.3 }}
          >
            {HISTORIA.datos.map((d) => (
              <motion.div key={d.valor} variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.7, ease: EASE }}>
                <dt className={`${s.display} ${s.plataOscura}`}>{d.valor}</dt>
                <dd>{t(d.label)}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}

export function Proceso() {
  const { lang, t } = useLang();
  const lista = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: lista, offset: ['start 70%', 'end 60%'] });
  const progreso = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className={`${s.section} ${s.oscura} ${s.proceso}`}>
      <div className={`${s.wrap} ${s.procesoGrid}`}>
        <div className={s.procesoIntro}>
          <Eyebrow claro>{t(PROCESO.eyebrow)}</Eyebrow>
          <Titulo key={lang} className={`${s.display} ${s.h2}`} lineas={PROCESO.titulo[lang]} />
          <Reveal delay={0.2}>
            <p className={s.lead}>{t(PROCESO.texto)}</p>
          </Reveal>

          <Reveal delay={0.3} className={s.molienda}>
            <p className={s.moliendaTitulo}>{t(PROCESO.molienda.titulo)}</p>
            <div className={s.moliendaBarra}>
              {PROCESO.molienda.partes.map((p, i) => (
                <motion.span
                  key={p.valor}
                  className={s[`molienda${i}` as keyof typeof s]}
                  initial={{ width: '0%' }}
                  whileInView={{ width: `${p.valor}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.15, ease: EASE }}
                />
              ))}
            </div>
            <ul className={s.moliendaLeyenda}>
              {PROCESO.molienda.partes.map((p, i) => (
                <li key={p.valor}>
                  <i className={s[`molienda${i}` as keyof typeof s]} />
                  <strong>{p.valor}%</strong> {t(p.label)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <ol ref={lista} className={s.pasos}>
          <span className={s.pasosLinea} aria-hidden>
            <motion.span style={{ scaleY: progreso }} />
          </span>
          {PROCESO.pasos.map((p, i) => (
            <motion.li
              key={i}
              className={s.paso}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className={s.pasoNumero}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className={s.display}>{t(p.titulo)}</h3>
                <p>{t(p.texto)}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
      <div className={s.wrap}>
        <Guarda className={s.guardaTenue} />
      </div>
    </section>
  );
}
