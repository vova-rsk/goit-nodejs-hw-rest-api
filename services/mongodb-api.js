const { MongoClient, ObjectID } = require('mongodb')
require('dotenv').config()

const uriDb = process.env.DB_HOST

const api = {
  connection: null,

  async startConnection() {
    this.connection = await new MongoClient(uriDb, { useUnifiedTopology: true }).connect()
  },

  async stopConnection() {
    await this.connection.close()
  },

  async getDocuments(collectionName) {
    return await this.connection
      .db()
      .collection(collectionName)
      .find()
      .toArray()
  },

  async getDocumentById(collectionName, id) {
    return await this.connection
      .db()
      .collection(collectionName)
      .findOne({ _id: typeof id === 'string' ? new ObjectID(id) : id })
  },

  async removeDocument(collectionName, id) {
    const result = await this.connection
      .db()
      .collection(collectionName)
      .deleteOne({ _id: new ObjectID(id) })
    const isRemoved = Boolean(result.deletedCount)
    return isRemoved
  },

  async addDocument(collectionName, contactInfo) {
    const result = await this.connection
      .db()
      .collection(collectionName)
      .insertOne(contactInfo)
    return result.insertedId
  },

  async updateDocument(collectionName, id, contactInfo) {
    const result = await this.connection
      .db()
      .collection(collectionName)
      .updateOne({ _id: new ObjectID(id) }, { $set: contactInfo }, { upsert: false })
    const isUpdated = Boolean(result.modifiedCount || result.matchedCount)
    return isUpdated
  },
}

module.exports = api
