import { getMovies } from '@/lib/data';
import { MoviesTable } from '@/components/admin/movies-table';

export default async function DashboardPage() {
  const movies = await getMovies();

  return (
    <div className="container mx-auto py-10 px-6">
      <MoviesTable movies={movies} />
    </div>
  );
}
