const { Contact } = require('../model')

const listContacts = async () => {
  const contactsList = await Contact.find({})
  return contactsList
}

const getContactById = async contactId => {
  const contact = Contact.findById(contactId)
  return contact
}

const removeContact = async contactId => {
  const removedContact = await Contact.findByIdAndRemove(contactId)
  return removedContact
}

const addContact = async body => {
  const addedContact = await Contact.create(body)
  return addedContact
}

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(contactId, body, { new: true })
  return result
}

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
