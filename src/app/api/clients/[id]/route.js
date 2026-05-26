import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function DELETE(req, { params }) {
  const { id } = params
  const { error } = await supabase.from('clients').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
