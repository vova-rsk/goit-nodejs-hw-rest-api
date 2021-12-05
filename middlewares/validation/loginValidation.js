const createError = require('http-errors')
const { User } = require('../../model')
const { userSchema } = require('./schemas')

const loginValidation = async (req, res, next) => {
  const validated = userSchema.validate(req.body)

  if (validated.error) throw createError(400, validated.error.message)

  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !user.comparePassword(password)) throw createError(401, 'Email or password is wrong')

  const { id, subscription } = user

  req.body = {
    id,
    ...validated.value,
    subscription
  }

  next()
}

module.exports = loginValidation
