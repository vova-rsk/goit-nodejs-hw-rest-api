const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers')
const {
  auth,
  signupValidation,
  loginValidation,
  subscriptionValidation,
  controllerWrapper: wrapper
} = require('../../middlewares')

router.post('/signup', wrapper(signupValidation), wrapper(ctrl.signUpUser))
router.post('/login', wrapper(loginValidation), wrapper(ctrl.loginUser))

router.use(auth)

router.post('/logout', wrapper(ctrl.logoutUser))
router.get('/current', wrapper(ctrl.currentUser))
router.patch('/', wrapper(subscriptionValidation), wrapper(ctrl.updateUserSubscription))

module.exports = router
