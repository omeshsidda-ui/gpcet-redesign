import type { Metadata, Viewport } from 'next';
import { Newsreader, Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import TopInstitutionalBar from '@/components/global/TopInstitutionalBar';
import InstitutionalNavbar from '@/components/global/InstitutionalNavbar';
import InstitutionalFooter from '@/components/global/InstitutionalFooter';
import GlobalSearchModal from '@/components/global/GlobalSearchModal';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'G. Pullaiah College of Engineering & Technology (GPCET) - Autonomous',
    template: '%s | GPCET Kurnool',
  },
  description:
    'G. Pullaiah College of Engineering & Technology (GPCET), Kurnool. NAAC A+ Accredited Autonomous Engineering Institution affiliated with JNTU Anantapur. Approved by AICTE, NBA Tier-1 accredited programs.',
  keywords: [
    'GPCET',
    'G. Pullaiah College of Engineering and Technology',
    'Kurnool Engineering College',
    'Autonomous Engineering College',
    'NAAC A+',
    'NBA Accredited',
    'EAPCET PULE',
    'Engineering Admissions Kurnool',
  ],
  authors: [{ name: 'GPCET Institutional Web Council' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  icons: {
    icon: '/assets/brand/gpcet-logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8B0E1A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased font-sans text-[15.5px] sm:text-base leading-relaxed flex flex-col selection:bg-[var(--ruby)] selection:text-white">
        {/* Accessible Skip-to-content target */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Global Institutional Shell */}
        <TopInstitutionalBar />
        <InstitutionalNavbar />

        {/* Primary Page Content */}
        <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
          {children}
        </main>

        {/* Global Footer & Accreditation Seals */}
        <InstitutionalFooter />

        {/* Global Cmd+K Search Modal */}
        <GlobalSearchModal />
      </body>
    </html>
  );
}
