const { v4: uuidv4 } = require('uuid')
const { User } = require('../../model')
const { createUrl, verificationRequest } = require('../../utils')

const signUpUser = async (req, res) => {
  const result = await User.create({ ...req.body, verifyToken: uuidv4() })

  const { email, subscription, avatarURL, verifyToken } = result

  const url = createUrl(req, 'users/verify', verifyToken)

  verificationRequest(req.body.email, url)

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL
      }
    }
  })
}

module.exports = signUpUser
