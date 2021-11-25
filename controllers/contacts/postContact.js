const { addContact } = require('../../service')

const postOne = async (req, res) => {
  const result = await addContact(req.body)

  res.json({
    status: 'success',
    code: 201,
    data: { result }
  })
}

module.exports = postOne
