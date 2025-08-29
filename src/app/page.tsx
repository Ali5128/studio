import { Header } from '@/components/header';
import { MovieCard } from '@/components/movie-card';
import { getMovies } from '@/lib/data';
import type { Movie } from '@/lib/types';

export default async function Home() {
  const movies = await getMovies();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-headline font-bold mb-8 text-center">
            Featured Movies
          </h2>
          {movies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
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
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} FreeMovies. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
