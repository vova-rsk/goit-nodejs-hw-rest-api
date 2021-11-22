const contactSchema = require('../utils/validation')
const createError = require('http-errors')

const contactValidation = async (req, res, next) => {
  try {
    const isBody = Object.keys(req.body).length !== 0

    if (!isBody) throw createError(400, 'missing fields')

    const validated = contactSchema.validate(req.body)

    if (validated.error) throw createError(400, validated.error.message)

    req.body = validated.value
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = contactValidation
