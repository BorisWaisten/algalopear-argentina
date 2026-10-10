
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Al Galope Yerba Mate',
  description: 'Yerba mate from Misiones, Argentina.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
