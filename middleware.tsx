import {RequestCookies} from 'next/dist/compiled/@edge-runtime/cookies';
import {NextResponse, NextRequest} from 'next/server';
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookies: RequestCookies = request.cookies;
  const access_token = cookies.get('token_aifred_neo_cms');
  if (
    !access_token &&
    request.nextUrl.pathname !== '/login' &&
    request.nextUrl.pathname !== '/register'
  ) {
    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/login`, request.url));
  }
  if (access_token) {
    if (
      request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/register'
    )
      return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/dashboard`, request.url));
    else if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/dashboard`, request.url));
    }
  }
}
export const config = {
  matcher: ['/dashboard/:path*', '/', '/login', '/register'],
};
