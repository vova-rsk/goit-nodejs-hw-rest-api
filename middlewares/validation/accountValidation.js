const createError = require('http-errors')
const { emailSchema } = require('./schemas')

const accountValidation = async (req, res, next) => {
  const isBody = Object.keys(req.body).length !== 0

  if (!isBody) throw createError(400, 'missing fields')

  const validated = emailSchema.validate(req.body)

  if (validated.error) throw createError(400, validated.error.message)

  req.body = validated.value

  next()
}

module.exports = accountValidation
