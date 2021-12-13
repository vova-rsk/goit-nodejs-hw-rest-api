const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const { User } = require('../../model')

const SECRET_KEY = process.env.SECRET

const loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User
    .findOne({ email })
    .select({ email: 1, password: 1, verify: 1 })

  if (!user || !user.comparePassword(password)) throw createError(401, 'Email or password is wrong')
  if (!user.verify) throw createError(403, 'Access restricted. Account is not verificated')

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '12h' })

  const result = await User
    .findByIdAndUpdate(user.id, { token }, { new: true })
    .select({ email: 1, subscription: 1, avatarURL: 1, token: 1 })

  const { email: userEmail, subscription, avatarURL, token: userToken } = result

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      token: userToken,
      user: {
        email: userEmail,
        subscription,
        avatarURL
      }
    }
  })
}

module.exports = loginUser
