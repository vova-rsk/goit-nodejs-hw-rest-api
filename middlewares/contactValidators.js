const contactSchema = require('../utils/validation')

const contactValidation = async (req, res, next) => {
  try {
    const isBody = Object.keys(req.body).length !== 0

    if (!isBody) throw new Error('missing fields')

    const validated = await contactSchema.validateAsync(req.body)

    if (validated.error) throw new Error(validated.error)

    req.body = validated
    next()
  } catch (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message
    })
  }
}

module.exports = contactValidation
