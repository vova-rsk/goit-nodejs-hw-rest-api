const Joi = require('joi')
const ERROR_MESSAGE = require('./errorMessages')

const userSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.email': ERROR_MESSAGE.invalidEmailFormat,
      'any.required': ERROR_MESSAGE.missingField
    }),
  password: Joi.string()
    .required()
    .min(6)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .messages({
      'string.min': ERROR_MESSAGE.invalidValue,
      'string.pattern.base': ERROR_MESSAGE.invalidPasswordFormat,
      'any.required': ERROR_MESSAGE.missingPasswordField
    }),
  subscription: Joi.string()
    .optional()
    .valid('starter', 'pro', 'business')
    .messages({
      'any.only': ERROR_MESSAGE.invalidValue
    }),
  token: Joi.string()
    .optional()
})

module.exports = userSchema
