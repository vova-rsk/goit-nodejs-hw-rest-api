const createUrl = (req, path, filenameOrData) => {
  const urlParams = {
    protocol: (req.connection.encrypted ? 'https' : 'http') + ':',
    host: req.headers.host,
    path,
    filenameOrData
  }

  const urlPrepack = Object.values(urlParams).join('/')

  return new URL(urlPrepack)
}

module.exports = createUrl
