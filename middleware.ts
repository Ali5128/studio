import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { FAKE_COOKIE_NAME } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has(FAKE_COOKIE_NAME);
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  if (isAdminRoute && !isLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
