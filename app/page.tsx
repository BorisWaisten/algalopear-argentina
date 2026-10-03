import type { Metadata } from 'next';
import { Inter, Oswald, Playfair_Display } from 'next/font/google';

import { Landing } from '@/components/landing/Landing';

const display = Playfair_Display({ subsets: ['latin'], weight: ['500', '600', '700'], style: ['normal', 'italic'], variable: '--font-display' });
const etiqueta = Oswald({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-label' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Al Galope Yerba Mate | Argentine Yerba Mate from Misiones',
  description: 'Tradition, natural aging and export-grade quality, for the most demanding palates. Yerba mate from Misiones, Argentina.',
  // Borrador: no indexar hasta publicar.
  robots: { index: false, follow: false },
};

export default function Home() {
  return <Landing fontClassName={`${display.variable} ${etiqueta.variable} ${sans.variable}`} />;
}
