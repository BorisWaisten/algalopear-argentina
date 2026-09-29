'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { ESTUDIO, PENDIENTES, PRECIOS } from './data';
import s from './propuesta.module.css';
import { EASE, Eyebrow, GuardaPampa, Reveal, Titulo, formatoARS } from './ui';

export function Tienda() {
  return (
    <section className={s.section} style={{ paddingTop: 0 }}>
      <div className={s.wrap}>
        <Eyebrow>06 · Sobre la tienda</Eyebrow>
        <Titulo lineas={['Landing o tienda:', 'dos proyectos distintos.']} className={s.h2} />

        <div className={s.tienda}>
          <Reveal>
            <div className={s.tiendaCol}>
              <h3 className={s.display}>Landing</h3>
              <p>Lo que confirmamos · estilo Cósmico</p>
              <ul>
                <li>Una sola página con secciones</li>
                <li>Presenta la marca y los productos</li>
                <li>Las consultas y ventas llegan por WhatsApp o mail</li>
                <li>Lista en pocas semanas</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className={`${s.tiendaCol} ${s.tiendaAparte}`}>
              <h3 className={s.display}>Tienda online</h3>
              <p>Como Yerba Mate Origen · presupuesto aparte</p>
              <ul>
                <li>Varias páginas, carrito y checkout</li>
                <li>Cobros con Mercado Pago o tarjeta</li>
                <li>Stock, precios, envíos y promociones</li>
                <li>Mantenimiento mensual</li>
              </ul>
            </div>
          </Reveal>
          <Reveal className={s.puente} delay={0.2}>
            <p>
              <strong>Alternativa sin costo extra:</strong> cada producto lleva un botón &quot;Comprar&quot; que abre WhatsApp con
              el producto ya escrito, o que lleva a tu Mercado Libre o Tiendanube. Vendés desde el día uno y la tienda puede
              llegar después.
            </p>
            <motion.span
              className={s.chipCompra}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              Comprar por WhatsApp
            </motion.span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Pendientes() {
  const [hechos, setHechos] = useState<Set<number>>(new Set());
  const alternar = (i: number) =>
    setHechos((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section className={`${s.section} ${s.sectionDark}`}>
      <div className={s.wrap}>
        <Eyebrow>07 · Para arrancar</Eyebrow>
        <Titulo lineas={['Lo que necesitamos', 'de tu lado.']} className={s.h2} />
        <Reveal delay={0.2}>
          <p className={s.lead}>Tocá cada punto a medida que lo resolvamos en la reunión.</p>
        </Reveal>

        <motion.ul
          className={s.pendientes}
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ staggerChildren: 0.07 }}
        >
          {PENDIENTES.map((p, i) => {
            const hecho = hechos.has(i);
            return (
              <motion.li key={p} variants={{ oculto: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.6, ease: EASE }}>
                <button type="button" className={`${s.pendiente} ${hecho ? s.pendienteHecho : ''}`} onClick={() => alternar(i)} aria-pressed={hecho}>
                  <span className={s.check}>
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                      <motion.path
                        d="M2 7.5 5.5 11 12 3"
                        fill="none"
                        stroke="#15241f"
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={false}
                        animate={{ pathLength: hecho ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </svg>
                  </span>
                  {p}
                </button>
              </motion.li>
            );
          })}
        </motion.ul>

        <div className={s.cierre} style={{ marginTop: 90 }}>
          <div>
            <Eyebrow>Forma de pago</Eyebrow>
            <Titulo lineas={['Dos pagos.', 'El primero, listo.']} className={s.h2} />
            <div className={s.pagos}>
              <Reveal>
                <div className={s.pago}>
                  <strong>50% ✓</strong>
                  <span>abonado al arrancar ({formatoARS(PRECIOS.abonado)})</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className={s.pago}>
                  <strong>50%</strong>
                  <span>al entregar, más las mejoras que sumes</span>
                </div>
              </Reveal>
            </div>
          </div>
          <Reveal delay={0.2}>
            <div className={s.firma}>
              Propuesta preparada por
              <strong>{ESTUDIO.nombre}</strong>
              {ESTUDIO.rol}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <GuardaPampa />
        <div className={s.footerRow}>
          <span>Todo lo que se mueve en esta página se puede hacer en la tuya.</span>
          <span>Al Galope Yerba Mate · Misiones, Argentina</span>
        </div>
      </div>
    </footer>
  );
}
