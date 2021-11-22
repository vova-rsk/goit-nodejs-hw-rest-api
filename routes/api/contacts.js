const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers')
const { contactValidation, controllerWrapper: wrapper } = require('../../middlewares')

router.get('/', wrapper(ctrl.getContacts))
router.get('/:contactId', wrapper(ctrl.getContactById))
router.post('/', contactValidation, wrapper(ctrl.postContact))
router.delete('/:contactId', wrapper(ctrl.deleteContact))
router.put('/:contactId', contactValidation, wrapper(ctrl.putContact))

module.exports = router
