const getContacts = require('./getContacts')
const getContactsById = require('./getContactById')
const postContact = require('./postContact')
const putContact = require('./putContact')
const deleteContact = require('./deleteContact')
const patchContact = require('./patchContact')

module.exports = {
  getContacts,
  getContactsById,
  postContact,
  putContact,
  deleteContact,
  patchContact
}
