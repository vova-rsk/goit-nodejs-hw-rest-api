const createError = require('http-errors')
const { User } = require('../../model')
const { createUrl, verificationRequest } = require('../../utils')

const userReVerification = async (req, res) => {
  const { email } = req.body

  const user = await User
    .findOne({ email })
    .select({ email: 1, verify: 1, verifyToken: 1 })

  if (!user) throw createError(404, 'User not found')
  if (user.verify) throw createError(400, 'Verification has already been passed')

  const url = createUrl(req, 'users/verify', user.verifyToken)

  verificationRequest(email, url)

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent'
  })
}

module.exports = userReVerification
