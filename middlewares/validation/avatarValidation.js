const fs = require('fs').promises
const createError = require('http-errors')

const VALID_FILE_TYPES = ['png', 'jpg', 'jpeg', 'tiff', 'gif', 'bmp']

const avatarValidation = async (req, res, next) => {
  if (!req.file) throw createError(400, 'File missing')

  const { path: temporaryName, originalname } = req.file
  const [fileExtension] = originalname.split('.').reverse()

  if (!VALID_FILE_TYPES.includes(fileExtension)) {
    await fs.unlink(temporaryName)
    throw createError(400, 'Invalid file type')
  }

  req.file = { ...req.file, fileExtension }
  next()
}

module.exports = avatarValidation
