const api = require('../../model')
const createError = require('http-errors')

const getContactById = async (req, res) => {
  const contact = await api.getContactById(req.params.contactId)

  if (!contact) throw createError(404, 'Not found')

  res.json({
    status: 'success',
    code: 200,
    data: contact
  })
}

module.exports = getContactById
