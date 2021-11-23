const api = require('../../model')
const createError = require('http-errors')

const deleteContact = async (req, res) => {
  const { contactId } = req.params
  const result = await api.removeContact(contactId)

  if (!result) throw createError(404, 'Not found')

  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted'
  })
}

module.exports = deleteContact