const api = require('../../model')

const postContact = async (req, res) => {
  const addedContactId = await api.addContact(req.body)
  const result = await api.getContactById(addedContactId)

  res.json({
    status: 'success',
    code: 201,
    data: { result }
  })
}

module.exports = postContact
