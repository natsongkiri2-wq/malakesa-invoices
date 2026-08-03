import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// Only these tables are ever touched by this route — never accept an
// arbitrary table name from the request.
const TABLES = ['invoices', 'purchases', 'clients', 'suppliers', 'employees', 'salary_records']
const RETENTION_DAYS = 30

export async function GET() {
  // Anything older than the retention window gets purged for good before we
  // return the list, so Trash never shows something that's about to vanish
  // out from under you.
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString()
  await Promise.all(TABLES.map(table =>
    supabase.from(table).delete().lt('deleted_at', cutoff)
  ))

  const results = await Promise.all(TABLES.map(table =>
    supabase.from(table).select('*').not('deleted_at', 'is', null).order('deleted_at', { ascending: false })
  ))

  const error = results.find(r => r.error)
  if (error) return Response.json({ error: error.error.message }, { status: 500 })

  const payload = {}
  TABLES.forEach((table, i) => { payload[table] = results[i].data || [] })
  return Response.json(payload)
}

export async function POST(request) {
  // Restore: body { entity, id }
  const body = await request.json()
  const { entity, id } = body
  if (!TABLES.includes(entity)) {
    return Response.json({ error: 'Unknown entity' }, { status: 400 })
  }
  if (!id) {
    return Response.json({ error: 'id is required' }, { status: 400 })
  }
  const { data, error } = await supabase
    .from(entity)
    .update({ deleted_at: null })
    .eq('id', id)
    .select()
    .single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function DELETE(request) {
  // Permanent purge: body { entity, id }
  const body = await request.json()
  const { entity, id } = body
  if (!TABLES.includes(entity)) {
    return Response.json({ error: 'Unknown entity' }, { status: 400 })
  }
  if (!id) {
    return Response.json({ error: 'id is required' }, { status: 400 })
  }
  const { error } = await supabase.from(entity).delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
