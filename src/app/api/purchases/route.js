import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function GET() {
  const { data, error } = await supabase
    .from('purchases')
    .select('*')
    .order('date', { ascending: false })
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data || [])
}

export async function POST(request) {
  const body = await request.json()
  const { date, supplier, description, category, amount, vat, amount_ex_vat, ref } = body
  if (!supplier || !date || !amount) {
    return Response.json({ error: 'supplier, date and amount are required' }, { status: 400 })
  }
  const { data, error } = await supabase
    .from('purchases')
    .insert([{ date, supplier, description, category, amount: Number(amount), vat: Number(vat || 0), amount_ex_vat: Number(amount_ex_vat || 0), ref }])
    .select()
    .single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data, { status: 201 })
}
