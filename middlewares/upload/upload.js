const multer = require('multer')
const path = require('path')

const uploadDir = path.join(process.cwd(), 'tmp')

const multerStorageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2048,
  },
})

const upload = multer({
  storage: multerStorageConfig,
})

module.exports = upload
