import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Algalope Argentina | En construcción',
  description: 'Landing page en construcción con una identidad moderna y animaciones suaves.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
