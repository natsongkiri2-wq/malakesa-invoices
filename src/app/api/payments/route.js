import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req) {
  const body = await req.json()

  // Generate next receipt number
  const { count } = await supabase
    .from('payments')
    .select('*', { count: 'exact', head: true })
  const nextNum = String((count || 0) + 1).padStart(4, '0')
  const receipt_number = `RCT-${nextNum}`

  const { data, error } = await supabase
    .from('payments')
    .insert({
      invoice_id: body.invoice_id,
      amount: body.amount,
      method: body.method || 'Cash',
      date: body.date,
      note: body.note || null,
      receipt_number,
    })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}