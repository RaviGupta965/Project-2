import { NextResponse } from 'next/server'
import { sendOTP } from '../../../utils/mailer'

export async function POST(req) {
  const { email } = await req.json()
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString() // 6-digit OTP
  try {
    await sendOTP(email, otp)
    return NextResponse.json({ success: true, otp }) // Store OTP securely in DB/session in real apps
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}