const http = require('http'),
  cors = require('cors'),
  Mock = require('mockjs'),
  logger = require('morgan'),
  _ = require('lodash'),
  path = require('path'),
  express = require('express'),
  compression = require('compression')

const app = express(),
  router = express.Router()

const config = require('./config'),
  {
    baseURL,
    apis,
    cors: corsConfig
  } = config

const ALLOWED_TYPE = [
    'file', 'mock'
  ],
  ALLOWED_METHOD = [
    'get', 'post', 'put', 'delete', 'patch'
  ]

app.use(compression())

if (_.isObject(corsConfig) && !_.isEmpty(corsConfig)) {
  app.use(cors(corsConfig))
}

for (let i = 0, len = apis.length; i < len; i++) {
  const api = apis[i]
  const api_url = path.join(api.url),
    method = _.toLower(api.method),
    api_type = _.toLower(api.type)
  if (!_.includes(ALLOWED_TYPE, api_type)) {
    console.log(`不支持的数据类型 ${api_type}, 请选择${_.join(ALLOWED_TYPE, ', ')}数据类型！`)
    process.exit(1)
    break
  }
  if (!_.includes(ALLOWED_METHOD, method)) {
    console.log(`不支持的请求方式 ${method}, 请选择${_.join(ALLOWED_METHOD, ', ')}请求方式！`)
    process.exit(1)
    break
  }
  const app_method = _.bindKey(router, method, api_url)
  switch (api_type) {
    case 'file':
      {
        app_method((req, res, next) => {
          const filepath = path.join(__dirname, api.data)
          return res.sendFile(filepath)
        })
      }
    case 'mock':
      {
        app_method((req, res, next) => {
          const mockData = Mock.mock(api.data)
          if (_.isString(mockData)) {
            return res.send(mockData)
          }
          return res.json(mockData)
        })
      }
    default:
      break
  }
}

app.use(logger('dev'))

app.use(baseURL, router)

app.use((req, res, next) => {
  return res.send('404 Not Found')
})

const server = http.createServer(app)

server.listen(config.port)
server.on('listening', () => {
  console.log(`Listening on port ${config.port}. http://localhost:${config.port}`)
})
