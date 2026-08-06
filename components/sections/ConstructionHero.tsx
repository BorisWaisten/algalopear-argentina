'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const contactLinks = [
  {
    label: '+54 9 11 3524-1987',
    href: 'https://wa.me/5491135241987',
    icon: <WhatsappIcon />,
  },
  {
    label: '@algalope.argentina',
    href: 'https://instagram.com/algalope.argentina',
    icon: <InstagramIcon />,
  },
  {
    label: 'trade@algalopeargentina.com',
    href: 'mailto:trade@algalopeargentina.com',
    icon: <MailIcon />,
  },
];

export function ConstructionHero() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-intro"
        >
          <p className="eyebrow">Próximamente</p>
          <h1>Estamos trabajando en una nueva experiencia.</h1>
          <p className="hero-subcopy">
            Mientras tanto, conocé a Al-Galope y escribinos por cualquiera de estos medios.
          </p>
        </motion.div>

        <div className="hero-details">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="brand-visual"
          >
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="brand-frame">
              <Image
                src="/algalopear.jpeg"
                alt="Al-Galope – yerba mate tradicional estacionada, con palo, sin gluten"
                fill
                className="brand-image"
                priority
              />
              <div className="construction-caption">
                <span>En construcción</span>
                <strong>Pronto llega algo increíble</strong>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="contact-panel"
          >
            <p className="tagline-quote">
              “Naturally Aged Traditional Yerba Mate with Stems. Gluten-Free.”
            </p>

            <ul className="contact-list">
              {contactLinks.map((item) => (
                <li key={item.label} className="contact-item">
                  <a href={item.href} target="_blank" rel="noreferrer">
                    <span className="contact-icon">{item.icon}</span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="contact-item">
                <span className="static">
                  <span className="contact-icon">
                    <PinIcon />
                  </span>
                  Buenos Aires, Argentina
                </span>
              </li>
            </ul>

            <div className="made-in-badge">Hecho en Argentina 🇦🇷</div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function WhatsappIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="2.5" width="19" height="19" rx="6" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
