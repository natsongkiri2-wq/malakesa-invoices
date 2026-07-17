import { NextResponse } from 'next/server'

export async function POST(req) {
  const { password } = await req.json()

  if (!process.env.APP_PASSWORD || !process.env.SESSION_SECRET) {
    return NextResponse.json({ error: 'Server is not configured for login yet' }, { status: 500 })
  }

  if (password !== process.env.APP_PASSWORD) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const res = NextResponse.json({ success: true })
  res.cookies.set('malakesa_session', process.env.SESSION_SECRET, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
  return res
}
