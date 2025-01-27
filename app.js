const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')
const { auth } = require('./middlewares')
const path = require('path')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
const avatarsDir = path.join(__dirname, 'public', 'avatars')

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/avatars', auth, express.static(avatarsDir))
app.use('/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  let { message = 'Internal Server error', status = 500 } = err

  if (err.code === 11000) {
    message = 'Email in use'
    status = 409
  }

  res.status(status).json({
    status: 'error',
    code: status,
    message
  })
})

module.exports = app
