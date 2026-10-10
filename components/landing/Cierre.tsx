'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { CONTACTO, CONTACTO_TXT, UI } from './content';
import s from './landing.module.css';
import { Bandera, EASE, Eyebrow, Guarda, Icono, Reveal, Titulo, navHref, useLang, whatsappHref } from './ui';

export function Contacto() {
  const { lang, t } = useLang();
  const canales = [
    { icono: 'whatsapp', label: CONTACTO.whatsappLabel, href: whatsappHref(lang === 'en' ? 'Hi Al Galope!' : '¡Hola Al Galope!') },
    { icono: 'instagram', label: `@${CONTACTO.instagram}`, href: `https://instagram.com/${CONTACTO.instagram}` },
    { icono: 'mail', label: CONTACTO.email.replace('@', '@\u200B'), href: `mailto:${CONTACTO.email}` },
    { icono: 'pin', label: t(CONTACTO.ciudad) },
  ];

  return (
    <section id="contacto" className={`${s.section} ${s.oscura} ${s.contacto}`}>
      <div className={s.contactoFondo}>
        <Image src="/landing/catalogo-portada.webp" alt="" fill sizes="100vw" />
      </div>
      <div className={`${s.wrap} ${s.contactoGrid}`}>
        <div>
          <Eyebrow claro>{t(CONTACTO_TXT.eyebrow)}</Eyebrow>
          <Titulo key={lang} className={`${s.display} ${s.h2}`} lineas={CONTACTO_TXT.titulo[lang]} />
          <Reveal delay={0.2}>
            <p className={s.lead}>{t(CONTACTO_TXT.texto)}</p>
          </Reveal>
        </div>
        <motion.ul
          className={s.canales}
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          {canales.map((c) => {
            const contenido = (
              <>
                <span className={s.canalIcono}>
                  <Icono nombre={c.icono} size={20} />
                </span>
                <span>{c.label}</span>
                {c.href && <Icono nombre="flecha" size={18} className={s.canalFlecha} />}
              </>
            );
            return (
              <motion.li key={c.icono} variants={{ oculto: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: 0.7, ease: EASE }}>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noreferrer" className={s.canal}>
                    {contenido}
                  </a>
                ) : (
                  <span className={s.canal}>{contenido}</span>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

export function Footer() {
  const { lang, t } = useLang();
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <Guarda className={s.guardaTenue} />
        <div className={s.footerGrid}>
          <div className={s.footerMarca}>
            <span className={s.footerLogo}>
              <Image src="/landing/logo.png" alt="Al Galope" fill sizes="72px" />
            </span>
            <div>
              <strong className={`${s.display} ${s.plata}`}>Al Galope</strong>
              <span>Yerba Mate · {t(CONTACTO_TXT.hecho)} <Bandera pais="ar" /></span>
            </div>
          </div>
          <nav className={s.footerNav}>
            {UI.nav.map((n) => (
              <a key={n.id} {...navHref(n, lang)}>
                {t(n.label)}
              </a>
            ))}
          </nav>
          <div className={s.footerRedes}>
            <a href={`https://instagram.com/${CONTACTO.instagram}`} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Icono nombre="instagram" />
            </a>
            <a href={whatsappHref('')} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <Icono nombre="whatsapp" />
            </a>
            <a href={`mailto:${CONTACTO.email}`} aria-label="Email">
              <Icono nombre="mail" />
            </a>
          </div>
        </div>
        <div className={s.footerLegal}>
          <span>© {new Date().getFullYear()} Al Galope Yerba Mate · {CONTACTO.web}</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFlotante() {
  const { lang } = useLang();
  return (
    <>
      <motion.a
        href={whatsappHref(lang === 'en' ? 'Hi Al Galope!' : '¡Hola Al Galope!')}
        target="_blank"
        rel="noreferrer"
        className={s.wsp}
        aria-label="WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.span className={s.wspOnda} animate={{ scale: [1, 1.7], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        <Icono nombre="whatsapp" size={28} />
      </motion.a>
    </>
  );
}
