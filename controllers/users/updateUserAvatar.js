const fs = require('fs').promises
const path = require('path')
const { User } = require('../../model')
const imageOptimization = require('../../utils/imageOptimization')

const storageDir = path.join(process.cwd(), 'public', 'avatars')

const updateUserAvatar = async (req, res) => {
  const { id } = req.user
  const { path: temporaryName, fileExtension } = req.file
  const newUniqueName = [id, fileExtension].join('.')
  const destinationName = path.join(storageDir, newUniqueName)

  try {
    await fs.rename(temporaryName, destinationName)

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
    await fs.unlink(temporaryName)
    throw err
  }
}

module.exports = updateUserAvatar
