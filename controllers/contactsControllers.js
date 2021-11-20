const { v4: uuidv4 } = require('uuid')
const api = require('../model')

const getContacts = async (_, res) => {
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
}

const getContactById = async (req, res) => {
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
}

const postContact = async (req, res) => {
  try {
    const newContactInfo = req.body
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
}

const deleteContact = async (req, res) => {
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
}

const putContact = async (req, res) => {
  try {
    const { contactId } = req.params
    const newContactInfo = req.body
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
}

module.exports = {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
}
