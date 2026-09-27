import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const limit = Math.min(Number(searchParams.get('limit')) || 200, 500)
  const { data, error } = await supabase
    .from('activity_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data || [])
}

export async function POST(request) {
  const body = await request.json()
  const { actor, action, entity_type, entity_label, details } = body
  if (!action || !entity_type) {
    return Response.json({ error: 'action and entity_type are required' }, { status: 400 })
  }
  const { data, error } = await supabase
    .from('activity_log')
    .insert([{ actor: actor || null, action, entity_type, entity_label: entity_label || null, details: details || null }])
    .select()
    .single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data, { status: 201 })
}
