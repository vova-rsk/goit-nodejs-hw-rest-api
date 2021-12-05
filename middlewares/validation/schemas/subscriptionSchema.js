const Joi = require('joi')
const ERROR_MESSAGE = require('./errorMessages')

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .required()
    .valid('starter', 'pro', 'business')
    .messages({
      'any.required': ERROR_MESSAGE.missingSubscriptionField,
      'any.only': ERROR_MESSAGE.invalidValue
    }),
})

module.exports = subscriptionSchema
