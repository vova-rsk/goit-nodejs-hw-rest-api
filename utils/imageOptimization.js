const Jimp = require('jimp')

const IMAGE_WIDTH = 250
const IMAGE_HEIGHT = 250
const QUALITY_PERCENTAGE = 60

const avatarOptimization = async (path) => {
  const avatar = await Jimp.read(path)

  avatar
    .cover(IMAGE_WIDTH, IMAGE_HEIGHT)
    .resize(IMAGE_WIDTH, IMAGE_HEIGHT)
    .quality(QUALITY_PERCENTAGE)
    .write(path)
}

module.exports = avatarOptimization
