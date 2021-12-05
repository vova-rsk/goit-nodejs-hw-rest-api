const mongoose = require('mongoose')
const createError = require('http-errors')
const { Contact } = require('../../model')

const updateStatusContact = async (req, res) => {
  const { favorite } = req.body
  const { _id: owner } = req.user
  const _id = mongoose.Types.ObjectId(req.params.contactId)

  const result = await Contact
    .findOneAndUpdate({ _id, owner }, { favorite }, { new: true })
    .select({ createdAt: 0, updatedAt: 0, owner: 0 })

  if (!result) throw createError(404, 'Not found')

  res.json({
    status: 'success',
    code: 200,
    data: { result }
  })
}

module.exports = updateStatusContact
