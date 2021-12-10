const jwt = require('jsonwebtoken')
const { User } = require('../../model')

const SECRET_KEY = process.env.SECRET

const loginUser = async (req, res) => {
  const { id, email } = req.body

  const token = jwt.sign({ id, email }, SECRET_KEY, { expiresIn: '12h' })

  const result = await User
    .findByIdAndUpdate(id, { token })
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
