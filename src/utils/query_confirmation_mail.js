import nodemailer from 'nodemailer'

export const sendmail = async (email) => {
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
    subject: 'Query Submitting confirmation',
    text: `Your Query has been submitted successfully.`,
  }

  await transporter.sendMail(mailOptions)
}