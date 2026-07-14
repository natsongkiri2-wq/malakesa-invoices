import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  const { id } = params

  const { data: invoice, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })

  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .eq('invoice_id', id)
    .order('date', { ascending: true })

  return NextResponse.json({ ...invoice, payments: payments || [] })
}

export async function PUT(req, { params }) {
  const { id } = params
  const body = await req.json()

  const { data, error } = await supabase
    .from('invoices')
    .update({
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
      vat_applied: body.vat_applied,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req, { params }) {
  const { id } = params
  const { error } = await supabase.from('invoices').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
