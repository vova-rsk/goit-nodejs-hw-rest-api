const createError = require('http-errors')
const { userSchema } = require('./schemas')

const signupValidation = async (req, res, next) => {
  const validated = userSchema.validate(req.body)

  if (validated.error) throw createError(400, validated.error.message)

  req.body = validated.value

  next()
}

module.exports = signupValidation
