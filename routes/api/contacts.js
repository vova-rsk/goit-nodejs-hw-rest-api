const express = require('express')
const router = express.Router()
const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  patchContact,
} = require('../../controllers/contactsControllers')

router.get('/', getContacts)
router.get('/:contactId', getContactById)
router.post('/', postContact)
router.delete('/:contactId', deleteContact)
router.patch('/:contactId', patchContact)

module.exports = router
