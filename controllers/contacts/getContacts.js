const { listContacts } = require('../../service')

const getAll = async (req, res) => {
  const result = await listContacts()

  res.json({
    status: 'success',
    code: 200,
    data: { result }
  })
}

module.exports = getAll
