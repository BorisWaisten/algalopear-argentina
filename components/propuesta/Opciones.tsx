'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';

import { EXTRAS, PLANES, PRECIOS, type Plan } from './data';
import s from './propuesta.module.css';
import { AnimatedNumber, EASE, Eyebrow, Reveal, Titulo, formatoARS } from './ui';

type Seleccion = Record<string, number>;

// Qué extras equivale cada plan dentro de la calculadora.
const PRESETS: Record<string, Seleccion> = {
  esencial: {},
  animada: { idioma: 1, slider: 1, animaciones: 1 },
  premium: { idioma: 1, slider: 1, animaciones: 1, efectos: 1 },
};

export function Opciones() {
  const [seleccion, setSeleccion] = useState<Seleccion>(PRESETS.animada);

  const elegirPlan = (plan: Plan) => {
    setSeleccion(PRESETS[plan.id]);
    document.getElementById('arma')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Planes onElegir={elegirPlan} />
      <Calculadora seleccion={seleccion} setSeleccion={setSeleccion} />
    </>
  );
}

function Planes({ onElegir }: { onElegir: (p: Plan) => void }) {
  return (
    <section id="opciones" className={`${s.section} ${s.sectionDark}`}>
      <div className={s.wrap}>
        <Eyebrow>04 · Las opciones</Eyebrow>
        <Titulo lineas={['Tres caminos.', 'Una misma identidad.']} className={s.h2} />
        <Reveal delay={0.2}>
          <p className={s.lead}>
            Los precios salen del presupuesto que ya te pasamos: base de {formatoARS(PRECIOS.base)} y{' '}
            {formatoARS(PRECIOS.funcionalidad)} por cada funcionalidad extra. No cambió nada; solo lo ordenamos en paquetes.
          </p>
        </Reveal>

        <motion.div
          className={s.planes}
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ staggerChildren: 0.14 }}
        >
          {PLANES.map((plan) => (
            <motion.article
              key={plan.id}
              className={`${s.plan} ${plan.destacado ? s.planDestacado : ''}`}
              variants={{ oculto: { opacity: 0, y: 60 }, visible: { opacity: 1, y: plan.destacado ? -12 : 0 } }}
              transition={{ duration: 0.9, ease: EASE }}
              whileHover={{ y: plan.destacado ? -20 : -8 }}
            >
              {plan.destacado && (
                <>
                  <PlanGlow />
                  <span className={s.planBadge}>Recomendada</span>
                </>
              )}
              <h3 className={`${s.display} ${s.planName}`}>{plan.nombre}</h3>
              <p className={s.planBajada}>{plan.bajada}</p>
              <div className={`${s.display} ${s.planPrecio}`}>
                <AnimatedNumber value={plan.precio} duracion={1.6} />
                <span className={s.planMoneda}>ARS</span>
              </div>
              <ul className={s.planLista}>
                {plan.incluye.map((item) => (
                  <li key={item}>
                    <span>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
                {plan.noIncluye?.map((item) => (
                  <li key={item} className={s.planNo}>
                    <span>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                type="button"
                className={`${s.btn} ${s.planBtn} ${plan.destacado ? s.btnOscuro : s.btnLinea}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onElegir(plan)}
              >
                Armar con este plan
              </motion.button>
            </motion.article>
          ))}
        </motion.div>

        <Reveal>
          <p className={s.planNota}>
            ¿Tienda online como Origen? Es otro proyecto. Lo explicamos más abajo, con una alternativa sin costo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Calculadora({ seleccion, setSeleccion }: { seleccion: Seleccion; setSeleccion: React.Dispatch<React.SetStateAction<Seleccion>> }) {
  const lineas = EXTRAS.filter((e) => (seleccion[e.id] ?? 0) > 0).map((e) => ({
    ...e,
    cant: seleccion[e.id],
    subtotal: e.precio * seleccion[e.id],
  }));
  const total = PRECIOS.base + lineas.reduce((acc, l) => acc + l.subtotal, 0);
  const presetActivo = Object.entries(PRESETS).find(([, p]) => mismaSeleccion(p, seleccion))?.[0];

  const cambiar = (id: string, cant: number) =>
    setSeleccion((prev) => {
      const next = { ...prev };
      if (cant <= 0) delete next[id];
      else next[id] = cant;
      return next;
    });

  return (
    <section id="arma" className={s.section}>
      <div className={s.wrap}>
        <Eyebrow>05 · Armá tu propuesta</Eyebrow>
        <Titulo lineas={['Sumá solo', 'lo que querés.']} className={s.h2} />
        <Reveal delay={0.2}>
          <p className={s.lead}>Partí de un plan o activá cada extra por separado. El total se actualiza al instante.</p>
        </Reveal>

        <div className={s.calc}>
          <Reveal>
            <div className={s.presets}>
              {PLANES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`${s.preset} ${presetActivo === p.id ? s.presetOn : ''}`}
                  onClick={() => setSeleccion(PRESETS[p.id])}
                >
                  {p.nombre}
                </button>
              ))}
            </div>
            <div className={s.extras}>
              <div className={`${s.extra} ${s.extraOn}`}>
                <span className={`${s.switch} ${s.switchOn}`} style={{ opacity: 0.5 }}>
                  <span className={s.knob} />
                </span>
                <span className={s.extraTxt}>
                  <strong>Landing base (5 secciones)</strong>
                  <small>Diseño con tu identidad, navegación y hasta 5 secciones. Siempre incluida.</small>
                </span>
                <span className={s.extraPrecio}>{formatoARS(PRECIOS.base)}</span>
              </div>

              {EXTRAS.map((e) => {
                const cant = seleccion[e.id] ?? 0;
                const on = cant > 0;
                const contenido = (
                  <>
                    {e.cantidad ? (
                      <span className={s.stepper}>
                        <button type="button" onClick={() => cambiar(e.id, cant - 1)} disabled={cant === 0} aria-label={`Quitar ${e.nombre}`}>
                          −
                        </button>
                        <output>{cant}</output>
                        <button type="button" onClick={() => cambiar(e.id, cant + 1)} disabled={cant >= 9} aria-label={`Agregar ${e.nombre}`}>
                          +
                        </button>
                      </span>
                    ) : (
                      <span className={`${s.switch} ${on ? s.switchOn : ''}`} aria-hidden>
                        <motion.span layout className={s.knob} transition={{ type: 'spring', stiffness: 600, damping: 32 }} />
                      </span>
                    )}
                    <span className={s.extraTxt}>
                      <strong>{e.nombre}</strong>
                      <small>{e.detalle}</small>
                    </span>
                    <span className={s.extraPrecio}>
                      {e.cantidad ? `${formatoARS(e.precio)} c/u` : `+ ${formatoARS(e.precio)}`}
                    </span>
                  </>
                );

                return e.cantidad ? (
                  <div key={e.id} className={`${s.extra} ${s.extraCantidad} ${on ? s.extraOn : ''}`}>
                    {contenido}
                  </div>
                ) : (
                  <motion.button
                    key={e.id}
                    type="button"
                    role="switch"
                    aria-checked={on}
                    className={`${s.extra} ${on ? s.extraOn : ''}`}
                    onClick={() => cambiar(e.id, on ? 0 : 1)}
                    whileTap={{ scale: 0.99 }}
                  >
                    {contenido}
                  </motion.button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.15} className={s.resumenWrap}>
            <aside className={s.resumen} aria-live="polite">
              <p className={s.resumenTitulo}>Tu propuesta</p>
              <ul className={s.resumenLineas}>
                <li className={s.resumenLinea}>
                  <span>Landing base</span>
                  <span>{formatoARS(PRECIOS.base)}</span>
                </li>
                <AnimatePresence initial={false}>
                  {lineas.map((l) => (
                    <motion.li
                      key={l.id}
                      className={s.resumenLinea}
                      initial={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', paddingTop: 9, paddingBottom: 9 }}
                      exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <span>
                        {l.nombre}
                        {l.cantidad ? ` × ${l.cant}` : ''}
                      </span>
                      <span>{formatoARS(l.subtotal)}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <div className={s.resumenTotal}>
                <span>Total</span>
                <strong className={s.display}>
                  <Contador value={total} />
                </strong>
              </div>
              <div className={s.resumenPago}>
                Anticipo al arrancar (50%): <strong><Contador value={total / 2} /></strong>
                <br />
                Al entregar (50%): <strong><Contador value={total / 2} /></strong>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// Borde con degradé que gira alrededor del plan recomendado.
function PlanGlow() {
  const angulo = useMotionValue(0);
  const fondo = useMotionTemplate`conic-gradient(from ${angulo}deg, var(--plata), var(--yerba), var(--plata-2), var(--plata))`;
  useEffect(() => {
    const c = animate(angulo, 360, { duration: 6, repeat: Infinity, ease: 'linear' });
    return () => c.stop();
  }, [angulo]);
  return <motion.span className={s.planGlow} style={{ background: fondo }} aria-hidden />;
}

// Número que anima entre valores cada vez que cambia.
function Contador({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const texto = useTransform(mv, formatoARS);
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.6, ease: EASE });
    return () => c.stop();
  }, [value, mv]);
  return <motion.span>{texto}</motion.span>;
}

function mismaSeleccion(a: Seleccion, b: Seleccion) {
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  return ka.length === kb.length && ka.every((k) => a[k] === b[k]);
}
