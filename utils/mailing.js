const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const emailForSending = process.env.EMAIL

const verificationRequest = async(emailTo, verificationUrl) => {
  const msg = {
    to: emailTo,
    from: emailForSending,
    subject: 'User verification',
    text: `to verify your account follow this link: ${verificationUrl}`,
    html: `<strong>to verify your account follow this <a href=${verificationUrl} alt="verification link">link</a></strong>`,
  }

  await sgMail.send(msg)
}

module.exports = verificationRequest
