import * as React from 'react';
import { Header } from '@/components/header';
import { getMovies } from '@/lib/data';
import type { Movie } from '@/lib/types';
import { getSession } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MovieList } from '@/components/movie-list';

export default async function Home() {
  const movies = await getMovies();
  const session = await getSession();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="container mx-auto space-y-12">
          <MovieList movies={movies} />
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
