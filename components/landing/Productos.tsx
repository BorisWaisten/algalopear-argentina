'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';

import { CATEGORIAS, UI, type Producto } from './content';
import s from './landing.module.css';
import { EASE, Eyebrow, Icono, Reveal, Titulo, comprarHref, useLang } from './ui';

const TITULO = {
  eyebrow: { en: 'Our products', es: 'Nuestros productos' },
  lineas: { en: ['Made for every', 'kind of mate.'], es: ['Hechos para cada', 'forma de matear.'] },
};

export function Productos() {
  const { lang, t } = useLang();
  let indice = 0;

  return (
    <section id="productos" className={`${s.section} ${s.clara} ${s.productos}`}>
      <div className={s.wrap}>
        <div className={s.productosCabecera}>
          <div>
            <Eyebrow>{t(TITULO.eyebrow)}</Eyebrow>
            <Titulo key={lang} className={`${s.display} ${s.h2}`} lineas={TITULO.lineas[lang]} />
          </div>
          <Reveal delay={0.2} className={s.categoriasNav}>
            {CATEGORIAS.map((c) => (
              <a key={c.id} href={`#cat-${c.id}`}>
                {t(c.titulo)}
                <span>{c.productos.length}</span>
              </a>
            ))}
          </Reveal>
        </div>

        {CATEGORIAS.map((cat) => (
          <div key={cat.id} id={`cat-${cat.id}`} className={s.categoria}>
            <div className={s.categoriaTitulo}>
              <Reveal y={16}>
                <h3 className={s.display}>{t(cat.titulo)}</h3>
              </Reveal>
              <Reveal y={16} delay={0.1}>
                <p>{t(cat.bajada)}</p>
              </Reveal>
              <motion.span
                className={s.categoriaLinea}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE }}
              />
            </div>
            {cat.productos.map((p) => {
              indice += 1;
              return <FilaProducto key={p.id} producto={p} numero={indice} invertida={indice % 2 === 0} />;
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

function FilaProducto({ producto: p, numero, invertida }: { producto: Producto; numero: number; invertida: boolean }) {
  const { lang, t } = useLang();
  const [variante, setVariante] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 140, damping: 16 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 140, damping: 16 });

  const nombre = `${t(p.nombre)}${p.detalle ? ` ${t(p.detalle)}` : ''}`;
  const img = p.imagenes[variante];

  return (
    <article ref={ref} className={`${s.producto} ${invertida ? s.productoInvertido : ''}`}>
      <motion.div
        className={`${s.productoMedia} ${s[`fondo_${p.fondo}` as keyof typeof s]}`}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 1, ease: EASE }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
      >
        <span className={`${s.display} ${s.productoNumero}`}>{String(numero).padStart(2, '0')}</span>
        <motion.div className={s.productoImg} style={p.fondo === 'foto' ? { y: imgY } : { rotateX: rotX, rotateY: rotY }}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={img.src}
              className={s.productoImgCapa}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Image src={img.src} alt={nombre} fill sizes="(max-width: 900px) 90vw, 46vw" />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        {p.imagenes.length > 1 && (
          <div className={s.variantes} role="group" aria-label="Color">
            {p.imagenes.map((v, i) => (
              <button key={v.src} type="button" onClick={() => setVariante(i)} aria-pressed={variante === i} className={variante === i ? s.varianteOn : ''}>
                <i className={s[`variante${i}` as keyof typeof s]} />
                {v.label && t(v.label)}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      <div className={s.productoInfo}>
        <Reveal y={20}>
          <h4 className={`${s.display} ${s.productoNombre}`}>
            {t(p.nombre)}
            {p.detalle && <span className={s.productoDetalle}>{t(p.detalle)}</span>}
          </h4>
        </Reveal>
        {p.chips && (
          <Reveal y={12} delay={0.05} className={s.chips}>
            {p.chips.map((c) => (
              <span key={c.en}>{t(c)}</span>
            ))}
          </Reveal>
        )}
        <Reveal as="p" y={16} delay={0.1} className={s.productoDesc}>
          {t(p.descripcion)}
        </Reveal>
        <motion.dl
          className={s.specs}
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ staggerChildren: 0.06, delayChildren: 0.15 }}
        >
          {p.specs.map((sp) => (
            <motion.div key={sp.label.en} variants={{ oculto: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.6, ease: EASE }}>
              <span className={s.specIcono}>
                <Icono nombre={sp.icono} size={18} />
              </span>
              <dt>{t(sp.label)}</dt>
              <dd>{t(sp.valor)}</dd>
            </motion.div>
          ))}
        </motion.dl>
        <Reveal y={16} delay={0.25}>
          <motion.a
            href={comprarHref(lang, nombre)}
            target="_blank"
            rel="noreferrer"
            className={`${s.btn} ${s.btnOscuro}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Icono nombre="bolsa" size={18} />
            {t(UI.comprarProducto)} {nombre}
          </motion.a>
        </Reveal>
      </div>
    </article>
  );
}
