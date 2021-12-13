const signUpUser = require('./signupUser')
const loginUser = require('./loginUser')
const logoutUser = require('./logoutUser')
const currentUser = require('./currentUser')
const updateUserSubscription = require('./updateUserSubscription')
const updateUserAvatar = require('./updateUserAvatar')
const userVerification = require('./userVerification')
const userReVerification = require('./userReVerification')

module.exports = {
  signUpUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUserSubscription,
  updateUserAvatar,
  userVerification,
  userReVerification
}
