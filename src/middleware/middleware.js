import { NextResponse } from 'next/server'

const SESSION_COOKIE = 'malakesa_session'

export function middleware(req) {
  const { pathname } = req.nextUrl

  // Let the login/logout routes themselves through untouched
  if (pathname === '/api/login' || pathname === '/api/logout') {
    return NextResponse.next()
  }

  const cookie = req.cookies.get(SESSION_COOKIE)?.value
  const expected = process.env.SESSION_SECRET

  if (!expected || cookie !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
