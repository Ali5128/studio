import { Header } from '@/components/header';
import { MovieCard } from '@/components/movie-card';
import { getMovies } from '@/lib/data';
import type { Movie } from '@/lib/types';
import { getSession } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  const allMovies = await getMovies();
  const session = await getSession();

  const featuredMovies = allMovies.slice(0, 5);
  const newReleases = [...allMovies].sort((a, b) => b.year - a.year).slice(0, 5);
  const allTimeFavorites = [...allMovies].sort(() => 0.5 - Math.random()).slice(0, 5);

  const categories: { title: string; movies: Movie[] }[] = [
    { title: 'Featured Movies', movies: featuredMovies },
    { title: 'New Releases', movies: newReleases },
    { title: 'All Time Favorites', movies: allTimeFavorites },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="container mx-auto space-y-16">
          {allMovies.length > 0 ? (
            categories.map(category => (
              <section key={category.title}>
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-8 text-center">
                  {category.title}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
                  {category.movies.map(movie => (
                    <MovieCard key={`${category.title}-${movie.id}`} movie={movie} />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">
                No movies available at the moment.
              </p>
              <p>The admin can add new movies in the dashboard.</p>
            </div>
          )}
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto flex flex-col items-center gap-4">
          <p>&copy; {new Date().getFullYear()} FreeMovies. All Rights Reserved.</p>
          <Button asChild variant="link" size="sm" className="text-xs text-muted-foreground">
            <Link href={session ? '/admin/dashboard' : '/admin/login'}>
              {session ? 'Dashboard' : 'Admin Login'}
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
