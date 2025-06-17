import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard']; // Add more routes as needed

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Only apply middleware to protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("token")?.value;
    console.log("Auth Token:", authToken);
    if (!authToken) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
}