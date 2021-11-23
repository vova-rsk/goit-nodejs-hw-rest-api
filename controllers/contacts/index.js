const getContacts = require('./getContacts')
const getContactById = require('./getContactById')
const postContact = require('./postContact')
const putContact = require('./putContact')
const deleteContact = require('./deleteContact')
const patchContact = require('./patchContact')

module.exports = {
  getContacts,
  getContactById,
  postContact,
  putContact,
  deleteContact,
  patchContact
}
