const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
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
