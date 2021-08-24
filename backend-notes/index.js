const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

// eslint-disable-next-line no-unused-vars
const server = http.createServer(app)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})