import nodemailer from 'nodemailer'

export const sendOTP = async (email, otp) => {
    console.log(process.env.EMAIL_USER);
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or 'SendinBlue', 'Outlook', etc.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: `"Authentication System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
  }

  await transporter.sendMail(mailOptions)
}