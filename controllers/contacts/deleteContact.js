const { removeContact } = require('../../service')
const createError = require('http-errors')

const removeOne = async (req, res) => {
  const { contactId } = req.params
  const removedContact = await removeContact(contactId)

  if (!removedContact) throw createError(404, 'Not found')

  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted'
  })
}

module.exports = removeOne
