const _ = require('lodash')
const http = require('http')
const cors = require('cors')
const logger = require('morgan')
const express = require('express')
const compression = require('compression')

const router = require('./router')
const config = require('./config')

const {
  baseURL,
  cors: corsConfig
} = config

const app = express()
app.use(compression())

if (_.isObject(corsConfig) && !_.isEmpty(corsConfig)) {
  app.use(cors(corsConfig))
}

app.use(logger('dev'))

app.use(baseURL, router)

app.use((req, res, next) => {
  return res.status(404).send('404 Not Found')
})

const server = http.createServer(app)

server.listen(config.port)
server.on('listening', () => {
  console.log(`Listening on port ${config.port}. http://localhost:${config.port}`)
})
server.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof config.port === 'string' ?
    'Pipe ' + config.port :
    'Port ' + config.port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
})

module.exports = server
