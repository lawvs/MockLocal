# Mock.Local

[![travis-ci](https://travis-ci.org/MZIchenjl/MockLocal.svg?branch=master)](https://travis-ci.org/MZIchenjl/MockLocal)

简易的给前端使用的本地测试用Mock服务器。

## Usage

安装依赖

```shell
npm install
```

启动命令

```shell
npm run dev
```

or

```shell
npm start
```

测试

```
npm run test
```

## 配置文件

使用`config.js`进行配置mock服务器。

### port

测试用端口号。

### cors

使用`cors`包做跨域处理，cors里的内容与cors的配置一致，参考 [cors - npm](https://www.npmjs.com/package/cors) 配置方式。

### baseURL

api调用的基础链接。

### apis

接口列表，内部以object的形式存放，必须包含字段。

#### url

接口链接，实际可调用链接为 `baseURL + api.url`。

#### method

支持http常用的请求方式，包括GET，POST，PUT，DELETE和PATCH。

#### type

请求类型，支持文件类型 `file` 和mock模板生成数据类型 `mock`。

#### data

文件类型需填文件路径，相对和绝对无所谓。

mock模板数据参考 [mockjs 文档](https://github.com/nuysoft/Mock/wiki)。

# LICENSE

MIT
