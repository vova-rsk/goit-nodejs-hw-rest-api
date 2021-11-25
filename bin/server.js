require('colors')
const mongoose = require('mongoose')
const app = require('../app')

const PORT = process.env.PORT || 3000

mongoose.connect(
  process.env.DB_HOST,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(res => {
  console.log('Database connection successful'.green)

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT.cyan}`.green)
  })
}).catch(err => {
  console.log('Cannot create connection to DB'.red)
  console.log(err.message)
  process.exit(1)
})
