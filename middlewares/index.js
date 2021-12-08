const controllerWrapper = require('./wrapper')
const auth = require('./auth')
const validation = require('./validation')
const upload = require('./upload')

module.exports = {
  ...validation,
  controllerWrapper,
  auth,
  upload
}
