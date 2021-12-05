const Joi = require('joi')
const ERROR_MESSAGE = require('./errorMessages')

const statusSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({
      'boolean.base': ERROR_MESSAGE.invalidValue,
      'any.required': ERROR_MESSAGE.missingFavoriteField
    })
})

module.exports = statusSchema
