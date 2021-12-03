const jwt = require('jsonwebtoken')
const { User } = require('../../model')

const SECRET_KEY = process.env.SECRET

const loginUser = async (req, res) => {
  const { id, email } = req.body

  const token = jwt.sign({ id, email }, SECRET_KEY, { expiresIn: '12h' })

  const result = await User
    .findByIdAndUpdate(id, { token })
    .select({ email: 1, subscription: 1 })

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      token,
      user: {
        email: result.email,
        subscription: result.subscription
      }
    }
  })
}

module.exports = loginUser
