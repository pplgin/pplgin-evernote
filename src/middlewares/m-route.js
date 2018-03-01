import Router from 'koa-router'
import compose from 'koa-compose'
import path from 'path'
import { type } from '../common/utils'

const router = new Router()

module.exports = routes => {

  if (!Array.isArray(routes)) {
    throw new Error('routes config must be array!')
  }

  for (let conf of routes) {
    const { url, controller, template, middleware = null, method = 'get' } = conf

    if (!url) {
      throw new Error('url not be undefined')
    }

    const [ className, methodName = 'index'] = controller.split('::')

    if(!className) {
      throw new Error('controller must be given')
    }
    const _control = require(path.join(__dirname, `../controllers/${className}`))

    // 是否有中间件
    switch (type(middleware)) {
      case 'function':
        router[method](url, middleware, _control[methodName])
        break;
      case 'array':
        router[method](url, compose(middleware), _control[methodName])
        break;
      default:
        router[method](url, _control[methodName])
    }
  }
  return compose([router.routes(), router.allowedMethods()])
}
