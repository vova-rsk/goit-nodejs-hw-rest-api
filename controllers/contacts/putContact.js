const api = require('../../model')
const createError = require('http-errors')

const putContact = async (req, res) => {
  const { contactId } = req.params
  const newContactInfo = req.body

  const isUpdated = await api.updateContact(contactId, newContactInfo)

  if (!isUpdated) throw createError(404, 'Not found')

  const result = await api.getContactById(contactId)

  res.json({
    status: 'success',
    code: 200,
    data: { result }
  })
}

module.exports = putContact
