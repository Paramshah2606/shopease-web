import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log("Request in middleware",request);
  const token = request.cookies.get('user_token');
  const { pathname } = request.nextUrl;

  const publicPaths = [
    '/login',
    '/signup',
    '/social-login-success',
    '/signup/verify',
    '/signup/uploadPhoto',
    '/forgot-password',
    '/goodbye'
  ];

  console.log(pathname);
  // if(['/user/home'].includes(pathname)){
  //   return NextResponse.next();
  // }

  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/user/home', request.url));
  }

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/:path',
    '/signup/:path',
    '/user/:path'
  ]
};
