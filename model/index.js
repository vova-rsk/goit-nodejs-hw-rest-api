const mongodbApi = require('../services')

const CURRENT_COLLECTION_NAME = 'contacts'

const listContacts = async () => {
  const contactsList = await mongodbApi.getDocuments(CURRENT_COLLECTION_NAME)
  return contactsList
}

const getContactById = async contactId => {
  const contact = await mongodbApi.getDocumentById(CURRENT_COLLECTION_NAME, contactId)
  return contact
}

const removeContact = async contactId => {
  const result = await mongodbApi.removeDocument(CURRENT_COLLECTION_NAME, contactId)
  return result
}

const addContact = async body => {
  if (!body.favorite) body.favorite = false

  const id = await mongodbApi.addDocument(CURRENT_COLLECTION_NAME, body)
  return id.toString()
}

const updateContact = async (contactId, body) => {
  const result = await mongodbApi.updateDocument(CURRENT_COLLECTION_NAME, contactId, body)
  return result || null
}

const updateStatusContact = async (contactId, body) => {
  const result = await mongodbApi.updateDocument(CURRENT_COLLECTION_NAME, contactId, body)
  return result || null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
