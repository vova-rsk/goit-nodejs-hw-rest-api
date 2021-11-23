const api = require('../../model')

const postContact = async (req, res) => {
  const result = await api.addContact(req.body)

  res.json({
    status: 'success',
    code: 201,
    data: { result }
  })
}

module.exports = postContact
