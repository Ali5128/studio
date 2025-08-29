import * as React from 'react';
import { Header } from '@/components/header';
import { getMovies } from '@/lib/data';
import { getSession } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MovieList } from '@/components/movie-list';
import type { Movie } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    sort?: string;
  };
}) {
  const allMovies = await getMovies();
  const session = await getSession();

  const searchTerm = searchParams?.query || '';
  const sortOption = searchParams?.sort || 'all';

  let filteredMovies: Movie[] = [...allMovies];

  if (searchTerm) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sort based on option
  switch (sortOption) {
    case 'trending':
      // Simple random sort for "trending"
      filteredMovies.sort(() => 0.5 - Math.random());
      break;
    case 'latest':
      filteredMovies.sort((a, b) => b.year - a.year);
      break;
    case 'all':
    default:
      // No specific sort for 'all', use the order from the server
      break;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="container mx-auto space-y-12">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
             <form className="relative w-full md:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  name="query"
                  placeholder="Search for a movie..."
                  className="pl-10"
                  defaultValue={searchTerm}
                />
              </form>
            <form>
               <Tabs defaultValue={sortOption}>
                <TabsList className="grid w-full grid-cols-3 md:w-auto">
                  <TabsTrigger value="all" asChild>
                    <button type="submit" name="sort" value="all">All</button>
                  </TabsTrigger>
                  <TabsTrigger value="trending" asChild>
                     <button type="submit" name="sort" value="trending">Trending</button>
                  </TabsTrigger>
                  <TabsTrigger value="latest" asChild>
                     <button type="submit" name="sort" value="latest">Latest</button>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
               <input type="hidden" name="query" value={searchTerm} />
            </form>
          </div>
          <MovieList movies={filteredMovies} />
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
