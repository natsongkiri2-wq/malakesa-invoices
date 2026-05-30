import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      return NextResponse.json({ error: 'Missing env vars', hasUrl: !!process.env.SUPABASE_URL, hasKey: !!process.env.SUPABASE_SERVICE_KEY }, { status: 500 })
    }
    const { data, error } = await supabase.from('clients').select('*').order('name', { ascending: true })
    if (error) return NextResponse.json({ error: error.message, code: error.code, hint: error.hint }, { status: 500 })
    return NextResponse.json(data || [])
  } catch(e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { data, error } = await supabase.from('clients').insert({
      name: body.name,
      email: body.email || null,
      phone: body.phone || null,
      address: body.address || null,
    }).select().single()
    if (error) return NextResponse.json({ error: error.message, code: error.code }, { status: 500 })
    return NextResponse.json(data)
  } catch(e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
