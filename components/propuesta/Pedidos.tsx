'use client';

import { motion } from 'framer-motion';

import { PEDIDOS } from './data';
import s from './propuesta.module.css';
import { EASE, Eyebrow, Reveal, Titulo } from './ui';

export function Pedidos() {
  return (
    <section className={s.section}>
      <div className={s.wrap}>
        <div className={s.headRow}>
          <div>
            <Eyebrow>01 · Lo que nos pediste</Eyebrow>
            <Titulo lineas={['Tu documento,', 'punto por punto.']} className={s.h2} />
            <Reveal delay={0.2}>
              <p className={s.lead}>
                La página de referencia, Yerba Mate Origen, es una tienda online con varias páginas. Lo que cotizamos es una
                landing del estilo de Cósmico. Te mostramos qué entra en la base y qué suma.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.3} className={s.legend}>
            <span>
              <i className={`${s.mark} ${s.markOk}`}>✓</i> Entra en la base
            </span>
            <span>
              <i className={`${s.mark} ${s.markExtra}`}>+</i> Es un extra
            </span>
          </Reveal>
        </div>

        <motion.ul
          className={s.pedidos}
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ staggerChildren: 0.06 }}
        >
          {PEDIDOS.map((p) => (
            <motion.li
              key={p.texto}
              className={`${s.pedido} ${p.entra ? '' : s.pedidoExtra}`}
              variants={{ oculto: { opacity: 0, y: 24, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1 } }}
              transition={{ duration: 0.6, ease: EASE }}
              whileHover={{ y: -3 }}
            >
              <motion.i
                className={`${s.mark} ${p.entra ? s.markOk : s.markExtra}`}
                variants={{ oculto: { scale: 0, rotate: -90 }, visible: { scale: 1, rotate: 0 } }}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}
              >
                {p.entra ? '✓' : '+'}
              </motion.i>
              {p.texto}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
