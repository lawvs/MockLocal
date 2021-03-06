module.exports = {
  name: 'MOCK_TEST', // 项目名称，用以区分
  // 测试端口
  port: 8015,
  cors: { // cors配置
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  },
  // 基础链接
  baseURL: '/api/',
  // api列表
  apis: [{
    url: '/user/profile', //链接
    method: 'get', // 方法 支持get, post, put, delete, patch
    type: 'mock', // 类型 支持file文件类型，mock 模拟数据
    data: {

    } // 数据 文件路径或者 mock模板
  },
  { // test
    url: '/test/mock',
    method: 'get',
    type: 'mock',
    data: 'OK!'
  }]
}
