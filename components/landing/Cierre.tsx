'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { CERTIFICACIONES, CONTACTO, CONTACTO_TXT, TIENDA, TIENDA_URL, UI } from './content';
import s from './landing.module.css';
import { Caballos, EASE, Eyebrow, Guarda, Icono, Reveal, Titulo, comprarHref, useLang, whatsappHref } from './ui';

export function Certificaciones() {
  const { t } = useLang();
  return (
    <section className={s.certs}>
      <div className={`${s.wrap} ${s.certsFila}`}>
        <div>
          <Eyebrow>{t(CERTIFICACIONES.eyebrow)}</Eyebrow>
          <Reveal y={16}>
            <h2 className={`${s.display} ${s.certsTitulo}`}>{t(CERTIFICACIONES.titulo)}</h2>
          </Reveal>
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
    </section>
  );
}

export function Tienda() {
  const { lang, t } = useLang();
  return (
    <section id="tienda" className={`${s.section} ${s.tienda}`}>
      <div className={s.tiendaFondo}>
        <Image src="/landing/lifestyle-rio.webp" alt="" fill sizes="100vw" />
      </div>
      <div className={s.tiendaVelo} />
      <div className={`${s.wrap} ${s.tiendaContenido}`}>
        <Eyebrow claro>{t(TIENDA.eyebrow)}</Eyebrow>
        <Titulo key={lang} className={`${s.display} ${s.h2} ${s.tiendaTitulo}`} lineas={TIENDA.titulo[lang]} />
        <Reveal delay={0.2}>
          <p className={s.lead}>{t(TIENDA.texto)}</p>
        </Reveal>
        <Reveal delay={0.3} className={s.tiendaCtas}>
          <motion.a
            href={comprarHref(lang)}
            target="_blank"
            rel="noreferrer"
            className={`${s.btn} ${s.btnPlata} ${s.btnGrande}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Icono nombre={TIENDA_URL ? 'bolsa' : 'whatsapp'} size={18} />
            {lang === 'en' ? 'Buy your Al Galope products' : 'Comprá tus productos Al Galope'}
            <span className={s.btnBrillo} />
          </motion.a>
          {!TIENDA_URL && <span className={s.tiendaPronto}>{lang === 'en' ? 'Online store · coming soon' : 'Tienda online · próximamente'}</span>}
        </Reveal>
      </div>
      <Caballos duracion={12} className={s.tiendaCaballos} />
    </section>
  );
}

export function Contacto() {
  const { lang, t } = useLang();
  const canales = [
    { icono: 'whatsapp', label: CONTACTO.whatsappLabel, href: whatsappHref(lang === 'en' ? 'Hi Al Galope!' : '¡Hola Al Galope!') },
    { icono: 'instagram', label: `@${CONTACTO.instagram}`, href: `https://instagram.com/${CONTACTO.instagram}` },
    { icono: 'mail', label: CONTACTO.email, href: `mailto:${CONTACTO.email}` },
    { icono: 'pin', label: t(CONTACTO.ciudad) },
  ];

  return (
    <section id="contacto" className={`${s.section} ${s.oscura} ${s.contacto}`}>
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
  const { t } = useLang();
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
              <span>Yerba Mate · {t(CONTACTO_TXT.hecho)} 🇦🇷</span>
            </div>
          </div>
          <nav className={s.footerNav}>
            {UI.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
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
  const { lang, t } = useLang();
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
      <span className={s.borrador}>{t(UI.borrador)}</span>
    </>
  );
}
