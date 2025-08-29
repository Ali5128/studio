import { redirect } from 'next/navigation';
import { getMovieById } from '@/lib/data';
import type { Metadata } from 'next';
import type { Movie } from '@/lib/types';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const movie: Movie | undefined = await getMovieById(params.id);

  if (!movie) {
    return {
      title: 'Movie Not Found',
    };
  }
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    title: movie.metaTitle,
    description: movie.metaDescription,
    openGraph: {
      title: movie.metaTitle,
      description: movie.metaDescription,
      type: 'video.movie',
      url: `${siteUrl}/movie/${movie.id}`,
      images: [
        {
          url: movie.thumbnailUrl,
          width: 500,
          height: 750,
          alt: movie.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: movie.metaTitle,
      description: movie.metaDescription,
      images: [movie.thumbnailUrl],
    },
    alternates: {
      canonical: `${siteUrl}/movie/${movie.id}`,
    },
    other: {
      'json-ld': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Movie',
        name: movie.title,
        description: movie.description,
        image: movie.thumbnailUrl,
        datePublished: movie.year.toString(),
        url: `${siteUrl}/movie/${movie.id}`
      }),
    },
  };
}

export default async function MoviePage({ params }: Props) {
  const movie = await getMovieById(params.id);

  if (!movie || !movie.externalLink) {
    redirect('/'); 
  }
  
  try {
    // Validate URL before redirecting
    new URL(movie.externalLink);
    redirect(movie.externalLink);
  } catch (error) {
    // If URL is invalid, redirect to homepage
    console.error("Invalid external link for movie:", movie.id);
    redirect('/');
  }
}
