const api = require('../../model')
const createError = require('http-errors')

const putContact = async (req, res) => {
  const { contactId } = req.params
  const newContactInfo = req.body
  const updatedContact = await api.updateContact(contactId, newContactInfo)

  if (!updatedContact) throw createError(404, 'Not found')

  res.json({
    status: 'success',
    code: 200,
    data: updatedContact
  })
}

module.exports = putContact
