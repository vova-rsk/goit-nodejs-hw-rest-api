const api = require('../../model')

const getContacts = async (req, res) => {
  const result = await api.listContacts()

  res.json({
    status: 'success',
    code: 200,
    data: { result }
  })
}

module.exports = getContacts
