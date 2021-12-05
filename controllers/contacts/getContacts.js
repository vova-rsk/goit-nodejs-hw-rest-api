const { Contact } = require('../../model')

const getContacts = async (req, res) => {
  const { _id: owner } = req.user
  const { page = 1, limit = 20, favorite = [true, false] } = req.query

  const options = {
    page,
    limit,
    select: {
      owner: 0,
      createdAt: 0,
      updatedAt: 0
    }
  }

  Contact.paginate({ owner, favorite: { $in: favorite } }, options, function (err, result) {
    if (err) throw err

    const { docs, totalDocs: totalItems, limit, page, totalPages, } = result

    res.json({
      status: 'success',
      code: 200,
      data: {
        result: docs,
        limit,
        page,
        totalPages,
        totalItems
      }
    })
  })
}

module.exports = getContacts
