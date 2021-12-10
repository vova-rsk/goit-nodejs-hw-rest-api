const request = require('supertest')
const express = require('express')
const jwt = require('jsonwebtoken')
const { User } = require('../model')

const PATH = '/users/login'

const loginController = async (req, res) => {
  try {
    const { id: mId, email: mEmail } = req.body
    console.log(req.body)
    const newToken = jwt.sign({ id: mId, email: mEmail }, 'SOME_SECRET_KEY', { expiresIn: '12h' })

    const mUser = {
      id: mId,
      email: mEmail,
      subscription: 'text',
      avatarURL: 'link',
      token: newToken
    }

    jest.spyOn(User, 'findByIdAndUpdate').mockImplementationOnce(() => mUser)

    const result = await User.findByIdAndUpdate(mId, { token: newToken }, { new: true })

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
    const mId = '12345'

    const response = await request(testServer)
      .post(PATH)
      .send({ id: mId, email: mEmail })

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
