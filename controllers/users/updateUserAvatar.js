const fs = require('fs').promises
const path = require('path')
const createError = require('http-errors')
const { User } = require('../../model')
const imageOptimization = require('../../utils/imageOptimization')

const VALID_FILE_TYPES = ['png', 'jpg', 'jpeg', 'tiff', 'WebP', 'gif']

const storageDir = path.join(process.cwd(), 'public', 'avatars')

const updateUserAvatar = async (req, res) => {
  const { id } = req.user

  if (!req.file) throw createError(400, 'File missing')

  const { path: temporaryName, originalname } = req.file

  try {
    const [fileExtension] = originalname.split('.').reverse()

    if (!VALID_FILE_TYPES.includes(fileExtension)) throw createError(400, 'Invalid file type')

    const newUniqueName = `${id}-${originalname}`
    const destinationName = path.join(storageDir, newUniqueName)

    fs.rename(temporaryName, destinationName)
    imageOptimization(destinationName)

    const { avatarURL } = await User
      .findByIdAndUpdate(id, { avatarURL: path.join('avatars', newUniqueName) }, { new: true })
      .select({ email: 1, subscription: 1, avatarURL: 1 })

    res.json({
      status: 'success',
      code: 200,
      data: { avatarURL }
    })
  } catch (err) {
    fs.unlink(temporaryName)
    throw err
  }
}

module.exports = updateUserAvatar
