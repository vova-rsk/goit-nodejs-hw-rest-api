const Joi = require('joi')
const ERROR_MESSAGE = require('./errorMessages')

const emailSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.email': ERROR_MESSAGE.invalidEmailFormat,
      'any.required': ERROR_MESSAGE.missingEmailField
    }),
})

module.exports = emailSchema
