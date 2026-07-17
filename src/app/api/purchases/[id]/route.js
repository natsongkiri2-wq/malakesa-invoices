import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function PUT(req, { params }) {
  const { id } = params
  const body = await req.json()

  const { data, error } = await supabase
    .from('purchases')
    .update({
      date: body.date,
      supplier_id: body.supplier_id || null,
      supplier: body.supplier,
      description: body.description || null,
      category: body.category || 'Other',
      amount: body.amount || 0,
      vat: body.vat || 0,
      amount_ex_vat: body.amount_ex_vat || 0,
      ref: body.ref || null,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req, { params }) {
  const { id } = params
  const { error } = await supabase.from('purchases').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
