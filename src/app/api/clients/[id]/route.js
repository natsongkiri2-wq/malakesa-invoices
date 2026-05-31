import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function DELETE(req, { params }) {
  const { id } = params
  const { error } = await supabase.from('clients').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function PATCH(req, { params }) {
  const { id } = params
  const body = await req.json()
  const { data, error } = await supabase
    .from('clients')
    .update({
      name: body.name,
      email: body.email || null,
      phone: body.phone || null,
      address: body.address || null,
    })
    .eq('id', id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
