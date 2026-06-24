import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data, error } = await supabase
    .from('salary_records')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req) {
  const body = await req.json()
  const { data, error } = await supabase
    .from('salary_records')
    .insert({
      employee_id: body.employee_id,
      month: body.month,
      pay_date: body.pay_date || null,
      days_worked: body.days_worked || null,
      gross: body.gross,
      allowances: body.allowances || [],
      deductions: body.deductions || [],
      vnpf_employee: body.vnpf_employee,
      net_pay: body.net_pay,
      notes: body.notes || null,
    })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
