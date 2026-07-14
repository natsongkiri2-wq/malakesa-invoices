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

  const { data: existing, error: fetchError } = await supabase
    .from('invoices').select('total').eq('id', id).single()
  if (fetchError || !existing) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })

  const { data: payments } = await supabase
    .from('payments').select('amount').eq('invoice_id', id)
  const totalPaid = (payments || []).reduce((s, p) => s + Number(p.amount), 0)
  if (totalPaid >= Number(existing.total) && Number(existing.total) > 0) {
    return NextResponse.json({ error: 'This invoice is fully paid and cannot be edited' }, { status: 403 })
  }

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
