import Link from 'next/link';
import { Film, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logoutAction } from '@/lib/actions';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 border-b border-border/40 bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <Film className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-headline font-bold">FreeMovies Admin</h1>
          </Link>
          <form action={logoutAction}>
            <Button variant="ghost" type="submit">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
