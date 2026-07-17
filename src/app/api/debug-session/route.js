import { NextResponse } from 'next/server'

export async function GET(req) {
  const cookie = req.cookies.get('malakesa_session')?.value
  const expected = process.env.SESSION_SECRET

  return NextResponse.json({
    cookiePresent: !!cookie,
    cookieLength: cookie ? cookie.length : 0,
    sessionSecretConfigured: !!expected,
    sessionSecretLength: expected ? expected.length : 0,
    match: !!cookie && !!expected && cookie === expected,
  })
}
