import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function GET() {
  const { data, error } = await supabase
    .from('vat_filings')
    .select('*')
    .order('period', { ascending: false })
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data || [])
}

export async function POST(request) {
  const body = await request.json()
  const { period, filed_date, note } = body
  if (!period) {
    return Response.json({ error: 'period is required' }, { status: 400 })
  }
  if (!filed_date) {
    return Response.json({ error: 'filed_date is required' }, { status: 400 })
  }
  const { data, error } = await supabase
    .from('vat_filings')
    .upsert([{ period, filed_date, note: note || null }], { onConflict: 'period' })
    .select()
    .single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data, { status: 201 })
}

export async function DELETE(request) {
  const body = await request.json()
  const { period } = body
  if (!period) {
    return Response.json({ error: 'period is required' }, { status: 400 })
  }
  const { error } = await supabase
    .from('vat_filings')
    .delete()
    .eq('period', period)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
