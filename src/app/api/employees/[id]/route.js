import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function PATCH(request, { params }) {
  const { id } = params
  const body = await request.json()
  const { name, salary, vnpf_number, email, job_title } = body
  if (!name || !salary) {
    return Response.json({ error: 'name and salary are required' }, { status: 400 })
  }
  const { data, error } = await supabase
    .from('employees')
    .update({ name, salary: Number(salary), vnpf_number, email })
    .eq('id', id)
    .select()
    .single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function DELETE(request, { params }) {
  const { id } = params
  const { error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
