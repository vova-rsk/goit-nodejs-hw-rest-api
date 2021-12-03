const jwt = require('jsonwebtoken')
const { User } = require('../../model')

const SECRET_KEY = process.env.SECRET

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    const result = jwt.verify(token, SECRET_KEY)

    const user = await User.findById(result.id).select({ password: 0, createdAt: 0, updatedAt: 0 })

    if (!user || token !== user.token) throw new Error()

    req.user = user
    next()
  } catch (err) {
    err.status = 401
    err.message = 'Not authorized'
    next(err)
  }
}

module.exports = auth
