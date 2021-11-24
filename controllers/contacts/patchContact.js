const api = require('../../model')
const createError = require('http-errors')

const patchContact = async (req, res) => {
  const { contactId } = req.params
  const newContactInfo = req.body

  const isUpdated = await api.updateStatusContact(contactId, newContactInfo)

  if (!isUpdated) throw createError(404, 'Not found')

  const result = await api.getContactById(contactId)

  res.json({
    status: 'success',
    code: 200,
    data: { result }
  })
}

module.exports = patchContact
