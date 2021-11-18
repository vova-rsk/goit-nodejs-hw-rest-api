const express = require('express')
const router = express.Router()
const api = require('../../model')
const { v4: uuidv4 } = require('uuid')

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
    const addedContact = await api.addContact({ id: uuidv4(), ...newContactInfo })

    if (!addedContact) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing required name field'
      })
      return
    }

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

    if (Object.keys(newContactInfo).length === 0) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing fields'
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
