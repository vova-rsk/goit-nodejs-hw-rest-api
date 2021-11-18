// const contacts = require('./contacts.json')
const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, '/contacts.json')

const getContacts = async () => {
  const response = await fs.readFile(contactsPath)
  const contacts = JSON.parse(response)
  return contacts
}

const listContacts = async () => {
  const contactsList = await getContacts()
  return contactsList
}

const getContactById = async (contactId) => {
  const contactsList = await getContacts()
  const contact = contactsList.find((item) => item.id.toString() === contactId)
  return contact
}

const removeContact = async (contactId) => {
  const contactsList = await getContacts()
  const contactToRemove = contactsList.find(item => item.id.toString() === contactId)

  if (contactToRemove) {
    const updatedContactsList = contactsList.filter(item => item.id.toString() !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList))
  }

  return contactToRemove
}

const addContact = async (body) => {
  const REQUIRED_CONTACT_DATA = ['name', 'email', 'phone']

  const bodyKeys = Object.keys(body)
  const isValidBody = REQUIRED_CONTACT_DATA.every(item => bodyKeys.includes(item))

  if (!isValidBody) {
    return null
  }

  const contactsList = await getContacts()
  await fs.writeFile(contactsPath, JSON.stringify([...contactsList, body]))
  return body
}

const updateContact = async (contactId, body) => {
  const contactsList = await getContacts()
  const index = contactsList.findIndex(item => item.id.toString() === contactId)

  if (index === -1) {
    return undefined
  }

  contactsList[index] = { ...contactsList[index], ...body }
  await fs.writeFile(contactsPath, JSON.stringify([...contactsList, contactsList]))

  return contactsList[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
