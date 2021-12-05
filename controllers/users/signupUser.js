const { User } = require('../../model')

const signUpUser = async (req, res) => {
  const result = await User.create(req.body)
  const { email, subscription } = result

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        subscription
      }
    }
  })
}

module.exports = signUpUser
