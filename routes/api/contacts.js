const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers')
const {
  auth,
  contactValidation,
  statusValidation,
  controllerWrapper: wrapper
} = require('../../middlewares')

router.use(auth)

router.get('/', wrapper(ctrl.getContacts))
router.get('/:contactId', wrapper(ctrl.getContactById))
router.post('/', wrapper(contactValidation), wrapper(ctrl.addContact))
router.delete('/:contactId', wrapper(ctrl.removeContact))
router.put('/:contactId', wrapper(contactValidation), wrapper(ctrl.updateContact))
router.patch('/:contactId/favorite', wrapper(statusValidation), wrapper(ctrl.updateStatusContact))

module.exports = router
