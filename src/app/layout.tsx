import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'FreeMovies',
  description: 'Discover and watch your favorite movies online.',
  openGraph: {
    title: 'FreeMovies',
    description: 'Discover and watch your favorite movies online.',
    type: 'website',
    url: 'https://freemovi.netlify.app',
    images: [
      {
        url: 'https://picsum.photos/1200/630',
        width: 1200,
        height: 630,
        alt: 'FreeMovies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeMovies',
    description: 'Discover and watch your favorite movies online.',
    images: ['https://picsum.photos/1200/630'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Adstera Popunder Ad */}
        <Script
          id="adstera-popunder"
          strategy="afterInteractive"
          src="//pl27535343.revenuecpmgate.com/01/b0/59/01b059de8c5f3a650e15a984f2d6ec00.js"
        />
        {/* Adstera Social Bar Ad */}
        <Script
          id="adstera-social-bar"
          strategy="afterInteractive"
          src="//pl27535360.revenuecpmgate.com/19/ad/b5/19adb5e47367b44c469ef4b04f5c6962.js"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
