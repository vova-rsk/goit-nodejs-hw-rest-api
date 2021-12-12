const { User } = require('../../model')

const updateUserSubscription = async (req, res) => {
  const { id } = req.user
  const { subscription } = req.body

  const result = await User
    .findByIdAndUpdate(id, { subscription }, { new: true })
    .select({ email: 1, subscription: 1, avatarURL: 1 })

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: {
        email: result.email,
        subscription: result.subscription
      }
    }
  })
}

module.exports = updateUserSubscription
