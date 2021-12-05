const createError = require('http-errors')
const { User } = require('../../model')

const logoutUser = async (req, res) => {
  const { id } = req.user
  const result = await User
    .findByIdAndUpdate(id, { token: null })
    .select({ email: 1, subscription: 1 })

  if (!result) throw createError(401, 'Not authorized')

  res.status(204).json()
}

module.exports = logoutUser
