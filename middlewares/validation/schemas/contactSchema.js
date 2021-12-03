const Joi = require('joi')
const ERROR_MESSAGE = require('./errorMessages')

const contactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.min': ERROR_MESSAGE.invalidValue,
      'string.max': ERROR_MESSAGE.invalidValue,
      'any.required': ERROR_MESSAGE.missingField
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.email': ERROR_MESSAGE.invalidValue,
      'any.required': ERROR_MESSAGE.missingField
    }),
  phone: Joi.string()
    .pattern(/^(\+)?(\(\d{2,3}\) ?\d|\d)(([-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/)
    .required()
    .messages({
      'string.pattern.base': ERROR_MESSAGE.invalidValue,
      'any.required': ERROR_MESSAGE.missingField
    }),
  favorite: Joi.boolean()
    .optional()
})

module.exports = contactSchema
