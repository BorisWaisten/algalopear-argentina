'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';

import { ACCESORIOS, ACCESORIOS_TXT, CERTIFICACIONES, UI, YERBA, type Producto } from './content';
import s from './landing.module.css';
import { Caballos, EASE, Eyebrow, Icono, Reveal, Titulo, comprarHref, useLang } from './ui';

const TITULO = {
  eyebrow: { en: 'Our products', es: 'Nuestros productos' },
  lineas: { en: ['Made for every', 'kind of mate.'], es: ['Hechos para cada', 'forma de matear.'] },
};

export function Productos() {
  const { lang, t } = useLang();

  return (
    <section id="productos" className={`${s.section} ${s.clara} ${s.productos}`}>
      <div className={s.wrap}>
        <div className={s.productosCabecera}>
          <div>
            <Eyebrow>{t(TITULO.eyebrow)}</Eyebrow>
            <Titulo key={lang} className={`${s.display} ${s.h2}`} lineas={TITULO.lineas[lang]} />
          </div>
        </div>

        <div id="cat-yerba" className={s.categoria}>
          <PortadaCategoria titulo={t(YERBA.titulo)} bajada={t(YERBA.bajada)} imagen={YERBA.portada} />
          <FilaProducto producto={YERBA.productos[0]} />
          <Certificaciones />
        </div>
      </div>

      <Accesorios />
    </section>
  );
}

function FilaProducto({ producto: p }: { producto: Producto }) {
  const { lang, t } = useLang();
  const [variante, setVariante] = useState(0);
  const [tamano, setTamano] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 140, damping: 16 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 140, damping: 16 });

  const detalle = p.tamanos ? p.tamanos[tamano] : p.detalle;
  const nombre = `${t(p.nombre)}${detalle ? ` ${t(detalle)}` : ''}`;
  const img = p.imagenes[variante];

  return (
    <article ref={ref} className={s.producto}>
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
        {p.tamanos && (
          <Reveal y={12} delay={0.05} className={s.tamanos}>
            <span>{lang === 'en' ? 'Size' : 'Tamaño'}</span>
            <div role="group" aria-label={lang === 'en' ? 'Size' : 'Tamaño'}>
              {p.tamanos.map((tm, i) => (
                <button key={tm.en} type="button" onClick={() => setTamano(i)} aria-pressed={tamano === i} className={tamano === i ? s.tamanoOn : ''}>
                  {tamano === i && <motion.span layoutId={`tamano-${p.id}`} className={s.tamanoPill} transition={{ type: 'spring', stiffness: 500, damping: 34 }} />}
                  <span>{t(tm)}</span>
                </button>
              ))}
            </div>
          </Reveal>
        )}
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
        {p.perfil && (
          <div className={s.perfil}>
            {p.perfil.map((pf, i) => (
              <div key={pf.label.en} className={s.perfilFila}>
                <span className={s.perfilLabel}>{t(pf.label)}</span>
                <span className={s.perfilNiveles} aria-hidden>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <motion.i
                      key={n}
                      className={n <= pf.nivel ? s.perfilOn : ''}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1 + n * 0.06, ease: EASE }}
                    />
                  ))}
                </span>
                <strong className={s.perfilValor}>{t(pf.valor)}</strong>
              </div>
            ))}
          </div>
        )}
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

