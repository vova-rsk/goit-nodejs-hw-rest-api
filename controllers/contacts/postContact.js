const api = require('../../model')
const { v4: uuidv4 } = require('uuid')

const postContact = async (req, res) => {
  const newContactInfo = req.body
  const addedContact = await api.addContact({ id: uuidv4(), ...newContactInfo })

  res.json({
    status: 'success',
    code: 201,
    data: addedContact
  })
}

module.exports = postContact
