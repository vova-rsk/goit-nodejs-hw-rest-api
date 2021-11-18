const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const Joi = require('joi')
const api = require('../../model')

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

router.get('/', async (_, res) => {
  try {
    const contacts = await api.listContacts()

    res.json({
      status: 'success',
      code: 200,
      data: contacts
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Internal Server error'
    })
  }
})

router.get('/:contactId', async (req, res) => {
  try {
    const contact = await api.getContactById(req.params.contactId)

    if (!contact) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found'
      })
      return
    }

    res.json({
      status: 'success',
      code: 200,
      data: contact
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Internal Server error'
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const newContactInfo = req.body
    const { error: structureValidationError } = structureSchema.validate(newContactInfo)

    if (structureValidationError) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing required name field'
      })
      return
    }

    const { error: valuesValidationError } = valuesSchema.validate(newContactInfo)

    if (valuesValidationError) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'contact info does not match minimal requirements'
      })
      return
    }

    const addedContact = await api.addContact({ id: uuidv4(), ...newContactInfo })

    res.json({
      status: 'success',
      code: 201,
      data: addedContact
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Internal Server error'
    })
  }
})

router.delete('/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params
    const removedContact = await api.removeContact(contactId)

    if (!removedContact) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found'
      })
      return
    }

    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted'
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Internal Server error'
    })
  }
})

router.patch('/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params
    const newContactInfo = req.body

    const { error: valuesValidationError } = valuesSchema.validate(newContactInfo)

    if (valuesValidationError) {
      const message = valuesValidationError.details[0].type === 'object.min'
        ? 'missing fields'
        : 'contact info does not match minimal requirements'

      res.status(400).json({
        status: 'error',
        code: 400,
        message
      })
      return
    }

    const updatedContact = await api.updateContact(contactId, newContactInfo)

    if (!updatedContact) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found'
      })
      return
    }

    res.json({
      status: 'success',
      code: 200,
      data: updatedContact
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Internal Server error'
    })
  }
})

module.exports = router
