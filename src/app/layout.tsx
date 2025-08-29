import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'FreeMovies',
  description: 'Discover and watch your favorite movies online.',
  openGraph: {
    title: 'FreeMovies',
    description: 'Discover and watch your favorite movies online.',
    type: 'website',
    url: 'https://freemovies-demo.vercel.app', // Replace with your actual domain
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
    images: ['https://picsum.photos/1200/630'], // Replace with your actual domain
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
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
