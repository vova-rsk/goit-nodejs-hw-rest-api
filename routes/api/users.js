const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers')
const {
  upload,
  auth,
  signupValidation,
  loginValidation,
  subscriptionValidation,
  avatarValidation,
  accountValidation,
  controllerWrapper: wrapper
} = require('../../middlewares')

router.get('/verify/:verificationToken', wrapper(ctrl.userVerification))
router.post('/verify', wrapper(accountValidation), wrapper(ctrl.userReVerification))

router.post('/signup', wrapper(signupValidation), wrapper(ctrl.signUpUser))
router.post('/login', wrapper(loginValidation), wrapper(ctrl.loginUser))

router.use(auth)

router.post('/logout', wrapper(ctrl.logoutUser))
router.get('/current', wrapper(ctrl.currentUser))
router.patch('/', wrapper(subscriptionValidation), wrapper(ctrl.updateUserSubscription))
router.patch('/avatars', upload.single('avatar'), wrapper(avatarValidation), wrapper(ctrl.updateUserAvatar))

module.exports = router
