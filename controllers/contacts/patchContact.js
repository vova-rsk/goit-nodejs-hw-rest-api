const api = require('../../model')

const patchContact = async (req, res) => {
  const { contactId } = req.params
  const newContactInfo = req.body

  const result = await api.updateStatusContact(contactId, newContactInfo)

  res.json({
    status: 'success',
    code: 200,
    data: { result }
  })
}

module.exports = patchContact
