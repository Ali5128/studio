import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Film } from 'lucide-react';
import { getSession } from '@/lib/auth';

export async function Header() {
  const session = await getSession();

  return (
    <header className="py-4 px-6 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <Film className="w-8 h-8 text-primary group-hover:animate-pulse" />
          <h1 className="text-2xl font-headline font-bold text-foreground group-hover:text-primary transition-colors">
            FreeMovies
          </h1>
        </Link>
        <Button asChild>
          <Link href={session ? '/admin/dashboard' : '/admin/login'}>
            {session ? 'Go to Dashboard' : 'Admin Login'}
          </Link>
        </Button>
      </div>
    </header>
  );
}
