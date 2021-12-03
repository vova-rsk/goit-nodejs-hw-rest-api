const createError = require('http-errors')
const { statusSchema } = require('./schemas')

const statusValidation = async (req, res, next) => {
  const validated = statusSchema.validate(req.body)

  if (validated.error) throw createError(400, validated.error.message)

  req.body = validated.value

  next()
}

module.exports = statusValidation
