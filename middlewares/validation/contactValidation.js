const createError = require('http-errors')
const { contactSchema } = require('./schemas')

const contactValidation = async (req, res, next) => {
  const isBody = Object.keys(req.body).length !== 0

  if (!isBody) throw createError(400, 'missing fields')

  const validated = contactSchema.validate(req.body)

  if (validated.error) throw createError(400, validated.error.message)

  req.body = validated.value

  next()
}

module.exports = contactValidation
