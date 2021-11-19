const Joi = require('joi')

const structureSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const valuesSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string()
    .pattern(/^(\+)?(\(\d{2,3}\) ?\d|\d)(([-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/)
}).required().min(1)

const contactToAddValidation = contact => {
  const validationResult = {
    isValid: true,
    errorMessage: null
  }

  const { error: structureValidationError } = structureSchema.validate(contact)
  const { error: valuesValidationError } = valuesSchema.validate(contact)

  if (structureValidationError || valuesValidationError) {
    const message = structureValidationError
      ? 'missing required name field'
      : 'contact info does not match minimal requirements'

    validationResult.isValid = false
    validationResult.errorMessage = message
  }
  return validationResult
}

const contactToPatchValidation = contact => {
  const validationResult = {
    isValid: true,
    errorMessage: null
  }
  const { error: valuesValidationError } = valuesSchema.validate(contact)

  if (valuesValidationError) {
    const message = valuesValidationError.details[0].type === 'object.min'
      ? 'missing fields'
      : 'contact info does not match minimal requirements'

    validationResult.isValid = false
    validationResult.errorMessage = message
  }
  return validationResult
}

module.exports = {
  contactToAddValidation,
  contactToPatchValidation
}
