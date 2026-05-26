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

export async function DELETE(req, { params }) {
  const { id } = params
  const { error } = await supabase.from('invoices').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
