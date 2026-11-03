import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'G. Pullaiah College of Engineering & Technology (GPCET) - Autonomous',
    template: '%s | GPCET Kurnool',
  },
  description:
    'G. Pullaiah College of Engineering & Technology (GPCET), Kurnool. NAAC A+ Accredited Autonomous Engineering Institution affiliated with JNTU Anantapur.',
  keywords: [
    'GPCET',
    'G. Pullaiah College of Engineering and Technology',
    'Kurnool Engineering College',
    'Autonomous Engineering College',
    'NAAC A+',
    'NBA Accredited',
  ],
  authors: [{ name: 'GPCET Institutional Web Council' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0C2340',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased">
        {children}
      </body>
    </html>
  );
}
