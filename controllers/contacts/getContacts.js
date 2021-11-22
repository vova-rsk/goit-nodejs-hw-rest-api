const api = require('../../model')

const getContacts = async (req, res) => {
  const contacts = await api.listContacts()

  res.json({
    status: 'success',
    code: 200,
    data: contacts
  })
}

module.exports = getContacts
