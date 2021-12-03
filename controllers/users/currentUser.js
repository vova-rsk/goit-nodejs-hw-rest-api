const currentUser = async (req, res) => {
  const { email, subscription } = req.user

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: {
        email,
        subscription
      }
    }
  })
}

module.exports = currentUser
