'use server';

import type { Movie } from '@/lib/types';
import { MovieCard } from '@/components/movie-card';

interface MovieListProps {
  movies: Movie[];
}

export async function MovieList({ movies }: MovieListProps) {
  return (
    <>
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg mb-2">No movies found.</p>
          <p className="text-sm">
            Try adjusting your search or filter, or add a new movie in the admin dashboard.
          </p>
        </div>
      )}
    </>
  );
}
