require('dotenv').config()
require('colors')
const app = require('../app')
const mongodbApi = require('../services')

const PORT = process.env.PORT || 3000

mongodbApi.startConnection()
  .then(res => {
    console.log('Database connection successful'.green)

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT.cyan}`.green)
    })
  })
  .catch(err => {
    console.log('Cannot create connection to DB'.red)
    console.log(err.message)
    process.exit(1)
  })
