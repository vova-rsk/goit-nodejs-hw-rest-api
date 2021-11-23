const api = require('../../model')
const createError = require('http-errors')

const getContactById = async (req, res) => {
  const result = await api.getContactById(req.params.contactId)

  if (!result) throw createError(404, 'Not found')

  res.json({
    status: 'success',
    code: 200,
    data: { result }
  })
}

module.exports = getContactById
