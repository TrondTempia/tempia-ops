import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Tempia Operations Dashboard',
  description: 'Scandinavian emergency operations platform - Professional tool for emergency personnel',
  keywords: ['emergency', 'operations', 'dashboard', 'tempia', 'scandinavian'],
  authors: [{ name: 'Tempia Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'noindex, nofollow', // Prevent indexing for internal tool
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className={inter.variable}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}