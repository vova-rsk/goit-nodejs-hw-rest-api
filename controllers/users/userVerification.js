const createError = require('http-errors')
const { User } = require('../../model')

const userVerification = async (req, res) => {
  const { verificationToken: verifyToken } = req.params

  const user = await User
    .findOneAndUpdate({ verifyToken }, { verifyToken: null, verify: true })
    .select({ email: 1, subscription: 1, avatarURL: 1 })

  if (!user) throw createError(404, 'User not found')

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification successful'
  })
}

module.exports = userVerification