function Certificaciones() {
  const { t } = useLang();
  return (
    <div className={s.certs}>
      <div>
        <p className={s.certsEyebrow}>{t(CERTIFICACIONES.eyebrow)}</p>
        <h4 className={`${s.display} ${s.certsTitulo}`}>{t(CERTIFICACIONES.titulo)}</h4>
      </div>
      <motion.ul
        className={s.certsLista}
        initial="oculto"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ staggerChildren: 0.15 }}
      >
        {CERTIFICACIONES.items.map((c) => (
          <motion.li
            key={c.src}
            variants={{ oculto: { opacity: 0, scale: 0.5, rotate: -20 }, visible: { opacity: 1, scale: 1, rotate: 0 } }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            whileHover={{ y: -6, rotate: 4 }}
          >
            <span className={s.certImg}>
              <Image src={c.src} alt={t(c.label)} fill sizes="110px" />
            </span>
            {t(c.label)}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

// Portada de categoría al estilo del catálogo: foto, título en mayúsculas y los caballitos.
function PortadaCategoria({ titulo, bajada, imagen }: { titulo: string; bajada: string; imagen: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  return (
    <motion.div
      ref={ref}
      className={s.portada}
      initial={{ clipPath: 'inset(8% 4% 8% 4% round 32px)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 32px)', opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <motion.div className={s.portadaImg} style={{ y }}>
        <Image src={imagen} alt="" fill sizes="(max-width: 1240px) 100vw, 1180px" />
      </motion.div>
      <div className={s.portadaVelo} />
      <div className={s.portadaTexto}>
        <h3 className={s.portadaTitulo}>{titulo}</h3>
        <Caballos duracion={10} className={s.portadaCaballos} />
        <p>{bajada}</p>
      </div>
    </motion.div>
  );
}

// Carrusel de mates y peluches, con texto a la izquierda y una foto a la derecha.
function Accesorios() {
  const { lang, t } = useLang();
  const pista = useRef<HTMLDivElement>(null);
  const [bordes, setBordes] = useState({ inicio: true, fin: false });

  const mover = (dir: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const tarjeta = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * (tarjeta?.offsetWidth ?? 300), behavior: 'smooth' });
  };

  const alScrollear = () => {
    const el = pista.current;
    if (!el) return;
    setBordes({ inicio: el.scrollLeft < 8, fin: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };

  return (
    <div id="cat-mates" className={s.accesorios}>
      <div className={s.accesoriosTexto}>
        <Eyebrow>{t(ACCESORIOS_TXT.eyebrow)}</Eyebrow>
        <Titulo key={lang} className={s.accesoriosTitulo} lineas={ACCESORIOS_TXT.titulo[lang]} />
        <Reveal as="p" delay={0.1} className={s.accesoriosDestacado}>
          {t(ACCESORIOS_TXT.destacado)}
        </Reveal>
        <Reveal as="p" delay={0.15} className={s.accesoriosParrafo}>
          {t(ACCESORIOS_TXT.texto)}
        </Reveal>
        <Reveal delay={0.2}>
          <p className={s.accesoriosFrase}>
            {ACCESORIOS_TXT.frase[lang].map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
        </Reveal>
        <Reveal delay={0.25} className={s.accesoriosLinks}>
          <a href="#cat-yerba">
            {t(ACCESORIOS_TXT.verYerba)} <Icono nombre="flecha" size={18} />
          </a>
          <a href={comprarHref(lang)} target="_blank" rel="noreferrer">
            {t(UI.comprar)} <Icono nombre="flecha" size={18} />
          </a>
        </Reveal>
      </div>

      <div className={s.carrusel}>
        <button type="button" className={`${s.flecha} ${s.flechaIzq}`} onClick={() => mover(-1)} disabled={bordes.inicio} aria-label="Anterior">
          <Icono nombre="flecha" size={22} />
        </button>
        <div ref={pista} className={s.carruselPista} onScroll={alScrollear}>
          {ACCESORIOS.map((p, i) => {
            const nombre = `${t(p.nombre)}${p.detalle ? ` ${t(p.detalle)}` : ''}`;
            return (
              <motion.article
                key={p.id}
                className={s.tarjeta}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: EASE }}
              >
                <motion.div className={s.tarjetaImg} whileHover={{ scale: 1.06, rotate: -2 }} transition={{ type: 'spring', stiffness: 200, damping: 16 }}>
                  <Image src={p.imagenes[0].src} alt={nombre} fill sizes="(max-width: 700px) 70vw, 260px" />
                </motion.div>
                <h4 className={s.tarjetaNombre}>{t(p.nombre)}</h4>
                {p.detalle && <p className={s.tarjetaDetalle}>{t(p.detalle)}</p>}
                <a className={s.tarjetaComprar} href={comprarHref(lang, nombre)} target="_blank" rel="noreferrer">
                  {t(UI.comprarProducto)}
                </a>
              </motion.article>
            );
          })}
        </div>
        <button type="button" className={`${s.flecha} ${s.flechaDer}`} onClick={() => mover(1)} disabled={bordes.fin} aria-label="Siguiente">
          <Icono nombre="flecha" size={22} />
        </button>
      </div>

      {/* La detección la hace el figure; el recorte va adentro para que no quede con área visible cero. */}
      <motion.figure className={s.accesoriosFoto} initial="oculto" whileInView="visible" viewport={{ once: true, margin: '-10% 0px' }}>
        <motion.div
          className={s.accesoriosFotoImg}
          variants={{ oculto: { clipPath: 'inset(0% 0% 0% 100%)' }, visible: { clipPath: 'inset(0% 0% 0% 0%)' } }}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <Image src="/landing/peluche-nene.webp" alt="" fill sizes="(max-width: 1100px) 100vw, 28vw" />
        </motion.div>
      </motion.figure>
    </div>
  );
}
