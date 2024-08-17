import { NextRequest, NextResponse } from 'next/server';
// import { getUser } from './app/_actions';

const publicRoutes = ['/welcome'];
const authRoutes = ['/auth/login', '/auth/register'];
const apiRoutePrefix = '/api/auth';

export default async function middleware(request: NextRequest) {
  // const { nextUrl } = request;
  // const user = await getUser();
  // const isLoggedIn = !!user;

  // const isApiRoute = nextUrl.pathname.startsWith(apiRoutePrefix);
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  // const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // if (isApiRoute) return NextResponse.next();

  // if (isAuthRoute) {
  //   if (isLoggedIn) return NextResponse.redirect(new URL('/', nextUrl));

  //   return NextResponse.next();
  // }

  // if (!isLoggedIn && !isPublicRoute)
  //   return NextResponse.redirect(new URL('/auth/login', nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
