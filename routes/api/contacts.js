const express = require('express')
const router = express.Router()
const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
} = require('../../controllers/contactsControllers')
const contactValidation = require('../../middlewares/contactValidators')

router.get('/', getContacts)
router.get('/:contactId', getContactById)
router.post('/', contactValidation, postContact)
router.delete('/:contactId', deleteContact)
router.put('/:contactId', contactValidation, putContact)

module.exports = router
