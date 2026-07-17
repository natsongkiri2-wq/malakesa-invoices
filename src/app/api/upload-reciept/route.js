import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No file was sent' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Please upload a JPG, PNG, HEIC, or PDF file' }, { status: 400 })
    }

    const maxBytes = 10 * 1024 * 1024 // 10MB
    if (file.size > maxBytes) {
      return NextResponse.json({ error: 'File is too large — please keep it under 10MB' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = file.name.split('.').pop() || 'jpg'
    const fileName = `receipt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('receipts')
      .upload(fileName, buffer, { contentType: file.type, upsert: false })

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data } = supabase.storage.from('receipts').getPublicUrl(fileName)

    return NextResponse.json({ url: data.publicUrl })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
