const currentUser = async (req, res) => {
  const { email, subscription, avatarURL } = req.user

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: {
        email,
        subscription,
        avatarURL
      }
    }
  })
}

module.exports = currentUser
