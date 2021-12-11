const createError = require('http-errors')
const { userSchema } = require('./schemas')

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body

  const validated = userSchema.validate({ email, password })

  if (validated.error) throw createError(400, validated.error.message)

  req.body = validated.value

  next()
}

module.exports = loginValidation
