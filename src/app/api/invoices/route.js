import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req) {
  const body = await req.json()

  // Get next invoice number
  const { data: existing } = await supabase
    .from('invoices')
    .select('number')
    .order('created_at', { ascending: false })
    .limit(1)

  let nextNum = 1001
  if (existing && existing.length > 0) {
    const last = parseInt(existing[0].number.replace('INV-', ''))
    if (!isNaN(last)) nextNum = last + 1
  }

  const { data, error } = await supabase
    .from('invoices')
    .insert({
      number: `INV-${nextNum}`,
      client_id: body.client_id || null,
      client_name: body.client_name,
      client_email: body.client_email || null,
      date: body.date,
      due_date: body.due_date,
      items: body.items || [],
      subtotal: body.subtotal || 0,
      tax: body.tax || 0,
      total: body.total || 0,
      notes: body.notes || null,
      status: 'unpaid',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
