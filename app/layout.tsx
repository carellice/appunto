import type { Metadata, Viewport } from 'next';
import './globals.css';
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };
export const metadata: Metadata = {
  title: 'Appunto — La tua prossima app per Mac',
  description: '24 applicazioni Mac selezionate personalmente. Piccoli strumenti utili, curati e piacevoli da usare.',
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="it"><head><meta httpEquiv="Cache-Control" content="no-store, no-cache, must-revalidate, proxy-revalidate"/><meta httpEquiv="Pragma" content="no-cache"/><meta httpEquiv="Expires" content="0"/></head><body>{children}</body></html>;
}
