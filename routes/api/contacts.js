const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers')
const { contactValidation, statusValidation, controllerWrapper: wrapper } = require('../../middlewares')
const mongoDbApi = require('../../services')

router.get('/', wrapper(ctrl.getContacts, mongoDbApi))
router.get('/:contactId', wrapper(ctrl.getContactById, mongoDbApi))
router.post('/', contactValidation, wrapper(ctrl.postContact, mongoDbApi))
router.delete('/:contactId', wrapper(ctrl.deleteContact))
router.put('/:contactId', contactValidation, wrapper(ctrl.putContact, mongoDbApi))
router.patch('/:contactId/favorite', statusValidation, wrapper(ctrl.patchContact, mongoDbApi))

module.exports = router
