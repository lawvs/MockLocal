const _ = require('lodash')
const express = require('express')
const Mock = require('mockjs')
const path = require('path')
const config = require('./config')

const router = express.Router()

const {
  baseURL,
  name: mock_name,
  apis
} = config

const ALLOWED_TYPE = ['file', 'mock']
const ALLOWED_METHOD = ['get', 'post', 'put', 'delete', 'patch']

const api_list = []

for (let i = 0, len = apis.length; i < len; i++) {
  const api = apis[i]
  const api_url = path.join(api.url).replace(/\\/g, '/')
  const method = _.toLower(api.method)
  const api_type = _.toLower(api.type)
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
  api_list.push(`${_.toUpper(method)} - ${path.join(baseURL, api_url).replace(/\\/g, '/')}`)
  switch (api_type) {
    case 'file':
      {
        app_method((req, res, next) => {
          const filePath = path.join(__dirname, api.data)
          return res.sendFile(filePath)
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
console.log(`[${mock_name || __dirname}]`)
console.log('==========')
console.log(api_list.join('\n'))
console.log('==========')

module.exports = router
