const createError = require('http-errors')
const { subscriptionSchema } = require('./schemas')

const subscriptionValidation = async(req, res, next) => {
  const validated = subscriptionSchema.validate(req.body)

  if (validated.error) throw createError(400, validated.error.message)

  const subscription = validated.value.subscription

  req.body = { subscription }

  next()
}

module.exports = subscriptionValidation
