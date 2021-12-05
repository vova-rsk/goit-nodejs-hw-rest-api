const { Contact } = require('../../model')

const addContact = async (req, res) => {
  const { _id: owner } = req.user

  const result = await Contact.create({ ...req.body, owner })

  const { _id, name, email, phone, favorite } = result

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: { _id, name, email, phone, favorite }
    }
  })
}

module.exports = addContact
