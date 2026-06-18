import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function PATCH(request, { params }) {
  const { id } = params
  const body = await request.json()
  const { name, phone, email, address, category } = body
  if (!name) {
    return Response.json({ error: 'name is required' }, { status: 400 })
  }
  const { data, error } = await supabase
    .from('suppliers')
    .update({ name, phone, email, address, category })
    .eq('id', id)
    .select()
    .single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function DELETE(request, { params }) {
  const { id } = params
  const { error } = await supabase
    .from('suppliers')
    .delete()
    .eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
