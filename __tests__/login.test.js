const request = require('supertest')
const express = require('express')
const jwt = require('jsonwebtoken')
const { User } = require('../model')

const PATH = '/users/login'

const loginController = async (req, res) => {
  const mId = '12345'
  const mSubscription = 'text'
  const mAvatarURL = 'link'

  const { email: mEmail, password: mPassword } = req.body

  const mShortUserInfo = {
    id: mId,
    email: mEmail,
    password: mPassword
  }

  try {
    jest.spyOn(User, 'findOne').mockImplementationOnce(() => mShortUserInfo)
    const user = await User.findOne({ email: mEmail })

    if (!user || user.password !== mPassword) {
      const error = new Error('Email or password is wrong')
      error.status = 401
      throw error
    }

    const newToken = jwt.sign({ id: user.id, email: user.email }, 'SOME_SECRET_KEY', { expiresIn: '12h' })

    const mFullUserInfo = {
      id: mId,
      email: mEmail,
      subscription: mSubscription,
      avatarURL: mAvatarURL,
      token: newToken
    }

    jest.spyOn(User, 'findByIdAndUpdate').mockImplementationOnce(() => mFullUserInfo)
    const result = await User.findByIdAndUpdate(user.id, { token: newToken }, { new: true })

    if (!result) throw new Error()

    const { email, subscription, avatarURL, token } = result

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        token,
        user: {
          email,
          subscription,
          avatarURL
        }
      }
    })
  } catch (err) {
    const { status = 500, message = 'Internal server error' } = err

    res.status(status).json({
      status: 'error',
      code: status,
      message
    })
  }
}

const app = express()

app.use(express.json())
app.post(PATH, loginController)

describe('User login controller testing', () => {
  let testServer

  beforeAll(() => { testServer = app.listen(3000) })
  afterAll(() => { testServer.close() })

  test('added valid email & id to request', async() => {
    const mEmail = 'test@mail.com'
    const mPassword = 'password'

    const response = await request(testServer)
      .post(PATH)
      .send({ email: mEmail, password: mPassword })

    expect(response.status).toBe(200)

    const { data: { token, user } } = response.body

    expect(token).toBeDefined()
    expect(user).toBeDefined()

    const desiredUser = {
      email: expect.any(String),
      subscription: expect.any(String)
    }

    expect(user).toMatchObject(desiredUser)
  })
})
