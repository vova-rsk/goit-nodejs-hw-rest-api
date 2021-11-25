const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers')
const { contactValidation, statusValidation, controllerWrapper: wrapper } = require('../../middlewares')

router.get('/', wrapper(ctrl.getContacts))
router.get('/:contactId', wrapper(ctrl.getContactsById))
router.post('/', contactValidation, wrapper(ctrl.postContact))
router.delete('/:contactId', wrapper(ctrl.deleteContact))
router.put('/:contactId', contactValidation, wrapper(ctrl.putContact))
router.patch('/:contactId/favorite', statusValidation, wrapper(ctrl.patchContact))

module.exports = router
