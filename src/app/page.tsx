'use client';

import * as React from 'react';
import { Header } from '@/components/header';
import { MovieCard } from '@/components/movie-card';
import { getMovies } from '@/lib/data';
import type { Movie } from '@/lib/types';
import { getSession } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type SortOption = 'trending' | 'latest' | 'all';

export default function Home() {
  const [allMovies, setAllMovies] = React.useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = React.useState<Movie[]>([]);
  const [session, setSession] = React.useState<any>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortOption, setSortOption] = React.useState<SortOption>('all');

  React.useEffect(() => {
    async function fetchData() {
      const movies = await getMovies();
      setAllMovies(movies);
      setFilteredMovies(movies);
      const sessionData = await getSession();
      setSession(sessionData);
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    let movies = [...allMovies];

    // Filter by search term
    if (searchTerm) {
      movies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort based on option
    switch (sortOption) {
      case 'trending':
        // Simple random sort for "trending"
        movies.sort(() => 0.5 - Math.random());
        break;
      case 'latest':
        movies.sort((a, b) => b.year - a.year);
        break;
      case 'all':
      default:
        // No specific sort for 'all', keep original order or filter result
        break;
    }

    setFilteredMovies(movies);
  }, [searchTerm, sortOption, allMovies]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="container mx-auto space-y-12">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for a movie..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="latest">Latest</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
              {filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg mb-2">
                {searchTerm ? 'No movies found for your search.' : 'No movies available.'}
              </p>
              <p className="text-sm">
                {searchTerm
                  ? 'Try a different search term or clear the search.'
                  : 'The admin can add new movies in the dashboard.'
                }
              </p>
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
