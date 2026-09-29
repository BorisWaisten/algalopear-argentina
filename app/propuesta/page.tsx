import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

import { Propuesta } from '@/components/propuesta/Propuesta';

const display = Playfair_Display({ subsets: ['latin'], weight: ['500', '600', '700'], style: ['normal', 'italic'], variable: '--font-display' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Al Galope | Propuesta web',
  description: 'Opciones y extras para la página de Al Galope Yerba Mate.',
  robots: { index: false, follow: false },
};

export default function PropuestaPage() {
  return <Propuesta fontClassName={`${display.variable} ${sans.variable}`} />;
}
