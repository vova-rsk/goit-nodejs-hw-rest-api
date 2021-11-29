const { getContactById } = require('../../service')
const createError = require('http-errors')

const getOne = async (req, res) => {
  const result = await getContactById(req.params.contactId)

  if (!result) throw createError(404, 'Not found')

  res.json({
    status: 'success',
    code: 200,
    data: { result }
  })
}

module.exports = getOne
